let digitValidate = function (ele) {
  console.log(ele.value);
  ele.value = ele.value.replace(/[^0-9]/g, "");
};

let tabChange = function (val) {
  let ele = document.querySelectorAll("input");
  if (ele[val - 1].value != "") {
    ele[val].focus();
  } else if (ele[val - 1].value == "") {
    ele[val - 2].focus();
  }
};

/* const validateOtp = async () => {
  const opt1 = document.getElementById("opt1").value;
  const opt2 = document.getElementById("opt2").value;
  const opt3 = document.getElementById("opt3").value;
  const opt4 = document.getElementById("opt4").value;
  const opt5 = document.getElementById("opt5").value;
  const opt6 = document.getElementById("opt6").value;

  const ki = opt1 + opt2 + opt3 + opt4 + opt5 + opt6;

  const otp_val = localStorage.getItem("otp");

  const data = {
    uin: localStorage.getItem("uin"),
    otp: ki,
  };

  console.log("type", data);

  const body = {
    headers: { "content-type": "application/json; charset=UTF-8" },
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
  };

  
    const result = await fetch(`http://13.59.128.159:8089/auth/validateOTP`, body)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          alert("OTP Validated Successfully");
          location.href = "DemoViaMediator.html";
        } else {
          alert("Please Enter Valid OTP");
        }
      });
    return result;
  
};

http://13.59.128.159:3005/useridotp
*/


const validateOtp = async () => {

  const date = new Date();
  const dateString = date.toISOString();

  const opt1 = document.getElementById("opt1").value;
  const opt2 = document.getElementById("opt2").value;
  const opt3 = document.getElementById("opt3").value;
  const opt4 = document.getElementById("opt4").value;
  const opt5 = document.getElementById("opt5").value;
  const opt6 = document.getElementById("opt6").value;

  const ki = opt1 + opt2 + opt3 + opt4 + opt5 + opt6;

  const otp_val = localStorage.getItem("otp");

  const data = {
    "identification_type" : "NATIONAL_ID",
    "identification_value" : localStorage.getItem("uin") ,
    "otp" : ki,
    "transaction_id" : uuidv4(),
    "requesttime": dateString, 
  }; 

  var options = [];
  options.data = JSON.stringify(data );
 
  options.url = "http://13.59.128.159:3005/useridOTPMediator";

  options.type= "POST",
  options.contentType="application/json",
  options.dataType= "json",
  options.headers = {
       "content-type": "application/json" 
      
    }
    
  $.ajax( options )
   .done( function( ajaxResponse ) {
    var data = ajaxResponse.response;
     
    if (data.status == "success") {
      alert("OTP Validated Successfully");
      location.href = "DemoViaMediator.html";
    } else {
      alert("Please Enter Valid OTP");
    }
    });

    
};

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
