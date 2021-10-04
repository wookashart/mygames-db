const { queryPromise } = require('../utils');
const passwordHash = require('password-hash');

module.exports = (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  let userData = {};

  queryPromise(`
    SELECT *
    FROM users
    WHERE user_name = "${name}"
  `)
  .then(({ err, rows }) => {
    if (rows.find(row => row.user_name === name && passwordHash.verify(password, row.user_password))) {
      const row = rows.find(row => row.user_name === name && passwordHash.verify(password, row.user_password));

      userData = {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email,
        type: row.user_type,
        city: row.user_city,
        birthday: row.user_birthday,
        gender: row.user_gender,
        description: row.user_description,
        avatar: row.user_avatar,
        register: row.user_register,
      };
      req.session.user = userData;
      req.session.logged = true;
    } else {
      userData = null;
    }

    res.json({
      user: userData,
      error: err,
    });
  });
};
