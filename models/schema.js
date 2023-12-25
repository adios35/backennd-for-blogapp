import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        maxlength: 1024,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // This references the 'Author' model
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
}, { timestamps: true });


// Comment Schema
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String, // For anonymous users
        default: 'Anonymous'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const User = mongoose.model('User', userSchema);

export { User, Post,Comment };