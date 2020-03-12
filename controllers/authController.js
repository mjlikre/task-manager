
const jwt     = require('jwt-simple');
const config  = require('../config');
const uuid = require("uuid")
const client = require('../models')
const bcrypt = require('bcryptjs');

const tokenForUser = function(id) {
  const timestamp = new Date().getTime();
  // Sub === subject
  // iat === issued at time

  // Its going to encode the whole 1st object and then add our secret to it
  return jwt.encode({ sub: id, iat: timestamp}, config.SECRET_KEY);
};


module.exports = {
  signUp: async (req, res) => {
    let { password, username } = req.body;
    if(!username || !password) {
      return res.status(422).json({ error: 'You must provide an username and password' });
    }
    try {
      // Check if theres existing user
      
      await client.Client.query(`SELECT * FROM AUTH WHERE EMAIL = ?`, [username], function (err, result) {
        if (err) throw err;
        else if(result.length > 0){ 
          return res.status(422).json({ error: 'Username is in user' });
        }
      })
      const salt = await bcrypt.genSalt();
      
      const hash = await bcrypt.hash(password, salt);
      
      password = hash;
      const id = uuid.v4()
      const query = "INSERT INTO AUTH SET ?"
      await client.Client.query(query, { ID: id, EMAIL: username, PASS: password}, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.json({ token: tokenForUser(id)});
      })

     
    } catch(e) {
      console.log(e, "Something went wrong, contact Michael Jiang")
      res.status(500).json({ e });
    }

  },
  signIn: async (req, res) => {
    console.log(req.user)
    res.send({ token: tokenForUser(req.user[0].ID), id: req.user[0].ID });

  }
};