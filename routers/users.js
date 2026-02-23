const express = require("express");
const {usersModel} = require("../models/users.js");
const {KGLError} = require("../utils/custom-error.js")

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await usersModel.find({});
  try {
    console.log(users)
    if(users){
    res.status(200).json(users);
    } else {
      throw new KGLError("No users found", 404)
    }
  } catch (error) {
    next(error)
  }
  
})

router.get("/:id", async (req, res, next) => {
  const user = await usersModel.findById(req.params.id);
  try {
    if(user) {
      res.status(200).json(user)
    } else {
      throw new KGLError("no user found", 404)
    }
  } catch (error) {
    next();
  }
})

router.post("/", async (req, res, next) => {
  try{
    let body = req.body;

    body.password = "1234567890"

    let user = new usersModel(body);

    user.save()
      .then((data)=>{
        res.status(200).json({message:"user created succefully", data})
      })
      .catch((err) => {
        next(new KGLError("No users saved", 404));
      })

  }catch(error) {
    next(error);
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedUser = await usersModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });

  } catch (error) {
    res.status(400).json({
      error: "Failed to delete user",
      details: error.message
    });
  }
});



module.exports = {router};