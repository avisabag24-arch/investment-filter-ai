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
    price: quote.c || 0,
    change: quote.d || 0,
    changePercent: quote.dp || 0,
    name: profile.name || "Unknown"
  }
});

  } catch (error) {
    return res.status(500).json({
      error: "API failed",
      details: error.message
    });
  }
};
