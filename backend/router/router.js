const express = require('express');
const {createProject , getProjectById , getProjects} = require("../controller/projects.controller")

const router = express.Router()

/** projects route */

router.post('/post/create/project' , createProject);
router.get('/get/projects' , getProjects)
router.get('/get/project/:id' , getProjectById)

module.exports = router