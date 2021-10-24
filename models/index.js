const Post = require('./Post');
const User = require('./User');

//set up relationships
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = {
  Post,
  User,
}