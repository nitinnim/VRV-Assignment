
const express = require('express');
const router = express.Router();
const {getAllUsers, getUserDetails} = require('../controllers/admin')

router.get("/getAllUsers", getAllUsers);
router.get("/getUserDetails/:id", getUserDetails);

module.exports = router;
