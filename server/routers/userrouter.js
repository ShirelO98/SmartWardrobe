const { Router } = require("express");
const { userController } = require("../controllers/userController");
const userRouter = new Router();

userRouter.get("/wardrobes", userController.getWardrobes);
userRouter.post("/wardrobes/wardrobeName", userController.addWardrobe);
userRouter.put("/wardrobes/wardrobeID/newName", userController.updateWardrobe);
userRouter.delete("/wardrobes/wardrobeID");

module.exports = { userRouter };
