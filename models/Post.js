const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type: String,
        trim: true,
        maxlength: 45
    },
    content: {
        type: String,
        trim: true,
        maxlength: 350
    },
    date: {
        type: String,
        trim: true
    },
    idCategory: {
        type: String,
        trim: true
    },
    idUser: {
        type: String,
        trim: true
    }

});

module.exports = mongoose.model("Post", PostSchema);