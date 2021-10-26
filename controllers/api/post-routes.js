const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

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
    .then(dbPostData => {res.json(dbPostData)})
    .catch(err => res.json(err));
});

router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.session.content,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(dbPostData => res.status(500).json(dbPostData));
});

router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(dbPostData => res.status(500).json(dbPostData));
})

module.exports = router;