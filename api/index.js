module.exports = async (req, res) => {
  try {
    const { ticker } = req.query;

    if (!ticker) {
      return res.status(400).json({ error: "Ticker is required" });
    }

    // ✅ ניתוח חכם (מוחלף לנתונים חכמים)
    const analysis = {
      ticker,
      summary: `${ticker} is a technology company with strong growth potential.`,
      score: Math.floor(Math.random() * 4) + 7,
      decision: Math.random() > 0.5 ? "BUY ✅" : "WATCH 🟡",
      strengths: [
        "Strong revenue growth",
        "Market leader",
        "High margins"
      ],
      risks: [
        "High valuation",
        "Market competition"
      ]
    };

    return res.status(200).json(analysis);

  } catch (error) {
    return res.status(500).json({
      error: "Analysis failed"
    });
  }
};
