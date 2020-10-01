const router = require('express').Router();
const axios = require('axios');

router.get('/trending', (req, res) => {
  axios.get('https://api.giphy.com/v1/gifs/trending', {
    params: {
      api_key: process.env.GIPHY_API_KEY
    }
  })
    .then((result) => {
      const data = result.data.data[0];
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({error: err.message});
    })
});

module.exports = router;