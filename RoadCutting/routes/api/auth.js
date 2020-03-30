const express = require('express');
const router = express.Router();
const{check,validationResult} = require('express-validator');
var obj ;
router.get('/',async(req,res)=>{
  const request = require('request');
  const options = {
    'method': 'POST',
    'url': 'https://uttarakhand-dev.egovernments.org/egov-mdms-service/v1/_search?tenantId=uk',
    'headers': {
      'content-type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      "RequestInfo": {
      },
      "MdmsCriteria": {
          "tenantId": "uk",
          "moduleDetails": [{
                  "moduleName": "tenant",
                  "masterDetails": [
                      {
                          "name": "tenants"}]}]}})
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    obj = JSON.parse(response.body);
    res.status(200).json(obj);
  });
    
})
router.post('/',[
    check('user','User name should not be empty').not().isEmpty(),
    check('password','Password is required').not().isEmpty(),
    check('tenant_Id',"City is required").not().isEmpty(),
],
(req,res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {user,password,tenant_Id} = req.body;
   var request = require('request');
   var options = {
     'method': 'POST',
     'url': 'https://uttarakhand-dev.egovernments.org/user/oauth/token',
     'headers': {
      'authority': 'uttarakhand-dev.egovernments.org',
      'accept': 'application/json, text/plain, */*',
      'authorization': 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
      'content-type': 'application/x-www-form-urlencoded',
      'origin': 'https://uttarakhand-dev.egovernments.org',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'referer': 'https://uttarakhand-dev.egovernments.org/employee/user/login',
       'accept-encoding': 'utf8',
       'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
       'cookie': '_ga=GA1.2.1111212684.1580208445'
     },
     form: {
      'username': user,
      'password': password,
      'grant_type': 'password',
      'scope': 'read',
      'tenantId': tenant_Id,
      'userType': 'EMPLOYEE'
     }
   };
   request(options, function (error, response) { 
     if (error) throw new Error(error);
     var obj = JSON.parse(response.body)
     res.status(response.statusCode).json(obj)
   });
}
)
module.exports = router;