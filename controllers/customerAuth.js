const { Customer } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, username, password } = req.body;

      const { Op } = require("sequelize");
      const checkCustomer = await Customer.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (checkCustomer) {
        return res.status(409).json({
          status: false,
          message: "username or email already exists",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const customer = await Customer.create({
        name,
        email,
        username,
        password: encryptedPassword,
      });

      return res.status(201).json({
        status: true,
        message: "Registration successful",
        data: {
            id: customer.id,
            username: customer.username
        },
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const exist = await Customer.findOne({ where: { username } });

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
        type: "customer",
      };

      const token = jwt.sign(payload, JWT_SECRET);

      return res.status(200).json({
        status: true,
        message: "login successful",
        data: {
          id: exist.id,
          name: exist.name,
          username: exist.username
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
