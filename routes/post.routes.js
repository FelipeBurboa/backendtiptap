const router = require("express").Router();
const userController = require("../controller/post.controller");



router.get('/', userController.getAllPosts);
router.get('/:id', userController.getPostById);
router.post('/', userController.createPost);
router.put('/:id',userController.updatePost);
router.delete('/:id', userController.deletePost);

module.exports = router;