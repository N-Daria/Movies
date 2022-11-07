const User = require('../models/user');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(res.user._id)
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      console.log(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const userID = req.user._id;

  User.findByIdAndUpdate(
    userID,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  ).onFail(() => {
    console.log(err);
    throw new Error('Запрашиваемый пользователь не найден');
  })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      console.log(err);
    });
};
