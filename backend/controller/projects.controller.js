const projectModel = require("../model/project.model");

const createProject = async (req , res) => {
    const {body} = req ;
    try {
        const result = await projectModel.create(body);
        console.log(body , result);

        if(result._id){
            return res.status(201).json({
                msg : 'Project Successfully created..'
            })
        }

        return res.status(500).json({
            msg : "Some think is wrong from server side..."
        })
    } catch (error) {
        return res.status(404).json({
            msg : 'Failed to create resume'
        })
    }
}

const getProjectById = async (req , res) => {
    const {id} = req.params ;

    try {
        const result = await projectModel.findById(id)

        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json(error)
    }
}

const getProjects = async (req , res) => {
    const result = await projectModel.find();

    return res.status(200).json(result);
}

module.exports = {
    createProject , 
    getProjectById,
    getProjects
}