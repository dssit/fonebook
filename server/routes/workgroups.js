const express = require('express');
const db = require('../db/conn-pool');

const router = express.Router();
const pool = db.getPool();

router.get('/', (req, res) => {
  let workgroups = [];

  pool.query('SELECT * from workgroups', (err, rows) => {
    if (err) throw err;

    workgroups = rows;
    res.status(200).send(workgroups);
  });
});

router.post('/', (req, res) => {
  pool.query('insert into workgroups (name,created_at,updated_at) values (?,now(),now())', [req.body.name], (err, results) => {
    if (err) throw err;

    console.log('insert results are:');
    console.log(results);

    res.status(200).send();
  });
});

module.exports = router;