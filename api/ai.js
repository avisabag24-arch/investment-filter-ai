module.exports = async (req, res) => {
  try {
    const { ticker } = req.query;

    if (!ticker) {
      return res.status(400).json({ error: "Ticker required" });
    }

    const score = Math.floor(Math.random() * 3) + 7;

    const decision = score >= 9
      ? "BUY ✅"
      : score >= 7
      ? "WATCH 🟡"
      : "REJECT ❌";

    const analysis = {
      ticker,
      score,
      decision,
      summary: `${ticker} operates in a strong market with growth potential but faces competition.`,

      categories: {
        business: {
          score: 8,
          strengths: ["Strong market position", "Scalable model"],
          risks: ["Competition"]
        },
        financials: {
          score: 7,
          strengths: ["Revenue growth", "Healthy margins"],
          risks: ["Profit variability"]
        },
        technical: {
          score: 6,
          strengths: ["Uptrend"],
          risks: ["Volatility"]
        },
        risks: {
          score: 5,
          strengths: ["Diversified base"],
          risks: ["Market pressure"]
        }
      }
    };

    res.json(analysis);

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
};
``
