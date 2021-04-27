const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth,postCtrl.createPost)
    .get(auth,postCtrl.getPosts)

router.route('/post/:id').patch(auth,postCtrl.updatePost)

router.route('/post/:id/like').patch(auth,postCtrl.likePost)
router.route('/post/:id/unlike').patch(auth,postCtrl.unLikePost)

router.route('/user_posts/:id').get(auth,postCtrl.getUserPosts)


module.exports = router