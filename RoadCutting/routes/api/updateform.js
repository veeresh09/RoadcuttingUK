const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const Form = require('../../models/Forms');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.post(
    '/',
    [
      check('userid','Userid is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('mobile', 'Please include a valid mobile number').isLength({min:10}),
      check('fatherName','Father Name is required').not().isEmpty(),
      check('applicantType','Applicant type is required').not().isEmpty(),
      check('district','District is required').not().isEmpty(),
      check('areaType','area Type is required').not().isEmpty(),
      check('address1','Adress is required').not().isEmpty(),
      check('pincode','pincode is required').not().isEmpty(),
      check('road_urban_local_body_name','road_urban_local_body_nameroad_totalcost is required').not().isEmpty(),
      check('road_ward_no','road_ward_no is required').not().isEmpty(),
      check('road_locality','road locality is required').not().isEmpty(),
      check('road_cuttingReason','road_cuttingReason is required').not().isEmpty(),
      check('road_category','road cateory is required').not().isEmpty(),
      check('road_totalcost','road_totalcostroad_ward_no is required').not().isEmpty(),
      //check('auth_token','auth_token is required').not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {userid,name,fatherName,mobile,email,applicantType,district,areaType,address1,address2,pincode,road_urban_local_body_name,road_ward_no,road_locality,road_cuttingReason,road_category,road_totalcost,consumerCode} = req.body;
      const formFields = {name,fatherName,mobile,email,applicantType,district,areaType,address1,address2,pincode,road_urban_local_body_name,road_ward_no,road_locality,road_cuttingReason,road_category,road_totalcost,consumerCode};

      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Form.findOneAndUpdate(
          { _id: userid },
          { $set: formFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
      }
    })
    module.exports = router;