
async function getStockData(symbol) {
  try {
    const quote = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
    );

    const profile = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_KEY}`
    );

    return {
      price: quote.data.c || 0,
      change: quote.data.d || 0,
      changePercent: quote.data.dp || 0,
      name: profile.data.name || "Unknown",
      industry: profile.data.finnhubIndustry || "Unknown"
    };

  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);
    return {
      price: 0,
      change: 0,
      changePercent: 0,
      name: "Error fetching data",
      industry: "Unknown"
    };
  }
}
חישוב ציון ראשוני
function calculateScore(data) {
  let fundamental = 0;
  let technical = 0;
  let valuation = 0;

  if (data.price > 100) fundamental += 3;
  if (data.changePercent > 0) technical += 3;
  if (data.price < 500) valuation += 3;

  const total =
    fundamental * 0.4 +
    technical * 0.3 +
    valuation * 0.3;

  return {
    fundamental,
    technical,
    valuation,
    total
  };
}

// 🎯 החלטה
function getDecision(score) {
  if (score >= 9) return "✅ BUY NOW";
  if (score >= 7) return "🟡 WATCHLIST";
  return "❌ REJECT";
}

// 🚀 API
app.get("/analyze/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();

    const stock = await getStockData(ticker);
    const scoreData = calculateScore(stock);
    const decision = getDecision(scoreData.total);

    res.json({
      ticker,
      stock,
      score: scoreData,
      decision
    });

  } catch (err) {
    res.status(500).json({ error: "API Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
``
