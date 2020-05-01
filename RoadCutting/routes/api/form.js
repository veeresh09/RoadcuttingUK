const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const now = new Date();
const secondsSinceEpoch = now.getTime() + 7800;
const Form = require("../../models/Forms");
var auth_tokenid;
var consumerCode;

router.get("/", async (req, res) => {
  try {
    const form = await Form.find({ road_ward_no: req.query.road_ward_no });
    console.log(req.query);
    res.status(200).send(form);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("mobile", "Please include a valid mobile number").isLength({
      min: 10
    }),
    check("fatherName", "Father Name is required")
      .not()
      .isEmpty(),
    check("applicantType", "Applicant type is required")
      .not()
      .isEmpty(),
    check("district", "District is required")
      .not()
      .isEmpty(),
    check("areaType", "area Type is required")
      .not()
      .isEmpty(),
    check("address1", "Adress is required")
      .not()
      .isEmpty(),
    check("pincode", "pincode is required")
      .not()
      .isEmpty(),
    check(
      "road_urban_local_body_name",
      "road_urban_local_body_nameroad_totalcost is required"
    )
      .not()
      .isEmpty(),
    check("road_ward_no", "road_ward_no is required")
      .not()
      .isEmpty(),
    check("road_locality", "road locality is required")
      .not()
      .isEmpty(),
    check("road_cuttingReason", "road_cuttingReason is required")
      .not()
      .isEmpty(),
    check("road_category", "road cateory is required")
      .not()
      .isEmpty(),
    check("road_totalcost", "Invalid road_totalcostroad_ward_no").isNumeric(),
    check("auth_token", "auth_token is required")
      .not()
      .isEmpty(),
    check("consumerCode", "auth_token is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      fatherName,
      mobile,
      email,
      applicantType,
      district,
      areaType,
      address1,
      address2,
      pincode,
      road_urban_local_body_name,
      road_ward_no,
      road_locality,
      road_cuttingReason,
      road_category,
      road_totalcost,
      auth_token,
      consumerCode
    } = req.body;

    console.log(consumerCode);
    try {
      form = new Form({
        name,
        fatherName,
        mobile,
        email,
        applicantType,
        district,
        areaType,
        address1,
        address2,
        pincode,
        road_urban_local_body_name,
        road_ward_no,
        road_locality,
        road_cuttingReason,
        road_category,
        road_totalcost,
        consumerCode
      });
      await form.save();
      var request = require("request");
      var requ = {
        RequestInfo: {
          apiId: "Rainmaker",
          ver: ".01",
          ts: "",
          action: "_search",
          did: "1",
          key: "",
          msgId: "20170310130900|en_IN",
          authToken: auth_token,
          userInfo: {
            userName: "CounterEmployee",
            salutation: null,
            name: name,
            gender: "FEMALE",
            mobileNumber: mobile,
            emailId: email,
            altContactNumber: null,
            pan: null,
            aadhaarNumber: null,
            permanentAddress: address1,
            permanentCity: district,
            permanentPinCode: pincode,
            correspondenceAddress: "Bangalore",
            correspondenceCity: null,
            correspondencePinCode: null,
            addresses: [
              {
                pinCode: pincode,
                city: null,
                address: "Bangaore",
                type: "CORRESPONDENCE",
                id: 447,
                tenantId: "uk.dehradun",
                userId: 224,
                addressType: "CORRESPONDENCE",
                lastModifiedDate: null,
                lastModifiedBy: null
              }
            ],
            active: true,
            locale: null,
            type: "EMPLOYEE",
            accountLocked: false,
            accountLockedDate: 0,
            fatherOrHusbandName: fatherName,
            signature: null,
            bloodGroup: null,
            photo: null,
            identificationMark: null,
            createdBy: 4,
            lastModifiedBy: 1,
            tenantId: "uk.dehradun",
            roles: [
              {
                code: "TL_CEMP",
                name: "TL Counter Employee",
                tenantId: "uk.dehradun"
              },
              {
                code: "PTCEMP",
                name: "PT Counter Employee",
                tenantId: "uk.dehradun"
              }
            ],
            uuid: "3fc7f632-ff90-4eea-92bc-641fb9a809f1",
            createdDate: "13-12-2019 16:32:08",
            lastModifiedDate: "16-12-2019 16:21:57",
            dob: "1/12/2019",
            pwdExpiryDate: "12-03-2020 16:32:08"
          }
        },
        Demands: [
          {
            tenantId: "uk.dehradun",
            consumerCode: consumerCode,
            mobileNumber: mobile,
            consumerName: name,
            serviceType: "RC.road_cutting",
            businessService: "RC.road_cutting",
            demandDetails: [
              {
                taxHeadMasterCode: "RC_TAX",
                collectionAmount: 0,
                taxAmount: road_totalcost
              }
            ],
            taxPeriodFrom: secondsSinceEpoch - 5000,
            taxPeriodTo: secondsSinceEpoch,
            additionalDetails: {
              comment: "Road Cutting Charges"
            },
            payer: {
              uuid: ""
            },
            consumerType: "RC.road_cutting"
          }
        ]
      };
      var options = {
        method: "POST",
        url:
          "https://uttarakhand-uat.egovernments.org/billing-service/demand/_create",
        headers: {
          authority: "bihar-uat.egovernments.org",
          pragma: "no-cache",
          "cache-control": "no-cache",
          accept: "application/json, text/plain, */*",
          "sec-fetch-dest": "empty",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36",
          "content-type": "application/json;charset=UTF-8",
          origin: "https://bihar-uat.egovernments.org",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          referer:
            "https://bihar-uat.egovernments.org/employee/uc/newCollection",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          cookie: "_ga=GA1.2.987832590.1579677766"
        },
        body: JSON.stringify(requ)
      };
      await request(options, function (error, response) {
        if (error) throw new Error(error);
        //console.log(response.body);
        res.status(response.statusCode).json(JSON.parse(response.body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
