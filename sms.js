const express = require('express');
const app = express();
const accountSid = 'TWILIOACCOUNTSID';
const authToken = 'TWILIOAUTHTOKEN';
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send-sms', (req, res) => {
  const toNumber = req.body.toNumber;
  const message = req.body.message;
  
  client.messages
    .create({
      body: message,
      from: 'TWILIOPHONENUMBER',
      to: toNumber
    })
    .then(message => {
      console.log(SMS sent with message SID: ${message.sid});
      res.send('SMS sent successfully!');
    })
    .catch(error => {
      console.error(Error sending SMS: ${error.message});
      res.status(500).send('Error sending SMS');
    });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
You sent
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

const accountSid = 'ACCOUNTSID';
const authToken = 'AUTHTOKEN';
const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send-sms', (req, res) => {
  const { to, body } = req.body;

  client.messages.create({
    body: body,
    to: to,
    from: 'TWILIOPHONENUMBER'
  })
  .then(() => {
    res.send('SMS sent successfully!');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error sending SMS');
  });
});

app.listen(port, () => {
  console.log(Server listening on port ${port});
});
