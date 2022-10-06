function gShowPageLoader( callback ) {
	$('#gPageLoader').removeClass('d-none');
	if( callback ){
		setTimeout( callback, 100 );
	}
}
function gShowPageLoader1( callback, args1 ) {
	$('#gPageLoader').removeClass('d-none');
	setTimeout( callback, 100, args1 );
}
function gShowPageLoader2( callback, args1, args2 ) {
	$('#gPageLoader').removeClass('d-none');
	setTimeout( callback, 100, args1, args2 );
}
function gShowPageLoader3( callback, args1, args2, args3 ) {
	$('#gPageLoader').removeClass('d-none');
	setTimeout( callback, 100, args1, args2, args3 );
}
function gShowPageLoader4( callback, args1, args2, args3, args4 ) {
	$('#gPageLoader').removeClass('d-none');
	setTimeout( callback, 100, args1, args2, args3, args4 );
}
function gShowPageLoader5( callback, args1, args2, args3, args4, args5 ) {
	$('#gPageLoader').removeClass('d-none');
	setTimeout( callback, 100, args1, args2, args3, args4, args5 );
}
function gHidePageLoader(){ $('#gPageLoader').addClass('d-none'); }

function gAlert( title, htmlMsg, callback ) {
    $( '#gAlertModal .modal-header h5' ).text( title );
    $( '#gAlertModal .modal-body' ).html( htmlMsg );
    $( '#gAlertModal' ).off( "hide.bs.modal" );
    if( callback ) {
        $( '#gAlertModal' ).one( "hide.bs.modal", callback );
    }
    $( '#gAlertModal' ).modal( 'show' );
}

function gConfirm( title, htmlMsg, callback ) {
    $( '#gConfirmModal .modal-title' ).text( title );
    $( '#gConfirmModal .modal-body' ).html( htmlMsg );
    $( '#gConfirmModal .btn-confirm' ).off( 'click' ).one( 'click', function() {
        callback();
        $( '#gConfirmModal' ).modal( 'hide' );
    } );
    $( '#gConfirmModal' ).modal( 'show' );
}

const SUCCESS = 200, ERROR = 500, REDIRECT = 300;
function gAjax( options, callback, fCallback ) {
    gShowPageLoader();
    if( options.enctype == "multipart/form-data" ) {
        options.data.append( 'REQUEST_URL', options.url );
    } else {
        options.data["REQUEST_URL"] = options.url;
    }
    
    options.url = "/AjaxController/";
    
    $.ajax( options )
     .done( function( ajaxResponse ) {
        if( ajaxResponse &&
            ajaxResponse.ajaxResponseCode &&
            parseInt( ajaxResponse.ajaxResponseCode ) == SUCCESS ) {
	
            callback( ajaxResponse );

        } else if( ajaxResponse &&
            ajaxResponse.ajaxResponseCode &&
            parseInt( ajaxResponse.ajaxResponseCode ) == REDIRECT ) {
	
            window.location.href = ajaxResponse.ajaxResponseUrl;

        } else if( ajaxResponse && ajaxResponse.ajaxResponseText ) {
	
			if( fCallback ) {
	            fCallback( ajaxResponse );
			} else {
				gAlert( "Request Failed", ajaxResponse.ajaxResponseText );
	            gHidePageLoader();
			}
			
        } else {
	
			if( fCallback ) {
				fCallback();
			} else {
	            gAlert( "Request Failed", "Unable to process your request." );
	            gHidePageLoader();
			}
        }
    } )
    .fail( function( jqXHR ) {
		if( fCallback ) {
			fCallback();
		} else {
	        gAlert( "Request Failed", "HD: " + jqXHR.statusText );
	        gHidePageLoader();
		}
    } );
}

