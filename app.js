const express = require('express');
const cors = require('cors')
const NLPCloudClient = require('nlpcloud');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json());

const client = new NLPCloudClient({model:process.env.YOUR_MODEL_NAME,token:process.env.YOUR_API_KEY,gpu:true})
app.post('/nlp', async (req, res) => {
    const { input, context, history } = req.body;
  client.chatbot({ input, context, history })
    .then(function (response) {
    res.json(response.data);
  })
    .catch(function (err) {
    res.status(500).json({ error: err.response.data })
  });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
