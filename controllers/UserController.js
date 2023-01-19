const User = require("../data/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Constants = require("../data/config/constants");
const ServiceResponse = require("../services/ServiceResponse");

var salt = bcrypt.genSaltSync(10);

const generateAccessToken = (id, Name, Surname, Email, Role) => {
  const token = jwt.sign({ id, Name, Surname, Email, Role }, Constants.Secret);
  return token;
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { Email: req.body.email } });
    if (user && bcrypt.compareSync(req.body.password, user.Password)) {
      const { id, Name, Surname, Email, Role } = user;

      const token = generateAccessToken(id, Name, Surname, Email, Role);

      res
        .status(200)
        .json(
          new ServiceResponse(
            "Logged in successfully.",
            token,
            null,
            true,
            null
          )
        );
    } else {
      res
        .status(404)
        .json(
          new ServiceResponse(
            "Login or password incorrect",
            null,
            null,
            false,
            null
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.register = async (req, res, next) => {
  const { Name, Surname, Email, Password, Role } = req.body;
  try {
    const user = await User.findOne({ where: { Email } });
    if (user) {
      res
        .status(400)
        .json(
          new ServiceResponse("User already exists", null, null, false, null)
        );
    } else {
      const newUser = new User({
        Name,
        Surname,
        Email,
        Password: bcrypt.hashSync(Password, salt),
        Role,
      });
      await newUser.save();
      res
        .status(200)
        .json(
          new ServiceResponse(
            "User successfully created.",
            null,
            null,
            true,
            null
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["Password"],
      },
    });
    res
      .status(200)
      .json(new ServiceResponse("All users loaded.", null, null, true, users));
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.updateProfile = async (req, res, next) => {
  const userId = req.body.id;
  const updatedUser = {
    Name: req.body.name,
    Surname: req.body.surname,
    Email: req.body.email,
  };

  try {
    const result = await User.update(updatedUser, { where: { id: userId } });
    if (!result) {
      res
        .status(400)
        .json(
          new ServiceResponse("Profile not updated.", null, null, false, null)
        );
    } else {
      const user = await User.findOne({ where: { id: userId } });
      const { id, Name, Surname, Email, Role } = user;

      const token = generateAccessToken(id, Name, Surname, Email, Role);
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Profile successfully updated.",
            token,
            null,
            true,
            null
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.body.id } });
    if (!user) {
      return res
        .status(404)
        .json(
          new ServiceResponse("User not updated.", null, null, false, null)
        );
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(404)
        .json(
          new ServiceResponse("Passwords must match.", null, null, false, null)
        );
    }

    if (!bcrypt.compareSync(req.body.oldPassword, user.Password)) {
      return res
        .status(404)
        .json(
          new ServiceResponse("Invalid password.", null, null, false, null)
        );
    }

    await User.update(
      { ...User, Password: bcrypt.hashSync(req.body.newPassword, salt) },
      { where: { id: req.body.id } }
    );
    return res
      .status(200)
      .json(
        new ServiceResponse(
          "Passwords successfully updated.",
          null,
          null,
          true,
          null
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.body.id;
  const updatedUser = {
    Name: req.body.name,
    Surname: req.body.surname,
    Email: req.body.email,
    Role: req.body.role,
  };

  try {
    const result = await User.update(updatedUser, { where: { id: userId } });
    if (!result) {
      res
        .status(400)
        .json(
          new ServiceResponse("Profile not updated.", null, null, false, null)
        );
    } else {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "User successfully updated.",
            null,
            null,
            true,
            null
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.body.id },
      attributes: {
        exclude: ["Password"],
      },
    });
    if (user) {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "User successfully loaded.",
            null,
            null,
            true,
            user
          )
        );
    } else {
      res
        .status(404)
        .json(new ServiceResponse("User not found", null, null, false, null));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.getUserByEmail = async (req, res, next) => {
  console.log("getUserByEmail ", req.body);
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: {
        exclude: ["Password"],
      },
    });
    if (user) {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "User successfully loaded.",
            null,
            null,
            true,
            user
          )
        );
    } else {
      res
        .status(404)
        .json(new ServiceResponse("User not found", null, null, false, null));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  console.log("delete controller0 ===========>", userId);
  console.log("delete controller1 ===========>", req.params.id);
  console.log("delete controller2 ===========>", req.params);
  try {
    const user = await User.findOne({ where: { id: userId } });
    console.log("delete controller3 ===========>", user);
    if (user) {
      await User.destroy({
        where: { id: userId },
      });
      res
        .status(200)
        .json(
          new ServiceResponse(
            "User successfully deleted.",
            null,
            null,
            true,
            null
          )
        );
    } else {
      res
        .status(200)
        .json(new ServiceResponse("User not found.", null, null, false, null));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};
