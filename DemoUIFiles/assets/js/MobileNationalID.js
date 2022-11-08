var getUrlParameter = function getUrlParameter(sParam) {
  
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};
$( function () {
  
    //  var t = getUrlParameter('t');
    //   if(t!=null && t=="d"){
    //    getOtpDirect();
    //   }
    var t = getUrlParameter('t');
       if(t!=null && t=="mock"){
        setInterval(function() {
          var otpGenerated = localStorage.getItem("otpGeneratedMock");
        
          if(otpGenerated!=null && otpGenerated!="" && otpGenerated!=undefined && otpGenerated=="true"){
            localStorage.setItem("otpGeneratedMock", false);
            getOtpDirect();
          }
         
          }, 1000);
       }else{
        setInterval(function() {
          var otpGenerated = localStorage.getItem("otpGenerated");
        
          if(otpGenerated!=null && otpGenerated!="" && otpGenerated!=undefined && otpGenerated=="true"){
            $("#nationalid").hide();
            $("#smsShow").show();
            $('#smsShow').fadeIn("slow", function () {});
            $("#message_id").html("Dear User,<br>OTP for "+localStorage.getItem("uin")+" National ID is 111111.")
        
            
            localStorage.setItem("otpGenerated", false);
            //getOtpDirect();
          }
         
          }, 1000);
       }

 

});


const getOtp = async () => {
  const nid =$("#nid").val();
 
  var options = [];
  options.data = JSON.stringify( 
  { 
      "request": {
        "appId": "ida", 
        "templateVariables":{"UIN": nid},
        "userId":  nid,
        "useridtype": "UIN"
      },
      "requesttime": "2019-04-29T07:01:24.692Z",
      "version": "string" 
  });
 
  options.url = "http://13.59.128.159:5555/v1/authmanager/authenticate/getOtpss";
  options.type= "POST",
  options.contentType="application/json",
  options.dataType= "json",
  options.headers = {
       "content-type": "application/json" 
      
    }
    
  $.ajax( options )
   .done( function( ajaxResponse ) {
      if( ajaxResponse.request !=null && ajaxResponse.request !=undefined && ajaxResponse.request.otp!=null && ajaxResponse.request.otp!=undefined) {
        $("#nationalid").hide();
        $("#smsShow").show();
        $('#smsShow').fadeIn("slow", function () {});
        $("#message_id").html("Dear User,<br>OTP for "+ajaxResponse.request.userId+" National ID is "+ajaxResponse.request.otp+".")
      }else{
        $("#nationalid").show();
        $("#smsShow").hide();
         $("#message_id").text("")
     
      }
    });

    
};



const getOtpDirect = async () => {
 
 
  var options = [];
 
  options.data = JSON.stringify( 
    { 
        "request": {
          "appId": "ida", 
          "templateVariables":{"UIN": ""},
          "userId":  "",
          "useridtype": "UIN"
        },
        "requesttime": "2019-04-29T07:01:24.692Z",
        "version": "string" 
    });
 
  options.url = "http://13.59.128.159:5555/v1/authmanager/authenticate/getOtpsDirect";
  options.type= "POST",
  options.contentType="application/json",
  options.dataType= "json",
  options.headers = {
       "content-type": "application/json" 
      
    }
    
  $.ajax( options )
   .done( function( ajaxResponse ) {
      if( ajaxResponse.request !=null && ajaxResponse.request !=undefined && ajaxResponse.request.otp!=null && ajaxResponse.request.otp!=undefined) {
       // $("#nationalid").hide();
      // $('#smsShow').css('display', 'block').fadeIn("slow", function () {});

       $("#smsShow").fadeIn(2000);

        $("#message_id").html("Dear User,<br>OTP for "+ajaxResponse.request.userId+" National ID is "+ajaxResponse.request.otp+".")
      }else{
       // $("#nationalid").show();
        $("#smsShow").hide();
         $("#message_id").text("")
     
      }
    });

    
};