const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
      'user_id'
    ],
    include: {
      model: User,
      attributes: ['username']
    }
  })
    .then(dbPostData => {
      //serialize data
      const posts = dbPostData.map(post=> post.get({ plain: true }));
      res.render('dashboard', {posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;