const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('homePage', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}



exports.form = (req, res) => {
  res.render('addCustomer');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
    if (!err) {
      res.render('addCustomer', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('editCustomer', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('editCustomer', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {
  connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('viewCustomer', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}