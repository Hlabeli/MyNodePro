var express = require('express');
var router = express.Router();
var db = require('./db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* get method for fetch all users. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM users WHERE active=1";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(rows)
  })
});

/*get method for fetch single user*/
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM users WHERE id=${id}`;
  db.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(row[0])
  })
});

/*post method for create user*/
router.post('/create', function(req, res, next) {
  var name = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var cellphone = req.body.cellphone;

  var sql = `INSERT INTO users (name, lastname, email, cellphone, active, created_at) VALUES ("${name}", "${lastname}", "${email}", "${cellphone}", 1, NOW())`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success', id: result.insertId})
  })
});

/*put method for update user*/
router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var cellphone = req.body.cellphone;

  var sql = `UPDATE users SET name="${name}", lastname="${lastname}", email="${email}", cellephone="${cellphone}" WHERE id=${id}`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
});

/*delete method for delete user*/
router.delete('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM users WHERE id=${id}`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
})

module.exports = router;