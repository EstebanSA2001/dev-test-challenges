# Challenge 06 — Conceptual Questions

**Module weight:** 10% of total score  
**Estimated time:** 45–60 min

## Instructions

Answer all 10 questions directly in the evaluation form.  
Write in your own words — not copied from documentation or AI output.  
Minimum 70 characters per answer. Quality over quantity.

---

## Questions

**Q1. Explain how async/await works internally in JavaScript.**  
What problem does it solve? What happens under the hood when you `await` a Promise?

*RTA/* Async/await is just syntactic sugar over Promises. It's a remedy to callback hell, and makes asynchronous code easier to read and understand. When you make a function async, it is always immediately returning — implicitly — a Promise. Once the engine encounters an await it puts execution of the containing async function on hold and queues a microtask to continue execution when the awaited Promise is resolved – the event loop meanwhile is free to process other tasks. Internally, the engine converts the async function into a state machine that continues at the correct position when the awaited value is ready.

**Q2. What risks does `innerHTML` introduce, and how do you mitigate them?**  
Give a concrete example of an attack and the correct alternative.

*RTA/* innerHTML is dangerous, since it parses and renders raw HTML and this could lead to an XSS attack. Example of real life injection: an image tag with a malicious handler — this runs as soon as it is inserted by innerHTML because the event attribute is processed by the browser as code. The safe option is textContent, which always treats input as plain text and never runs it. If you must render HTML, sanitize the input first with a library like DOMPurify and then pass it to innerHTML.

**Q3. What is the difference between `==` and `===` in edge cases?**  
Give at least two examples where they produce different results.

*RTA/* == operator does type coercion whereas === operator does not. That results in unexpected results on some edge cases. For example, ”5” == 5 //true because js converts the string to a number before comparing ”5” === 5 //false because the types are different. is true, since the spec treats them as loosely equal, but null === undefined is false (since they are not the same type). Also tricky is 0 == false true because of coercion, while 0 === false is false. In general, always use === as this prevents unexpected behavior having to do with type conversion.

**Q4. What happens if an API does not validate its input?**  
Describe at least two real consequences and how to prevent them.

*RTA/* Without validation on the input, an API is susceptible to a variety of problems. First — SQL injection attack — if a user send post body like name: "'; DROP TABLE users; --" and backend put it directly into a query, it will destroy your database. Secondly, if we pass some unexpected type like age: "abc" instead of number type, it could potentially crash an app or spoil its stored data. Prevent this by always validating/sanitizing on the backend no matter what the frontend does – never trust client input. Employ schema validators such as Joi or Zod to validate your expected types and formats.

**Q5. Explain how a webhook differs from polling.**  
When would you choose one over the other?

*RTA/* A webhook is a mechanism where the server pushes the data, immediately after something happened, without the client having to ask for the information, it's event driven. Polling, in contrast, is based on pull — the client makes successive requests to the server at predetermined time intervals to find out if new data is available, irrespective of whether or not the data in the server side has changed.
Webhooks are orders of magnitude more efficient because they don't generate false requests. Instead, if you’re integrating a payment system like Stripe, a webhook tells your server immediately that a payment went through — you don’t have to keep pinging Stripe every five seconds asking if anything’s happened. Polling in that same scenario would mean literally hundreds of discarded requests for every one new piece of data.

**Q6. Why should you use separate `dev` and `main` branches?**  
What problems does this workflow prevent in a team environment?

*RTA/* Keeping dev and main as separate branches enables you to keep production code stable. The main branch should always be what is live and working — no one is pushing right to main. Developers branch off dev or feature branches and get to break things, experiment and test without disrupting real people. That workflow adds in a code review via pull requests to the entire process before anything gets to main, which again, helps catch bugs, logic errors, security problems etc early. And in a team environment, it also prevents conflicts like the egregious “two developers work on the same branch and keep overwriting each other’s work” scenario. Tools like GitHub Actions are even able to be set up to execute automated tests solely when a PR is directed at main, providing yet another level of safety.

**Q7. What causes a memory leak in backend systems?**  
Give a concrete Node.js example and explain how you would detect and fix it.

*RTA/* A memory leak is when memory is allocated and never freed. One type of common Node.js example is pushing objects into a global array and never emptying it — you end up with a memory leak that eventually cause the process to run out of memory and die under load. And if you’re both consulting the object and handling the on/off, you want to add removeListener. To detect leaks, you can run node --inspect and use Chrome DevTools take heap snapshots at intervals to compare growth. The solution depends on the cause — for unbounded arrays, bound the size use shift() or a circular buffer; for listeners, whenever you add ones clean them up as soon as you don't want them anymore.

**Q8. Why should HTTP status codes match the actual response?**  
What breaks when they don't? Give a real scenario.

*RTA/* Important note: HTTP status codes should reflect the actual response, because clients – whether browsers, mobile applications, or other APIs – use them to determine what action to take next, not just the response body. If they don't, all of error handling goes out the window.A specific example: let's say your API returns 200 OK, but with an error message when a user logs in with the wrong credentials. The appropriate code in this case is 401 Unauthorized. Returning 404 when a resource is not found instead of 200 will also help caches, API gateways and monitoring tools to work properly — they make their decisions based on status codes and not body content.

**Q9. What is idempotency in APIs?**  
Why does it matter? Give an example of an idempotent and a non-idempotent operation.

*RTA/* Idempotency means ensuring that an identical request can be submitted once or several times in a row with the same effect. This is significant because networks are unreliable and clients tend to retry requests automatically when they do not get a response quickly — these retries without idempotency can cause them to perform operations multiple times unintentionally.
A GET request is considered idempotent, because it doesn't change the server's state to get the same resource over and over. PUT and DELETE are idempotent too, because you achieve the same end state no matter how many times you run them. POST is non-idempotent — repeated submission of POST /orders due to a timeout could result in two charges on a user's account. To avoid this, APIs such as Stripe utilize an idempotency key, a unique identifier for each request which allows the server to recognize duplicates instead of handling them again.

**Q10. How would you debug a production issue with no logs?**  
Walk through your approach step by step.

*RTA/* First thing I would try is to reproduce the problem locally or on a staging server with the same input you provided. Then I would add temporary polling or instrumentation to see what is happening in real time -- maybe you can use tools like pm2 logs for nodejs processes or dmesg if your process crashed on OS level. I'd look at the recent releases to see what was changed prior to this issue and then I'd check the network requests in the browser or through a proxy like Charles. Then I'd try to narrow the problem down, find which part of your setup or which input triggers the problem, fix it, and make sure it doesn't cause other regression.

---

## Evaluation Criteria

Each question is scored independently:
- Answer ≥ 70 characters with relevant content → full credit
- Answer < 70 characters → zero for that question (below minimum threshold)
- Answer present but unrelated to the question → zero (penalty)

| Criterion | Weight per question |
|-----------|-------------------|
| Technical accuracy | 60% |
| Concrete example or scenario | 25% |
| Own words (not copy-paste) | 15% |

> Answers that demonstrate conceptual understanding score higher than textbook definitions.