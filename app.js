const express = require('express');
const NLPCloudClient = require('nlpcloud');

const app = express();
app.use(express.json());

const port = 3000;

const YOUR_MODEL_NAME = 'finetuned-llama-3-70b';

const client = new NLPCloudClient({model:YOUR_MODEL_NAME,token:process.env.YOUR_API_KEY,gpu:true})
app.post('/nlp', async (req, res) => {
    const { input, context, history } = req.body;
  client.chatbot({ input, context, history })
    .then(function (response) {
    res.json(response.data);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.response.data.detail })
  });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
