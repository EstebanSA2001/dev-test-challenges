Bug 1 — Invalid email validation
- File: script.py
- Problem: only checked for "@"
- Root cause: naive validation
- Fix: implemented regex validation

Bug 2 — Duplicate emails counted
- File: script.py
- Problem: duplicates not filtered
- Root cause: no deduplication
- Fix: used set to track seen emails

Bug 3 — Wrong grouping
- File: script.py
- Problem: grouped by full email
- Root cause: incorrect key
- Fix: used domain (split by "@")

Bug 4 — Count not accumulated
- File: script.py
- Problem: always set to 1
- Root cause: missing accumulation logic
- Fix: used result.get(domain, 0) + 1