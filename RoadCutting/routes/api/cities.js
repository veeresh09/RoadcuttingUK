const express = require('express');
const router = express.Router();
var obj ;

router.post('/',
async (req,res) =>{
    var request = require('request');
    var authtoken = req.body.auth_token;
    var requ = {

      "RequestInfo": {
          "apiId": "Rainmaker",
          "ver": ".01",
          "action": "_search",
          "did": "1",
          "key": "",
          "msgId": "20170310130900|en_IN",
          "requesterId": "",
          "authToken": authtoken
      }
  
  }
var options = {
  'method': 'POST',
  'url': 'https://uttarakhand-dev.egovernments.org/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality&tenantId=uk.dehradun',
  'headers': {
    'authority': 'uttarakhand-dev.egovernments.org',
    'accept': 'application/json, text/plain, */*',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'content-type': 'application/json;charset=UTF-8',
    'origin': 'https://uttarakhand-dev.egovernments.org',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'referer': 'https://uttarakhand-dev.egovernments.org/employee/tradelicence/apply?tenantId=uk.haridwar',
    'accept-encoding': 'utf8',
    'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
    'cookie': '_ga=GA1.2.1111212684.1580208445'
  },
  body: JSON.stringify(requ)

};
request(options, function (error, response) { 
  if (error) return res.status(400).send(error);
  obj = JSON.parse(response.body)
  var l = obj.TenantBoundary[0].boundary.length;
  var wnam = {};
  var wnam2 = {};
  var locals = [];
  var ward =[];
  for(let i=0;i<l;i++){
     var temp = (obj.TenantBoundary[0].boundary[i].name).split('-')
     locals[temp[1].match(/\d+/g)] = temp[1];
     if(wnam[temp[1]] == undefined){
        wnam[temp[1]] = []
        ward[temp[1].match(/\d+/g)] = []
        wnam[temp[1]].push(temp[0])
        ward[temp[1].match(/\d+/g)].push('Select Locality');
        ward[temp[1].match(/\d+/g)].push(temp[0]);
     }
     else{ wnam[temp[1]].push(temp[0]);ward[temp[1].match(/\d+/g)].push(temp[0]);}
  }
  wnam.wardnumbers = locals;
  wnam.localarray = ward;
  res.status(200).json(wnam)
  //console.log(ward);
});
}
)
module.exports = router;