Bug 1 — Missing await in fetch
- File: api.js
- Problem: fetch returned a Promise instead of resolved response
- Root cause: missing await
- Fix: added await before fetch call

Bug 2 — Missing await in JSON parsing
- File: api.js
- Problem: response.json() returned a Promise
- Root cause: missing await
- Fix: added await

Bug 3 — Validation bug
- File: app.js
- Problem: used assignment instead of comparison
- Root cause: incorrect operator
- Fix: replaced = with ===

Bug 4 — XSS vulnerability
- File: app.js
- Problem: used innerHTML with user input
- Root cause: unsafe rendering
- Fix: replaced with textContent