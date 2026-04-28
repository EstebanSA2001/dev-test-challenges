# Challenge 05 — Mini App

**Module weight:** 10% of total score  
**Estimated time:** 90–120 min

## What to Build

A simple fullstack mini app that:

1. Accepts a **text input** from the user (a search term or username)
2. Calls a **real external API** with that input
3. **Stores** the response (in-memory, localStorage, or a simple DB)
4. **Displays** a list of past results

## Constraints

- Use any stack you want (React, Vue, plain JS, Python + Flask, etc.)
- Keep it simple — no overengineering
- Must be functional and runnable locally

## Suggested APIs (free, no auth required)

- `https://api.github.com/users/{username}` — GitHub user info
- `https://api.thecatapi.com/v1/images/search` — random cat image
- `https://jsonplaceholder.typicode.com/posts` — fake posts
- Or any other public API you prefer

## Critical Requirement — AI Transparency Section

Your README **must** include a section called `## AI Usage` that answers:

1. What parts of this app were generated using AI tools?
2. What parts did you write manually?
3. What do you fully understand in this code?
4. What parts are you uncertain about?

**This section is mandatory. Missing it = automatic rejection of this module.**

## What to Submit

- Your **repo URL**
- Optional: demo link (Vercel, Netlify, Replit, etc.)

## Evaluation Criteria

| Criterion | Weight |
|-----------|--------|
| App works as described | 40% |
| AI Transparency section present and honest | 30% |
| Code is simple and not over-engineered | 15% |
| Candidate can explain their own decisions | 15% |

> Simple code + clear reasoning = HIGH SCORE  
> Perfect code + poor explanation = PENALTY



--------------------------------------------------------------------------------------------------------------------------------------

## AI Usage

### 1. What parts were generated using AI?

I used AI to generate an initial version of the HTML structure and a basic implementation of the fetch request to the GitHub API.

### 2. What parts did you write manually?

I refined the logic for handling API responses, including checking if a user exists and formatting the output. I also implemented the logic to store results in localStorage and render the history list dynamically. Additionally, I adjusted the code to prevent duplicate entries in the history.

### 3. What do you fully understand?

I understand how the fetch API works (request → response → JSON parsing), how localStorage stores and retrieves data, and how DOM manipulation is used to update the UI with new results and the stored history.

### 4. What parts are you uncertain about?

I am less confident about handling edge cases such as API rate limits, error handling for failed requests, and how this approach would change in a production environment with a backend and persistent database.
