const express = require('express');
const MailChecker = require('mailchecker');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/check', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }
  const isValid = MailChecker.isValid(email);
  res.json({ email, disposable: !isValid, valid: isValid });
});

app.post('/check', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }
  const isValid = MailChecker.isValid(email);
  res.json({ email, disposable: !isValid, valid: isValid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
