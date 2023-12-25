import { Post,Comment } from "../models/schema.js"

import bcrypt from "bcrypt"



export async function getAllPost(req, res) {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    try {
        const posts = await Post.find().populate({
            path: "author",
            select: "-password -refreshToken -createdAt"
        }).sort({ createdAt: -1 });
        const totalPost = posts.length
        return res.json({ posts })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function getPostById(req, res) {
    const {id}  = req.params
    try {
        const post = await Post.findById(id).populate({
            path:"author",
            select: "-password -refreshToken -createdAt"
        })
        const comments = await Comment.find({post:post._id})
        return res.json({ ...post._doc,comment:comments })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}


export async function getUserPost(req, res) {
  if(!req.user)return res.sendStatus(403)
    const {id}  = req.user
    
    try {
        const post = await Post.find({author:id})
        console.log(post)
        return res.json({ post })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}




export async function createPost(req, res) {
  if(!req.user)return res.sendStatus(403)
    const { title, content } = req.body
    try {
        const newPost = new Post({ author: req.user.id, title, content })
        const post = await newPost.save()
        return res.status(201).json({ post })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}


export async function updatePost(req, res) {
  if(!req.user)return res.sendStatus(403)
    const {title, content} = req.body
    const postId = req.params.id
    try {
        const newPost = await Post.findOneAndUpdate(
            {_id:postId},{
                title,
                content
            })
        return res.json({ message:"update successfully" })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function deletePost(req, res) {

  if(!req.user)return res.sendStatus(403)
    const postId = req.params.id


    try {
        const post = await Post.findByIdAndDelete(postId)
        console.log(postId,post)
        return res.json({message:"article deleted"})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}
export async function addComment(req, res) {
    const postId = req.params.id
    const {text} = req.body
    try {
        const comment = new Comment({text,post:postId})
        await comment.save()
        return res.json({message:"comment posted"})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}
