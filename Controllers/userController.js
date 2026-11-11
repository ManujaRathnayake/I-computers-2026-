import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createUser(req, res) {
  try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new user({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: passwordHash,
    });

    await newUser.save();

    res.status(200).json({
      massage: "user created Sucessfully",
    });
  } catch (error) {
    res.status(401).json({
      massage: "error creating user",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const User = await user.findOne({
      email: req.body.email,
    });

    if (User == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        User.password
      );

      if (isPasswordCorrect) {
        const payload = {
          email: User.email,
          firstName: User.firstName,
          lastName: User.lastName,
          isAdmin: User.isAdmin,
          isBlocked: User.isBlocked,
          isEmailVerified: User.isEmailVerified,
          image: User.image,
        };

        const token = jwt.sign(
          payload,
          process.env.I_computers_secret_Key,
          {
            expiresIn: "48h",
          }
        );

        res.json({
          token: token,
          isAdmin: User.isAdmin,
        });
      } else {
        res.status(401).json({
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error finding user",
    });
  }
}

export function isAdmin(req) {
  if (req.User == null) {
    return false;
  }

  if (req.User.isAdmin) {
    return true;
  } else {
    return false;
  }
}

export async function getUserDate(req, res) {
  if (req.User == null) {
    res.status(401).json({
      message: "Unotherized",
    });
  } else {
    res.json(req.User);
  }
}

export default async function updateUserDate(req, res) {
  if (req.User == null) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    await user.findOneAndUpdate(
      { email: req.User.email },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
      }
    );

    const updateUser = await user.findOne({
      email: req.User.email,
    });

    const token = jwt.sign(
      {
        email: updateUser.email,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        isAdmin: updateUser.isAdmin,
        isBlocked: updateUser.isBlocked,
        isEmailVerified: updateUser.isEmailVerified,
        image: updateUser.image,
      },
      process.env.I_computers_secret_Key,
      {
        expiresIn: "48h",
      }
    );

    res.status(200).json({
      token: token,
      isAdmin: updateUser.isAdmin,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user data",
    });
  }
}

export async function changePassword(req, res) {
  if (req.User == null) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }else{
    try{
      const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
      await user.findOneAndUpdate(
        { email: req.User.email },
        { password: hashedPassword }
      );
      res.status(200).json({
        message: "Password changed successfully",
      });



    }catch(error){
        res.status(500).json({
            message : "Error changing password"
        })
    }
  }
}