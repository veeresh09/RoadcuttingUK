const express = require('express');
const router = express.Router();
const Form = require('../../models/Forms');
const { check, validationResult } = require('express-validator');

router.post('/',async(req,res)=>{
    var request = require('request');
    const {consumcode,auth_token} = req.body;
    const xtl = "https://uttarakhand-dev.egovernments.org/billing-service/bill/v2/_fetchbill?tenantId=uk.dehradun&consumerCode="+consumcode;
    var reqbody = {
        "RequestInfo": {
            "apiId": "Rainmaker",
            "ver": ".01",
            "action": "",
            "did": "1",
            "key": "",
            "msgId": "20170310130900|en_IN",
            "requesterId": "",
            "authToken": auth_token,
        }
    };
var options = {
  'method': 'POST',
  'url': xtl,
  'headers': {
    'authority': 'uttarakhand-dev.egovernments.org',
    'accept': 'application/json, text/plain, */*',
    'sec-fetch-dest': 'empty',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36',
    'Content-Type': 'application/json',
    'origin': 'https://uttarakhand-dev.egovernments.org',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'referer': 'https://uttarakhand-dev.egovernments.org/employee/egov-common/pay?consumerCode=UK-TL-2019-12-17-000098&tenantId=uk.haridwar',
    'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
    'cookie': '_ga=GA1.2.1111212684.1580208445'
  },
 body:JSON.stringify(reqbody),
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  res.status(200).json(JSON.parse(response.body));
  //console.log(response.body);
});

})
module.exports = router;