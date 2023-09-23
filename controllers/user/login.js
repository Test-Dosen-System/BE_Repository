const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");
const v = new validator();
const { JWT_SECRET } = process.env;

module.exports = {
  login: async (req, res, next) => {
    try {
      const schema = {
        username: "string|empty:false",
        password: "string|min:6",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: false,
          message: "password harus 6 karakter",
        });
      }

      const { username, password } = req.body;

      const exist = await User.findOne({ where: { username } });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "username or password isn't correct",
        });
      }

      const comparePassword = await bcrypt.compare(password, exist.password);

      if (!comparePassword) {
        return res.status(401).json({
          status: false,
          message: "username or password isn't correct",
        });
      }

      const payload = {
        id: exist.id,
        username: exist.username,
        roles: exist.roles,
      };

      const token = jwt.sign(payload, JWT_SECRET);

      return res.status(200).json({
        status: true,
        message: "login successful",
        data: {
          payload,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
