const express = require('express');
const {createProject , getProjectById , getProjects, addTechSkills, addProjectImage} = require("../controller/projects.controller")

const router = express.Router()

/** projects route */

router.post('/post/create/project' , createProject);
router.post('/post/add-tech-skills/project/:id' , addTechSkills)
router.post('/post/add-project-image/project/:id' , addProjectImage)
router.get('/get/projects' , getProjects)
router.get('/get/project/:id' , getProjectById)

module.exports = router