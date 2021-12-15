const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        trim: true,
        maxlength: 300
    },
    idUser: {
        type: String,
        trim: true
    },
    idPost: {
        type: String,
        trim: true
    },
    date:{
        type: String,
        trim: true
    }
});
module.exports = mongoose.model("Comment", CommentSchema);