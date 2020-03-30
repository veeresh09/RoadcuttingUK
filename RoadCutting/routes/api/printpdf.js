const express = require('express');
const router = express.Router();
const Form = require('../../models/Forms');

router.post('/',async(req,res)=>{
  //console.log(req);
  const url = 'https://uttarakhand-dev.egovernments.org/filestore/v1/files/url?tenantId=uk&fileStoreIds='+req.body.id; 
try {
    var request = require('request');
var options = {
  'method': 'GET',
  'url': url,
  'headers': {
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  res.status(response.statusCode).send(response.body);
});

} catch (error) {
    res.status(500).send(error);
}
})
module.exports = router;