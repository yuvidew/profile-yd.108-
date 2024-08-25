const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({
    title : {
        type : String
    },
    description :{
        type : String
    },
    skills : [String],
    img : {
        type : String
    },
    github : {
        type : String
    },
    live : {
        type : String
    },
})

module.exports = mongoose.model("projects" , projectSchema)

