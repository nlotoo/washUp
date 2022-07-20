const { Router } = require("express");
router = Router()

const authService = require('../services/authServices.js')
const isAuth = require('../midlleware/isAuth.js')
const auth = require('../midlleware/auth.js')
router.post("/register", async(req, res) => {
    try {
        let data = await authService.createUser(req.body)
        res.status(200).json(data);

    } catch (err) {
        res.status(402).json({ message: err })
    }
});
router.post('/login', async(req, res) => {

    try {
        let data = await authService.loginUser(req.body)
        res.status(200).json(data)

    } catch (err) {
        res.status(401).json({ message: err })
    }
})
router.post('/add-item', isAuth, async(req, res) => {

    try {
        let data = await authService.addNewItem(req.body)
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json({ message: err })
    }



})
router.get('/catalog', async(req, res) => {




    try {
        let data = await authService.getAll()
        res.status(200).json(data)
    } catch {
        res.status(401).json({ message: err })
    }




})
router.get('/item/:id', async(req, res) => {


    try {
        let id = req.params.id
        let data = await authService.getOneById(id)
        res.status(200).json(data)
    } catch (err) {

        res.status(401).json({ message: err })
    }
})
router.get('/delete/:id', isAuth, async(req, res) => {

    try {
        let id = req.params.id
        let data = authService.delteItemById(id)
        res.status(200).json(data)

    } catch (err) {
        res.status(401).json({ message: err })

    }
})
router.post('/update-item', isAuth, async(req, res) => {

    try {
        let data = await authService.updateOneItem(req.body.itemId, req.body.updatedObject)
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json({ message: err })
    }


})
router.post('/post/comment', async(req, res) => {
    try {
        let data = await authService.createComment(req.body.content, req.body.userId, req.body.itemId, req.body.email)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})
router.get('/load/comment/:id', async(req, res) => {
    try {
        let id = req.params.id
        let data = await authService.loadItemComment(id)

        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})
router.get('/edit-comment-page/:id', async(req, res) => {

    try {
        let id = req.params.id

        let data = await authService.loadCommentData(id)
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json({ message: err })
    }

})
router.post('/edit-comment-page/:id', async(req, res) => {


    try {
        let data = await authService.editComment(req.body)
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json({ message: err })
    }

})
router.delete('/edit-comment-page/:id', async(req, res) => {

    try {
        let data = authService.deleteComment(req.params.id)

        res.status(200).json(data)
    } catch (err) {
        res.status(401).json({ message: err })
    }
})

router.post('/liked/:id', async(req, res) => {
    try {
        let data = await authService.liked(req.body)
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json({ message: err })
    }

})

router.post('/dislike/:id', async(req, res) => {
    try {
        let data = await authService.dislike(req.body)
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json({ message: err })
    }

})

module.exports = router