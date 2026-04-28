import re

# script.py
# BUG #1: naive email validation — only checks for "@", accepts "a@b"
# BUG #2: no deduplication — duplicates counted multiple times
# BUG #3: grouping logic is wrong — groups by full email, not by domain
# BUG #4: count is always 1 — doesn't accumulate

users = [
    {"name": "Alice", "email": "alice@gmail.com"},
    {"name": "Bob",   "email": "bob@yahoo.com"},
    {"name": "Carol", "email": "alice@gmail.com"},   # duplicate
    {"name": "Dave",  "email": "dave@gmail.com"},
    {"name": "Eve",   "email": "not-an-email"},      # invalid
    {"name": "Frank", "email": "frank@"},            # invalid — BUG #1 would accept this
]

def validate_email(email):
    # FIX #1: regex real en lugar de solo verificar "@"
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return bool(re.match(pattern, email))

def group_by_domain(users):
    
    seen_emails = set()  # FIX #2: deduplicar emails antes de procesar
    result = {}
    
    for user in users:
        email = user["email"]
        
        if not validate_email(email):
            continue
        
        if email in seen_emails:
            continue                    # FIX #2: saltar duplicados
        seen_emails.add(email)
        
        domain = email.split("@")[1]      # FIX #3: usar dominio, no email completo
        result[domain] = result.get(domain, 0) + 1      # FIX #4: acumular conteo
    return result

output = group_by_domain(users)
print(output)

# Expected output (after fixes):
# {"gmail.com": 2, "yahoo.com": 1}
#
# Current (buggy) output:
# {"alice@gmail.com": 1, "bob@yahoo.com": 1, "alice@gmail.com": 1, "dave@gmail.com": 1, "frank@": 1}