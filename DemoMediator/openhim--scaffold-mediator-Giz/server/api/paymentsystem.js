import axios from "axios";
 
export const validateBankDetails = (req) => {

  const requestBody = req.body;
  console.log("validateBankDetailsrequestBody : " + requestBody);
  var disbursementId = requestBody.disbursementId;
  const options = {
      method: 'POST',
      url: 'http://ec2-13-126-75-156.ap-south-1.compute.amazonaws.com:3001/disbursementCheck',
      headers: {'Content-Type': 'application/json'},
      data: {
        disbursementId: disbursementId,
        note: 'PENSION',
        payeeList: [
          {
            payeeIdType: requestBody.idtype,
            payeeIdValue: requestBody.idvalue,
            amount: 1,
            currency: 'INR'
          }
        ]
      }
    };

    return new Promise((resolve, reject) => {
    
      axios.request(options).then(async (response) => {
         console.log("Asdasddsddd")
          console.log(JSON.parse(JSON.stringify(response.data)));
        resolve(JSON.parse(JSON.stringify(response.data)));
      });
    }).then(function (res) {
      return res;
    });
   
};


export const disbursement = (req) => {

    const requestBody = req.body;
    console.log("disbursement requestBody : " +JSON.stringify( requestBody));

    var payee = [];
    var disbursementId = requestBody.disbursementId;

    for(var i=0; i<requestBody.payee.length;i++){
      var payeeobject = {
              payeeIdType: requestBody.payee[i].idtype,
              payeeIdValue: requestBody.payee[i].idvalue,
              amount: requestBody.payee[i].amount,
              currency: requestBody.payee[i].currency
      }
      payee.push(payeeobject);
    }

    const options = {
      method: 'POST',
      url: 'http://ec2-13-126-75-156.ap-south-1.compute.amazonaws.com:3001/disbursement',
      headers: {'Content-Type': 'application/json'},
      data: {
        disbursementId: disbursementId,
        note: 'PENSION',
        payeeList: payee
      }
    };
    console.log("disbursement requestBody : " +JSON.stringify( options));
    console.log("data requestBody : " +JSON.stringify( options.data));
    return new Promise((resolve, reject) => {
   
      axios.request(options).then(async (response) => {
         console.log("222222222222 ")
          console.log(JSON.parse(JSON.stringify(response.data)));
        resolve(JSON.parse(JSON.stringify(response.data)));
      });
    }).then(function (res) {
      return res;
    });
   
};
