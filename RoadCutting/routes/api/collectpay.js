const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
router.post("/", [], (req, res) => {
  const {
    auth_token,
    billId,
    totalAmountPaid,
    mobileNumber,
    payerName
  } = req.body;
  var request = require("request");
  const xyz = {
    RequestInfo: {
      apiId: "Rainmaker",
      ver: ".01",
      action: "_create",
      did: "1",
      key: "",
      msgId: "20170310130900|en_IN",
      requesterId: "",
      authToken: auth_token
    },
    Payment: {
      paymentDetails: [
        {
          businessService: "RC",
          billId: billId,
          totalDue: totalAmountPaid,
          totalAmountPaid: totalAmountPaid
        }
      ],
      tenantId: "uk.dehradun",
      totalDue: totalAmountPaid,
      paymentMode: "Cash",
      paidBy: "COMMON_OTHER",
      mobileNumber: mobileNumber,
      payerName: payerName,
      totalAmountPaid: totalAmountPaid
    }
  };
  var options = {
    method: "POST",
    url:
      "https://uttarakhand-uat.egovernments.org/collection-services/payments/_create",
    headers: {
      authority: "uttarakhand-dev.egovernments.org",
      accept: "application/json, text/plain, */*",
      "sec-fetch-dest": "empty",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
      "content-type": "application/json;charset=UTF-8",
      origin: "https://uttarakhand-uat.egovernments.org",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      referer:
        "https://uttarakhand-uat.egovernments.org/employee/egov-common/pay?consumerCode=UC/27-02-2020/000126&tenantId=uk.haldwani",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: "_ga=GA1.2.1111212684.1580208445"
    },
    body: JSON.stringify(xyz)
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    res.status(200).json(JSON.parse(response.body));
  });
});

module.exports = router;
