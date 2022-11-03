/* const getOtp = async () => {
  const nid = document.getElementById("nid").value;

  const body = {
    headers: { "content-type": "application/json; charset=UTF-8" },
    method: "GET",
    mode: "cors",
  };

  const data = await fetch(`http://13.59.128.159:8089/auth/getOtp/${nid}`, body)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        localStorage.setItem("uin", data.data.uin);
        localStorage.setItem("otp", data.data.otp);
        localStorage.setItem("otpGenerated", "true");
        alert("OTP Generated Successfully");
        location.href = "ValidateOtp.html";
      } else {
        alert("Something went wrong please try again later!");
      }
    });
  return data;
};

*/

const getOtp = async () => {
  const nid =$("#nid").val();
  const date = new Date();
  const dateString = date.toISOString();
  var options = [];
  options.data = JSON.stringify( {
            "id": uuidv4(),
            "metadata": {},
            "request": {
              "appId": "ida",
              "otpChannel": [
                "email","mobile"
              ],
              "context":"auth-otp",
              "templateVariables":{"UIN": nid},
              "userId": nid,
              "useridtype": "UIN"
            },
            "requesttime": dateString,
            "version": "1.1.5"
   } );
 
  options.url = "http://13.59.128.159:3005/sendotp_Mediator";
//  options.url = "http://13.59.128.159:5001/v1/authmanager/authenticate/sendotp";
  options.type= "POST",
  options.contentType="application/json",
  options.dataType= "json",
  options.headers = {
       "content-type": "application/json" 
      
    }
    
  $.ajax( options )
   .done( function( ajaxResponse ) {
    var data = ajaxResponse.data.response;
    if (data.status == "success") {
      localStorage.setItem("uin", nid); 
      localStorage.setItem("otpGenerated", "true");
      alert("OTP Generated Successfully");
      location.href = "ValidateOtp.html";
    } else {
      alert("Something went wrong please try again later!");
    }
    });

    
};

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

