module.exports = async (req, res) => {
  try {
    const { ticker } = req.query;

    // ✅ בדיקה אם הוכנס טיקר
    if (!ticker) {
      return res.status(400).json({ error: "Ticker is required" });
    }

    // ✅ מפתח API
    const apiKey = process.env.FINNHUB_API_KEY;

    // ✅ Fetch מחיר מניה
    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
    );
    const quote = await quoteRes.json();

    // ✅ Fetch פרטי חברה
    const profileRes = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`
    );
    const profile = await profileRes.json();

    // ✅ אם אין נתונים אמיתיים
    if (!quote || quote.c === 0) {
      return res.status(200).json({
        ticker,
        stock: {
          price: "No Data",
          change: "-",
          changePercent: "-",
          name: "Data not available"
        }
      });
    }

    // ✅ החזרת נתונים תקינים
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
    // ✅ טיפול בשגיאה
    return res.status(500).json({
      error: "API failed",
      details: error.message
    });
  }
};
