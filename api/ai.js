module.exports = async (req, res) => {
  try {
    const { ticker } = req.query;

    if (!ticker) {
      return res.status(400).json({ error: "Ticker required" });
    }

    // 🔥 כאן ה"Claude שלך"
    const analysis = {
      ticker,
      score: Math.floor(Math.random() * 3) + 7,
      decision: Math.random() > 0.5 ? "BUY ✅" : "WATCH 🟡",
      summary: `${ticker} operates in a strong market with growth potential but faces competition.`,

      categories: {
        business: {
          score: 8,
          strengths: ["Market leader", "Strong growth"],
          risks: ["Competition"]
        },

        financials: {
          score: 7,
          strengths: ["Revenue growth", "Healthy margins"],
          risks: ["Fluctuating profits"]
        },

        technical: {
          score: 6,
          strengths: ["Uptrend"],
          risks: ["High volatility"]
        },

        risks: {
          score: 5,
          strengths: ["Diversification"],
          risks: ["Market pressure"]
        }
      }
    };

    res.json(analysis);

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
};
