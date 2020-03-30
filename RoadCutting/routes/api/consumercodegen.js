const express = require('express');
const router = express.Router();
router.post('/',
(req,res)=>{
    const auth_token = req.body.auth_token;
    console.log(auth_token);
    bodyid ={
        "RequestInfo": {
            "apiId": "Mihy",
            "ver": ".01",
            "action": "",
            "did": "1",
            "key": "",
            "msgId": "20170310130900|en_IN",
            "requesterId": "",
            "authToken": auth_token,
        },
        "idRequests": [
            {
                "idName": "",
                "format": "RC/[CY:dd-MM-yyyy]/[seq_uc_demand_consumer_code]",
                "tenantId": "uk.haldwani"
            }
        ]
    };
      
      var request = require('request');
      var optionsid = {
        'method': 'POST',
        'url': 'https://uttarakhand-dev.egovernments.org/egov-idgen/id/_generate',
        'headers': {
        'authority': 'bihar-micro-dev.egovernments.org',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'accept': 'application/json, text/plain, */*',
        'sec-fetch-dest': 'empty',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://bihar-micro-dev.egovernments.org',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'referer': 'https://bihar-micro-dev.egovernments.org/employee/uc/newCollection',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cookie': '_ga=GA1.2.987832590.1579677766'
    },
    body: JSON.stringify(bodyid),
    
    };
     request(optionsid, function (error, response) { 
    if (error) throw new Error(error);
    obj = JSON.parse(response.body);
    res.status(200).json(obj);
   // consumerCode = obj.idResponses[0].id;
    });
})
module.exports = router;