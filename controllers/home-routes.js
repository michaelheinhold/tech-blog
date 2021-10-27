const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

//homepage
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'user_id',
      'created_at',
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'text', 'user_id', 'post_id', 'created_at'],
        order: [['created_at', 'DESC']],
        include: {
          model: User,
          attributes: ['username']
        },
      }
    ]
  })
    .then(dbPostData => {
      //serialize data
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.json(err));
});

//individual post
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
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'text', 'user_id', 'post_id', 'created_at'],
        order: [['created_at', 'DESC']],
        include: {
          model: User,
          attributes: ['username'],
        },
      }
    ]
  })
    .then(dbPostData => {
      //serialize data
      const post = dbPostData.get({ plain: true });
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err));
});

//login page
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/create-post', withAuth, (req, res) => {
  res.render('create-post', { loggedIn: req.session.loggedIn })
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
})

module.exports = router;