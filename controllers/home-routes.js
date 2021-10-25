const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'user_id',
      'created_at',
    ],
    include: {
      model: User,
      attributes: ['username']
    }
  })
    .then(dbPostData => {
      //serialize data
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.json(err));
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content',
      'user_id',
      'created_at',
    ],
    include: {
      model: User,
      attributes: ['username']
    }
  })
    .then(dbPostData => {
      //serialize data
      const post = dbPostData.get({ plain: true });
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err));
})

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;