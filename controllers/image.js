const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd7e5f522695740b58f6b88e6afcf8779'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(error => res.status(400).json('unable to work with Api'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(error => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleApiCall,
  handleImage
};
