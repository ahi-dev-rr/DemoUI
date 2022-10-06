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

const validateOtp = async () => {
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
