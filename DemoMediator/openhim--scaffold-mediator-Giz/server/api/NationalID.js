import axios from "axios";
 
export const sendOtp = (req) => {

  const requestBody = req.body;
  console.log("sendOtp requestBody : " +JSON.stringify( requestBody));

  var payee = [];
  var nationalID = requestBody.request.userId;
  var requesttime =requestBody.requesttime;

  const options = {
    method: 'GET',
    url: 'http://172.16.17.13:8089/auth/getOtp/'+nationalID,
   // url: 'http://192.168.186.219:9995/api/generateOTP/9453149265',
    headers: {'Content-Type': 'application/json'} 
  };
  console.log("disbursement requestBody : " +JSON.stringify( options));
  console.log("data requestBody : " +JSON.stringify( options.data));
  return new Promise((resolve, reject) => {
 
    axios.request(options).then(async (response) => {
       console.log("222222222222 ")
        console.log(JSON.parse(JSON.stringify(response.data)));

        var status = response.data.status
        var responseData = {};
        if(status=="success"){
            responseData = {
            "id": "mosip.authentication.sendotp",
            "ver": "1.0",
            "responsetime": requesttime,
            "response": {
              "status": "success",
              "message":"OTP had been sent successfully"
            }
          };
        }else {
            responseData = {
            "id": "mosip.authentication.sendotp",
            "ver": "1.0",
            "responsetime": requesttime,
            "errors":[
              error
            ]
          };
        }
        

      resolve(responseData);
    });
  }).then(function (res) {
    return res;
  }); 
};


export const validateOTP = (req) => {

  const requestBody = req.body;
  console.log("sendOtp requestBody : " +JSON.stringify( requestBody));

  var payee = [];
  var nationalID = requestBody.identification_value;
  var otp = requestBody.otp;
  var requesttime =requestBody.requesttime;

  const options = {
    method: 'POST',
    url: 'http://172.16.17.13:8089/auth/validateOTP', 
    headers: {'Content-Type': 'application/json'} 
  };
  options.data = {
    uin: nationalID,
    otp: otp,
  }
;
  console.log("disbursement requestBody : " +JSON.stringify( options));
  console.log("data requestBody : " +JSON.stringify( options.data));
  return new Promise((resolve, reject) => {
 
    axios.request(options).then(async (response) => {
       console.log("222222222222 ")
        console.log(JSON.parse(JSON.stringify(response.data)));

        var status = response.data.status
        var responseData = {};
        if(status=="success"){
            responseData = {
            "id": "mosip.authentication.sendotp",
            "ver": "1.0",
            "responsetime": requesttime,
            "response": {
              "status": "success",
              "message":"OTP had been sent successfully"
            }
          };
        }else {
            responseData = {
            "id": "mosip.authentication.sendotp",
            "ver": "1.0",
            "responsetime": requesttime,
            "errors":[
              error
            ]
          };
        }
        

      resolve(responseData);
    });
  }).then(function (res) {
    return res;
  }); 
 
   
};

 
export const sendOtpMediator = (req) => {

  let url = "http://172.16.17.13:5001/sendotp";

  var requestdata = req.body;
   
  let data = requestdata;

  let config_url = {
    method: "POST",
    url: url,
    data: data,
    headers: {
      Accept: "*/*" 
    },
  };

  return new Promise((resolve, reject) => {
    console.log("url " + url)
    axios(config_url).then(async (response) => {
      //   console.log("Asdasddsddd")
      console.log("asdsd : " + JSON.stringify(response.data));
      resolve(JSON.parse(JSON.stringify(response.data)));
    });
  }).then(function (res) {
    return res;
  }); 

};




export const ValidatedMediator = (req) => {

  let url = "http://172.16.17.13:5001/useridotp";

  var requestdata = req.body;
 
  let data = requestdata;

  let config_url = {
    method: "POST",
    url: url,
    data: data,
    headers: {
      Accept: "*/*" 
    },
  };

  return new Promise((resolve, reject) => {
    console.log("url " + url)
    axios(config_url).then(async (response) => {
       
      console.log("asdsd : " + JSON.stringify(response.data));
      resolve(JSON.parse(JSON.stringify(response.data)));
    });
  }).then(function (res) {
    return res;
  }); 

};