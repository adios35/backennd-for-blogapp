import Express from "express";
import { getAllPost,createPost,getPostById,getUserPost,deletePost,updatePost,addComment } from "../controller/post.js";
import { verifyToken } from "../middleware/verifiyToken.js";
const router = Express()
router.get("/", getAllPost)
router.delete("/delete/:id",verifyToken, deletePost)
router.get("/posts",verifyToken, getUserPost)
router.get("/:id",getPostById )
router.post("/create",verifyToken, createPost)
router.patch("/update/:id",verifyToken, updatePost)
router.post("/comment/:id", addComment)



export default router