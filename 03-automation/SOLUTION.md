Automation Workflow — Challenge 03

Overview

This workflow processes user registrations received via a webhook.  
It validates input, prevents duplicates, stores valid data, and returns a structured response.


Step 1 — Webhook Trigger

- Receives POST request with:
  - name
  - email
  - source
- Entry point of the workflow


Step 2 — Email Validation (IF Node)

- Condition:
  {{$json["body"]["email"]}} matches regex

- Regex used:
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

- Root cause:
  Basic validation (like checking only "@") is not enough

- Fix:
  Implemented regex validation

- If invalid:
```json
{ "status": "invalid", "message": "Invalid email format" }

Step 3 — Duplicate Check (Google Sheets)

- Node: Get row(s) in sheet

- Filter:
Column: email
Value: {{$json["body"]["email"]}}

-Logic: If result is not empty → duplicate

-Root cause: Without this, same email can be stored multiple times

-Fix: Added lookup before insert

Step 4 — Duplicate Handling (IF Node)

-Condition:
{{$json}} is not empty

-If TRUE:
{ "status": "duplicate", "message": "Email already exists" }


Step 5 — Store Data (Append Row)

Stores: name, email, source

-Root cause: data must only be saved after validation and duplicate check

-Fix: connected only from valid + non-duplicate branch


Step 6 — Retry Logic

-Enabled retry in the Google Sheets node.

-Reason: external services can fail temporarily.

-Fix: added automatic retry to improve reliability.

Step 7 — Success Response

- If stored successfully:
{ "status": "saved", "message": "User stored successfully" }



Edge Cases Handled 

Invalid email formats
Duplicate emails
Emails with special characters (e.g. user.test+1@gmail.com
)
Temporary failures during storage


Testing

Tested using curl:

curl -X POST "WEBHOOK_URL" \
-H "Content-Type: application/json" \
-d '{"name":"Test","email":"test@gmail.com","source":"landing"}'



Test cases:

Invalid email → returns "invalid"
Existing email → returns "duplicate"
New email → returns "saved"