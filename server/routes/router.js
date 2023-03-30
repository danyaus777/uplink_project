const express = require('express')
const router = express.Router()
const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()})
const {validateRegister, isLoggedIn, isAdmin} = require("../middleware/users")
const UsersController = require('./../controllers/UsersController')
const PostController = require('./../controllers/PostsController')

// http::localhost:3000/sign-up
router.post('/sign-up', validateRegister, UsersController.signup)

// http::localhost:3000/login
router.post('/login', UsersController.login)

// http::localhost:3000/users
router.get('/users', isLoggedIn, isAdmin, UsersController.users)

// http::localhost:3000/user/:id
router.get('/user/:id', isLoggedIn, isAdmin, UsersController.user)

// http::localhost:3000/deleteuser/:id
router.delete('/deleteuser/:id', isAdmin, UsersController.delete)

// http::localhost:3000/updateuser/:id
router.post('/updateuser/:id', UsersController.update)

// http::localhost:3000/addpost
router.post('/addpost', isLoggedIn, PostController.postadd)

// http::localhost:3000/deletepost/:id
router.delete('/deletepost/:id', isLoggedIn, isAdmin, PostController.deletepost)

// http::localhost:3000/moderationposts
router.get('/moderationposts', isLoggedIn, isAdmin, PostController.moderposts)

// http::localhost:3000/posts
router.get('/posts', isLoggedIn, PostController.posts)

// http::localhost:3000/post/:id
router.get('/post/:id', isLoggedIn, PostController.post)

// http::localhost:3000/acceptpost/:id
router.post('/acceptpost/:id', isLoggedIn, isAdmin, PostController.moder_good)

//http::localhost:3000/declinepost/:id
router.post('/declinepost/:id', isLoggedIn, isAdmin, PostController.moder_bad)

module.exports = router

// router.post('/uploadimg', upload.single('ImageTest'), (req, res, next) => {
//     image = req.file.buffer.toString('base64')
//     db.query(`INSERT INTO imgtest (img) VALUES ('${image}')`, (err, result) =>{
//         if(err) throw err
//         return res.status(200).send({
//             message: 'Фото отправлено'
//         })
//     })
//     console.log(image)
// })