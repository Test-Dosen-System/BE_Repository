const { user } = require("../../models");
const bcrypt = require("bcrypt");
const validator = require("fastest-validator");
const v = new validator();

module.exports = {
  create: async (req, res, next) => {
    try {
      const schema = {
        name: "string|empty:false",
        email: "email|empty:false",
        username: "string|empty:false",
        password: "string|min:6",
        roles: "string|empty:false",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: false,
          message: validate,
        });
      }

      const { name, email, username, password, roles = "user" } = req.body;

      const findUser = await user.findOne({ where: { email } });

      if (findUser) {
        return res.status(409).json({
          status: false,
          message: "user already exist",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const created = await user.create({
        name,
        email,
        username,
        password: hashPassword,
        roles,
      });

      return res.status(201).json({
        status: true,
        message: "create user successful",
        data: {
          id: created.id,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
