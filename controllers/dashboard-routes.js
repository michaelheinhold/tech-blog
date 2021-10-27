const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', withAuth, (req, res) => {
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
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      //serialize data
      const posts = dbPostData.map(post=> post.get({ plain: true }));
      res.render('dashboard', {posts, loggedIn: req.session.loggedIn, account:req.session.user_id });
    })
    .catch(err => res.status(500).json(err));
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', {post, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;