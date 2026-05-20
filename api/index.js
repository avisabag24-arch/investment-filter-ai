module.exports = async (req, res) => {
  try {
    const { ticker } = req.query;

    if (!ticker) {
      return res.status(400).json({
        error: "Ticker is required"
      });
    }

    const apiKey = process.env.FINNHUB_API_KEY;

    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
    );
    const quote = await quoteRes.json();

    let stockData;

    // ✅ אם אין נתונים אמיתיים → נשתמש בנתונים מדומים
    if (!quote || quote.c === 0) {
      stockData = {
        price: Math.floor(Math.random() * 300) + 50,
        change: (Math.random() * 5).toFixed(2),
        changePercent: (Math.random() * 3).toFixed(2),
        name: ticker + " Corp (Mock)"
      };
    } else {
      stockData = {
        price: quote.c,
        change: quote.d,
        changePercent: quote.dp,
        name: ticker + " Inc"
      };
    }

    return res.status(200).json({
      ticker,
      stock: stockData
    });

  } catch (error) {
    return res.status(500).json({
      error: "API failed",
      details: error.message
    });
  }
};
``
