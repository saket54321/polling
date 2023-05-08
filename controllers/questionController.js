const Question = require("../models/schema")

//creating question
module.exports.create = async (req,res)=>{
    const {question,options} = req.body ;
    try {
        let newQuestion = await Question.create({
            question:question,
        });
        return res.json({
            message:"successfully created",
            question:newQuestion
        });
    } catch (error) {
        console.log("error",error)
        return res.json({
            error:error
        })
    }
}

//add options addOptions

module.exports.addOptions = async (req,res)=>{
    const option =  req.body.option;
    console.log("option",option);
    console.log("req.params",req.params.id);
    const  value = option ;
    console.log("OPTION TXTRT%%%",value);
    try {
        let question = await Question.findByIdAndUpdate({_id:req.params.id})
        console.log("###beforeee",question);
        question.options.push({
            text:option 
        });
        question.save();
        console.log("###afterr",question);
        return res.json({
            message:"option added succesfully",
            question:question
        });
    } catch (error) {
        console.log("error",error);
        return res.json({
            error:error
        })
    }
}


// delete question 
module.exports.deleteQuestion = async (req,res)=>{

    try {
        let question = await Question.findByIdAndDelete({_id:req.params.id})
        return res.json({
            message:"question deleted succesfully",
            question:question
        });
    } catch (error) {
        console.log("error",error);
        return res.json({
            error:error
        })
    }
}

//delete option 
module.exports.deleteOption = async (req,res) => {
    try {
        let question = await Question.findOne({ "options._id": req.params.id });
        if (!question) {
            return res.status(404).json({ message: "Option not found" });
        }
        let optionIndex = question.options.findIndex(option => option._id == req.params.id);
        question.options.splice(optionIndex, 1);
        await question.save();
        return res.json({
            message: "Option deleted successfully",
            question: question
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            error: error.message
        });
    }
};

//add vote
module.exports.addVote = async (req, res) => {
    try {
        let question = await Question.findOne({ "options._id": req.params.id });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        let optionIndex = -1;
        for (let i = 0; i < question.options.length; i++) {
            if (question.options[i]._id == req.params.id) {
                optionIndex = i;
                break;
            }
        }
        if (optionIndex === -1) {
            return res.status(404).json({ message: "Option not found" });
        }
        question.options[optionIndex].votes++;
        await question.save();

        return res.json({
            message: "Vote added successfully",
            question: question
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            error: error.message
        });
    }
};

//view details

module.exports.viewDetails = async (req,res)=>{
    try {
        let question = await Question.findById({_id:req.params.id});
        return res.json({
            message:"View details of question",
            question:question
        });
    } catch (error) {
        console.log("error",error)
        return res.json({
            error:error
        })
    }
}


