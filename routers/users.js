const express = require("express");
const {usersModel} = require("../models/users.js");
const {KGLError} = require("../utils/custom-error.js")
const bcrypt = require("bcrypt")

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *          description: A list of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      description: The unique identifier for the user
 *                    name:
 *                      type: string
 *                      description: The name of the user
 *                    email:
 *                      type: string
 *                      description: The email of the user
 *                    password:
 *                      type: string
 *                      description: The password of the user
 *                    role:
 *                      type: string
 *                      description: The role of the user
 *                    departement:
 *                      type: string
 *                      description: The department of the user
 *                    status:
 *                      type: string
 *                      description: The status of the user
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that no users were found
 *                 error:
 *                   type: string
 *                   description: HTTP status code indicating the error
 *                 reason:
 *                   type: string
 *                   description: Additional information about the error 
 */
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


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a single user by their unique ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                 password:
 *                   type: string
 *                   description: The password of the user
 *                 role:
 *                   type: string
 *                   description: The role of the user
 *                 departement:
 *                   type: string
 *                   description: The department of the user
 *                 status:
 *                   type: string
 *                   description: The status of the user
 */
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


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the system
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the user
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               role:
 *                 type: string
 *                 description: The role of the user
 *               departement:
 *                 type: string
 *                 description: The department of the user
 *               status:
 *                 type: string
 *                 description: The status of the user
 */
router.post("/", async (req, res, next) => {
  try{
    let body = req.body;

    // hash the password before saving it to the databse
    const saltRounds = 10;
    body.password = await bcrypt.hash(body.password, saltRounds);

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


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user from the database using their MongoDB ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Failed to delete user
 */
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