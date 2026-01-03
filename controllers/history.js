const { ExamResult, Customer, sequelize } = require("../models");

module.exports = {
  saveResult: async (req, res, next) => {
    try {
      const { category, score, correct_count, total_questions, duration_spent } = req.body;
      const customer_id = req.user.id;


      const result = await ExamResult.create({
        customer_id,
        category,
        score,
        correct_count,
        total_questions,
        duration_spent,
      });

      return res.status(201).json({
        status: true,
        message: "Result saved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getHistory: async (req, res, next) => {
    try {
      const customer_id = req.user.id;
      const history = await ExamResult.findAll({
        where: { customer_id },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        status: true,
        message: "History retrieved successfully",
        data: history,
      });
    } catch (error) {
      next(error);
    }
  },

  getLeaderboard: async (req, res, next) => {
    try {
      const { category } = req.query;
      const leaderboard = await ExamResult.findAll({
        where: category ? { category } : {},
        include: [
          {
            model: Customer,
            attributes: ["name", "username"],
          },
        ],
        order: [["score", "DESC"]],
        limit: 10,
      });

      return res.status(200).json({
        status: true,
        message: "Leaderboard retrieved successfully",
        data: leaderboard,
      });
    } catch (error) {
      next(error);
    }
  },

  getSummaryStats: async (req, res, next) => {
    try {
      const customer_id = req.user.id;
      
      const history = await ExamResult.findAll({
        where: { customer_id },
        attributes: ['score', 'createdAt']
      });

      const completed = history.length;
      const avgScore = completed > 0 
        ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / completed) 
        : 0;
      
      // Calculate active days (unique dates in history)
      const uniqueDays = new Set(history.map(item => new Date(item.createdAt).toDateString()));
      const activeDays = uniqueDays.size;

      return res.status(200).json({
        status: true,
        message: "Stats retrieved successfully",
        data: {
          completed,
          avg_score: avgScore,
          active_days: activeDays
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
