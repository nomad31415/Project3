/

const express = require('express');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const app = express();

let nlu;

if (process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY
  && process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY !== '') {
  nlu = new NaturalLanguageUnderstandingV1({
    version: '2018-04-05',
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL || 'https://gateway.watsonplatform.net/natural-language-understanding/api',
    iam_apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY || 'Wg_atDqN4ucqWeTg-fcbStA7Ois8BDz-qaaSFr6oHff-',
    iam_url: process.env.ASSISTANT_IAM_URL || 'https://iam.bluemix.net/identity/token',
  });
} else {
  nlu = new NaturalLanguageUnderstandingV1({
    version: '2018-04-05',
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL || 'https://gateway.watsonplatform.net/natural-language-understanding/api',
    username: process.env.NATURAL_LANGUAGE_UNDERSTANDING_USERNAME || 'XXXXX',
    password: process.env.NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD || 'YYYYYYYY',
  });
}
// setup body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Bootstrap application settings
require('./config/express')(app);


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/analyze', (req, res, next) => {
  if (process.env.SHOW_DUMMY_DATA) {
    res.json(require('./payload.json'));
  } else {
    nlu.analyze(req.body, (err, results) => {
      if (err) {
        return next(err);
      }
      return res.json({ query: req.body.query, results });
    });
  }
});

// error-handler settings
require('./config/error-handler')(app);

module.exports = app;
