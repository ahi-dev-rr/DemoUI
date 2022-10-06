const getOtp = async () => {
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
        alert("OTP Generated Successfully");
        location.href = "ValidateOtp.html";
      } else {
        alert("Something went wrong please try again later!");
      }
    });
  return data;
};
