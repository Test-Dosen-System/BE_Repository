require("dotenv").config();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");
const v = new validator();
const { JWT_SECRET } = process.env;

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

      const exist = await User.findOne({ where: { id } });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      const update = await User.update(
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
  updatePassword: async (req, res, next) => {
    try {
      const token = req.headers["authorization"].split("Bearer ")[1];
      const verify = jwt.verify(token, JWT_SECRET);

      const schema = {
        oldPassword: "string|min:6",
        newPassword: "string|min:6",
        confirmNewPassword: "string|min:6",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: false,
          message: validate,
        });
      }

      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      const findUser = await User.findOne({ where: { id: verify.id } });

      const compare = await bcrypt.compare(oldPassword, findUser.password);

      if (!compare) {
        return res.status(400).json({
          status: false,
          message: "old password isn't correct",
        });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          status: false,
          message: "new password and confirm new password is not same",
        });
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);

      const updated = await User.update(
        {
          password: hashPassword,
        },
        { where: { id: verify.id } }
      );

      return res.status(200).json({
        status: true,
        message: "password has been updated",
        data: {
          id: updated,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
