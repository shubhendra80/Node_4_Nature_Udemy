const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();





router.route('/')
.get(userControllers.getUsers)
.post(userControllers.addUser);

router.route('/:id')
.get(userControllers.getUserByID)
.post(userControllers.updateUser)
.patch(userControllers.updateUser)
.delete(userControllers.deleteUser);

module.exports = router;