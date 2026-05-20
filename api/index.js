module.exports = async (req, res) => {
  try {
    const { ticker } = req.query;

    if (!ticker) {
      return res.status(400).json({ error: "Ticker is required" });
    }

    const apiKey = process.env.FINNHUB_API_KEY;

    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
    );
    const quote = await quoteRes.json();

    const profileRes = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`
    );
    const profile = await profileRes.json();

    return res.status(200).json({
      ticker,
      stock: {
        price: quote.c,
        change: quote.d,
        changePercent: quote.dp,
        name: profile.name
      }
    });

  } catch (error) {
    return res.status(500).json({
      error: "API failed",
      details: error.message
    });
  }
};
