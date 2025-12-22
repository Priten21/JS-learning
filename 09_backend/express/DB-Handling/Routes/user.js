const express = require('express');
const { handleGetAllUsers, handleGetUserById, handleUpdateuserById, handleDeleteUserById, handleCreateNewUser} = require("../controllers/user");

const router = express.Router();

//REST API 
router
    .route("/")
    .get( handleGetAllUsers)
    .post( handleCreateNewUser)

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateuserById)
    .delete(handleDeleteUserById)

module.exports = router;