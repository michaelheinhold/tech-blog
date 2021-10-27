const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

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
    include: {
      model: User,
      attributes: ['username']
    },
  })
    .then(dbPostData => {res.json(dbPostData)})
    .catch(err => res.json(err));
});

router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', withAuth, (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(dbPostData => res.status(500).json(dbPostData));
});

router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(dbPostData => res.status(500).json(dbPostData));
})

module.exports = router;