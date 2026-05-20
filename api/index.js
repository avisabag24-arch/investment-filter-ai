const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const { ticker } = req.query;

    if (!ticker) {
      return res.status(400).json({ error: "Ticker is required" });
    }

    const apiKey = process.env.FINNHUB_API_KEY;

    const quote = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
    );

    const profile = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`
    );

    return res.status(200).json({
      ticker,
      stock: {
        price: quote.data.c,
        change: quote.data.d,
        changePercent: quote.data.dp,
        name: profile.data.name
      }
    });

  } catch (error) {
    return res.status(500).json({
      error: "API failed",
      details: error.message
    });
  }
};
