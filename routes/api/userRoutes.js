const router = require('express').Router();
// getting all controllers
const {
    allUsers,
    getAUser,
    createUser,
    updateUser,
    deleteUser,
    addAmigo,
    removeAmigo,
} = require('../../controllers/userController');



