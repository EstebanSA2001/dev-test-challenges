Bug 1 — Missing await in DB call
- File: server.js
- Problem: async DB call not awaited
- Root cause: missing await
- Fix: added await

Bug 2 — Incorrect HTTP status codes
- File: server.js
- Problem: wrong status codes returned
- Root cause: improper API design
- Fix: used 404 for missing data and 201 for creation

Bug 3 — Wrong response field
- File: server.js
- Problem: incorrect property accessed
- Root cause: mismatch in data structure
- Fix: replaced data.result with data.value

Bug 4 — Memory leak
- File: server.js
- Problem: requestLog kept growing
- Root cause: no limit on array
- Fix: added size limit

Bug 5 — Missing input validation
- File: server.js
- Problem: no validation for inputs
- Root cause: missing checks
- Fix: validated name and value

Bug 6 — Missing error middleware
- File: server.js
- Problem: no centralized error handling
- Root cause: missing middleware
- Fix: added global error handler