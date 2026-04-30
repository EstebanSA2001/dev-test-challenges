// server.js
// BUG #1: missing await in async DB simulation — always returns undefined
// BUG #2: 200 status returned on error — misleads client
// BUG #3: no input validation on POST /save
// BUG #4: memory leak — global array grows without limit
// BUG #5: no error handling middleware
// BUG #6: GET /data returns wrong field (undefined)

const express = require('express');
const app = express();
app.use(express.json());


// BUG #4: unbounded global array — memory leak under load
const requestLog = [];
const MAX_LOG_SIZE = 100;

function logRequest(entry) {
  requestLog.push(entry);
  if (requestLog.length > MAX_LOG_SIZE) {
    requestLog.shift();
  }
}

// Simulated async DB read
async function getDataFromDB() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, value: 'hello' }), 100);
  });
}

// GET /data
// BUG #1: missing await — data is always undefined
// BUG #6: returns data.result which doesn't exist on the object
app.get('/data', async (req, res, next) => {
  try {
    logRequest({ts: Date.now() });  // Log request details for debugging

  const data = await getDataFromDB();          // BUG #1: missing await

  if (!data) {
    return res.status(404).json({ error: 'No data found' });  // BUG #2: should be 404
  }

  res.json({ result: data.value });  // BUG #6: should be data.value
    }catch (err) {
      next(err);
    }    
});

// POST /save
// BUG #3: no validation — accepts anything including empty, null, XSS payloads
// BUG #4: every request logged permanently
app.post('/save', (req, res, next) => {
  try {
  const { name, value } = req.body;
  if (!name || !value) {
    return res.status(400).json({ error: 'Name and value are required' });
  }

  if (typeof name !== 'string' || typeof value !== 'string') {
    return res.status(400).json({ error: 'Invalid input types' });
  }

  logRequest({ name, value, ts: Date.now() });
  
  res.status(201).json({ saved: true, name, value });
  } catch (err) {
    next(err);
  }
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

// BUG #5: no error handling middleware — unhandled errors crash or leak stack traces
// Missing: app.use((err, req, res, next) => { ... })

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;
