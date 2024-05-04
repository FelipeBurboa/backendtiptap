const { Post } = require("../models/index");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

exports.getAllPosts = async (req, res) => {
    try{
        const posts = await Post.findAll(
            {
                order: [['createdAt', 'DESC']]
            }
        );

        if(posts.length === 0) return res.status(404).json({ message: 'Posts not found' })

        res.json(posts)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getPostById = async (req, res) => {
   try{
    const { id } = req.params
    const post = await Post.findOne({ where: { id: id } })
    if(!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
   } catch(error) {
    res.status(500).json({ message: error.message })
   }
}

exports.createPost = async (req, res) => {
    const { content } = req.body
    try {

        if(!content) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newId = uuidv4();

        const newPost = await Post.create({
            id: newId,
            content: content,
        })
        res.status(201).json(newPost)
        
    }
    catch(error) {
        res.status(500).json({ message: error.message })
    }
 
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params
        
        const [updated] = await Post.update(req.body, { where: { id: id } })
        if(updated) res.json({ message: 'Post updated successfully' })
        else res.status(404).json({ message: 'Post not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deletePost = async (req, res) => {
 try {
    const { id } = req.params
    const post = await Post.findOne({ where: { id: id } })
    if(!post) return res.status(404).json({ message: 'Post not found' })
    await post.destroy()
    res.json({ message: 'Post deleted successfully' })
 } catch (error) {
    res.status(500).json({ message: error.message })
 }
}
