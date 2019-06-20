var mysql = require('mysql');

var connection = mysql.createConnection({
  // host: 'sql27.cpt3.host-h.net',
  // user: 'londojmutt_2',
  // password: 'WGXx7cpZyhQUv4NRsaJ8',
  // database: 'londojmutt_db2'
  host: 'sql27.cpt3.host-h.net',
  user: 'londojmutt_2',
  password: 'WGXx7cpZyhQUv4NRsaJ8',
  database: 'londojmutt_db2'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected');
});

module.exports = connection;
