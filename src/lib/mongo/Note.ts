import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title : String,
    content : String,
    _createdDate : {
        type : Date,
        required:false,
    },
    _changedDate : {
        type : Date,
        required : true,
        default : Date.now
    }
})

export const Note = mongoose.models.Note || mongoose.model("Note",noteSchema)