$( function () {
	var isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
	var eventName = isOnIOS ? "pagehide" : "beforeunload";
	window.addEventListener( eventName, gShowPageLoader );
    
    $( ".modal .close span" ).text( "x" );
    
    $( '.card-header' ).on( 'click', function() {
        var $icon = $( '.panel-expand-collapse', this );
        if( $icon.hasClass( 'fa-chevron-up' ) ) {
            $( this ).siblings( '.card-body' ).hide( 500 );
            $icon.removeClass( 'fa-chevron-up' )
                 .addClass( 'fa-chevron-down' );
        } else {
            $( this ).siblings( '.card-body' ).show( 500 );
            $icon.removeClass( 'fa-chevron-down' )
                 .addClass( 'fa-chevron-up' );
        }
    } );
    

    var isScenario = false; 

    if(!isScenario){
        $(".scenario1").hide()
    }

    var demodata = localStorage.getItem("demodata");
    
    if(demodata!=null && demodata!="" && demodata!=undefined){

        var demodataJson = JSON.parse(demodata);
         
        $("#nationalid").text(dataCheck(demodataJson.identiferId));
        $("#valueinput").val(dataCheck(demodataJson.identiferId));
        $("#first_name").text(dataCheck(demodataJson.given));
        $("#last_name").text(dataCheck(demodataJson.family));

        $("#full_name").text(dataCheck(demodataJson.given) + " "+ dataCheck(demodataJson.family));

        $("#father_name").text(dataCheck(demodataJson.fatherName));
        $("#contact_no").text(dataCheck(demodataJson.contactNumber));
        console.log(uuidv4());

    }
  
    $('#validatebtn').on( 'click', function() {
        getPaymentDetails();
        //getdisbursement();
    } );

    $('#type_value').on( 'change', function() {
        
        if($('#type_value').val() =="NATIONAL_ID"){
            $("#valueinput").val($("#nationalid").text())
            $("#valueinput").prop('disabled', true);
        }else if($('#type_value').val() =="MOBILE"){
            $("#valueinput").val($("#contact_no").text()) 
            $("#valueinput").prop('disabled', false);
        }
 
    });

    $("#registerDiv" ).on("click",function(){
        gAlert( "Request Complete", "Registration Successful!!" );
        $('#gAlertModal').on('hidden.bs.modal', function () {
            location.href = "PaymentPage.html";
        }); 
    });


    gOnPageLoad();
} );


function getPaymentDetails(){
    $("#registerDiv").hide();
    gShowPageLoader()
    var MainURL = "http://13.59.128.159:3005/validateBankDetails"                                  
    var options={};

    var dataForsearch = {
        "disbursementId": uuidv4(),
        "idtype":$("#type_value").val(),
        "idvalue":$("#valueinput").val() 
    }

    options.url = MainURL;
    options.data =  JSON.stringify(dataForsearch);
    options.type= "POST", 
    options.dataType= 'json',
    options.headers = {
        "Content-Type": "application/json", 
        "Accept" :"*/*" 
      }
      var  tableBody = $("#searchedRecords");
    $.ajax( options )
     .done( function( ajaxResponse ) {
        var rawCount = 0;
        console.log("ajaxResponse " + ajaxResponse);

        var  markupTr ="";
        $.each(ajaxResponse.data.payeeResults,   function(key,value) {

            var responseValue =  value.paymentExecutionSystemInfo;

            var bankvalue = "";
            if(responseValue!=null && responseValue!="" 
            && responseValue!=undefined && 
                responseValue.payeeIdValue!=null && responseValue.payeeIdValue!="" 
            && responseValue.payeeIdValue!=undefined) {
                var BankDetailsString = responseValue.payeeIdValue.toString();
                for(var i=0;i<BankDetailsString.length-2;i++){
                  bankvalue = bankvalue +"*";
                }
                 bankvalue= bankvalue + BankDetailsString.slice(BankDetailsString.length - 2, BankDetailsString.length)

                markupTr =markupTr+ "<tr>"      
                    +"<td>"+  bankvalue +"</td>"
                    +"<td>&#9989;</td>"        
                    +"</tr>";
                rawCount++;

                var demodata = localStorage.getItem("demodata");
               
                var demodataJson = JSON.parse(demodata);
                demodataJson["backDetail"] = BankDetailsString;
                localStorage.setItem("demodata",JSON.stringify (demodataJson))
             }
        });

        if(markupTr!=null && markupTr!="" && markupTr!=undefined){
            tableBody = $("#searchedRecords").html("");
            tableBody.append(markupTr);
            $("#registerDiv").show();
        } 

        if(rawCount==0){
             markupTr =markupTr+ "<tr>"      
                +"<td>************</td>"
                +"<td>&#10060;</td>"        
                +"</tr>";
            tableBody = $("#searchedRecords").html("");
            tableBody.append(markupTr);
        }    

        gOnPageLoad();
     });

}

function getdisbursement(){

    
    var MainURL = "http://13.59.128.159:3005/disbursement"                                  
    var options={};
    options.url = MainURL;
   
    options.type= "POST", 
    options.dataType= 'json',
    options.headers = {
        "Content-Type": "application/json", 
        "Accept" :"*/*" 
      }
    
    $.ajax( options )
     .done( function( ajaxResponse ) {
        console.log("ajaxResponse " + ajaxResponse);
     });

}
 
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
  

function dataCheck(val){ 
    if(val!=null && val!="" && val!=undefined){
        return val;
    }else{
        return "";
    }    
}