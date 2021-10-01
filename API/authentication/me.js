const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  if (req.session && req.session.user) {
    // eslint-disable-next-line no-unused-vars
    queryPromise(`SELECT * FROM users WHERE user_id="${req.session.user.id}"`).then(({ err, rows }) => {
      if (rows.length > 0) {
        const user = rows[0];
        res.json({
          user: {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email,
            type: user.user_type,
            city: user.user_city,
            birthday: user.user_birthday,
            gender: user.user_gender,
            description: user.user_description,
            avatar: user.user_avatar,
            register: user.user_register,
          },
        });
      } else {
        res.json({ user: null });
      }
    });
  } else {
    res.json({ user: null });
  }
};
