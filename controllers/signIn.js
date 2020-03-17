const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrent form submission');
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .then(user => {
            res.json(user[0]);
          })
          .catch(error => res.status(400).json('unable to get user data'));
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch(error => res.status(400).json('wrong credentials'));
};

module.exports = {
  handleSignIn: handleSignIn
};