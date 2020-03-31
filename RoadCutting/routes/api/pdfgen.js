const express = require("express");
const router = express.Router();
const Form = require("../../models/Forms");

router.post("/", async (req, res) => {
  //console.log(req.body);
  try {
    var request = require("request");
    var options = {
      method: "POST",
      url:
        "https://uttarakhand-uat.egovernments.org/pdf-service/v1/_create?key=misc-receipt&tenantId=uk",
      headers: {
        authority: "uttarakhand-dev.egovernments.org",
        accept: "application/json",
        "sec-fetch-dest": "empty",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
        "content-type": "application/json;charset=UTF-8",
        origin: "https://uttarakhand-uat.egovernments.org",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        referer: "https://uttarakhand-uat.egovernments.org/employee/uc/search",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        cookie: "_ga=GA1.2.1111212684.1580208445"
      },
      body: JSON.stringify(req.body)
    };
    request(options, function(error, response) {
      if (error) throw new Error(error);
      var obj = JSON.parse(response.body);
      res.status(response.statusCode).json(obj);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
