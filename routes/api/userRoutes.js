const router = require("express").Router();
// getting all controllers
const {
  allUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser,
  addAmigo,
  removeAmigo,
} = require("../../controllers/userController");

router.route("/").get(allUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getAUser).put(updateUser).delete(deleteUser);

// /api/users/:userId /friends
router.route("/:userId/friends").post(addAmigo);

// /api/users/:userId /friends/:friendId
router.route("/:userId/friends/:friendId").delete(removeAmigo);

// Export module router
module.exports = router;
