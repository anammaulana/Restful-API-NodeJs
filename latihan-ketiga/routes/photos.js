const express = require("express");
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

/**
 * INDEX POSTS
 */
router.get("/", function (req, res) {
  //query
  connection.query(
    "SELECT * FROM photos ORDER BY id desc",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data Photos",
          data: rows,
        });
      }
    }
  );
});

/**
 * STORE POST
 */
 router.post('/store', [

    //validation
    body('nama_folder').notEmpty(),
    body('total').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        nama_folder: req.body.nama_folder,
        total: req.body.total
    }

    // insert query
    connection.query('INSERT INTO photos SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

module.exports = router;
