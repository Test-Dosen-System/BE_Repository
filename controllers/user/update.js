const { user } = require("../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = {
  update: async (req, res, next) => {
    try {
      const schema = {
        name: "string|empty:false",
        email: "email|empty:false",
        username: "string|empty:false",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: false,
          message: validate,
        });
      }

      const { id } = req.params;
      const { name, email, username } = req.body;

      const exist = await user.findOne({ where: { id } });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      const update = await user.update(
        {
          name,
          email,
          username,
        },
        { where: { id } }
      );

      return res.status(200).json({
        status: true,
        message: "update data successful",
        data: {
          update,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
