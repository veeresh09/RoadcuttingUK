const express = require('express');
const router = express.Router();
const Form = require('../../models/Forms');



router.get('/',async(req,res)=>{
    try {
      const form = await Form.find({road_ward_no : req.body.road_ward_no});
      res.status(200).send(form);
      console.log(req.body)
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  })