const projectModel = require("../model/project.model");

// Utility function to validate input data
const validateProjectData = (data) => {
    const { title, github, live } = data;
    if (!title || typeof title !== 'string') return 'Invalid title';
    if (github && typeof github !== 'string') return 'Invalid GitHub URL';
    if (live && typeof live !== 'string') return 'Invalid live URL';
    return null;
};

// Create a new project
const createProject = async (req, res) => {
    const { title, github, live } = req.body;

    // Validate the input data
    const validationError = validateProjectData({ title, github, live });
    if (validationError) {
        return res.status(400).json({ msg: validationError });
    }

    console.log(title, github, live);

    try {
        const result = await projectModel.create({ title, github, live });

        return res.status(201).json({
            msg: 'Project successfully created',
            id: result._id
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed to create project',
            error: error.message
        });
    }
};

// Add technical skills to a project
const addTechSkills = async (req, res) => {
    const { skills } = req.body;
    const { id } = req.params;

    if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({ msg: 'Skills must be a non-empty array' });
    }

    try {
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        for (const skill of skills) {
            if (typeof skill !== 'string') {
                return res.status(400).json({ msg: 'Each skill must be a string' });
            }
            project.skills.push(skill);
        }

        await project.save();

        return res.status(201).json({ msg: 'Tech skills added successfully' });
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed to add tech skills',
            error: error.message
        });
    }
};

const addProjectImage = async (req , res) => {
    const { image } = req.body;
    const { id } = req.params;

    if(image.length == 0){
        return res.status(400).json({ msg: 'image must be a required' });
    }

    try {
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        project.img = image ;

        await project.save();

        return res.status(201).json({ msg: 'Tech skills added successfully' });

    } catch (error) {
        return res.status(500).json({
            msg: 'Failed to add tech skills',
            error: error.message
        });
    }
}

// Get a project by ID
const getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed to retrieve project',
            error: error.message
        });
    }
};

// Get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed to retrieve projects',
            error: error.message
        });
    }
};

module.exports = {
    createProject,
    addTechSkills,
    getProjectById,
    getProjects,
    addProjectImage
};
