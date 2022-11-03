import express from "express"; 
import {getdata,getdatamediator} from "./opencrvs"
import {validateBankDetails,disbursement} from "./paymentsystem"
import {sendOtpMediator,sendOtp,validateOTP,ValidatedMediator} from "./NationalID"

export default app => {
    
   
app.post('/getData', async (_req, res) => {
  try {
    //var getTocken =await getToken();
     var getDataRes = await getdata(_req);
     
   // console.log(`This is Response ${getDataRes}`);

    await res.json({data: getDataRes});
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

})


app.post('/getdatamediator', async (_req, res) => {
  try {
    //var getTocken =await getToken();
     var getDataRes = await getdatamediator(_req);
     
   // console.log(`This is Response ${getDataRes}`);

    await res.json({data: getDataRes});
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

})

app.post('/validateBankDetails', async (_req, res) => {
  try {
    //var getTocken =await getToken();
     var getDataRes = await validateBankDetails(_req);
     
   // console.log(`This is Response ${getDataRes}`);

    await res.json({data: getDataRes});
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

});

app.post('/disbursement', async (_req, res) => {
  try {
    //var getTocken =await getToken();
     var getDataRes = await disbursement(_req);
     
   // console.log(`This is Response ${getDataRes}`);

    await res.json({data: getDataRes});
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

});

app.post('/sendotp_Mediator', async (_req, res) => {
  try {
    
     var getDataRes = await sendOtpMediator(_req);
      
    await res.json(  getDataRes);
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

});


app.post('/getotp', async (_req, res) => {
  try {
    
     var getDataRes = await sendOtp(_req);
      
    await res.json({data: getDataRes});
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

});

app.post('/useridOTP', async (_req, res) => {
  try {
    
     var getDataRes = await validateOTP(_req);
      
    await res.json( getDataRes );
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

})

app.post('/useridOTPMediator', async (_req, res) => {
  try {
    
     var getDataRes = await ValidatedMediator(_req);
      
    await res.json( getDataRes );
  } catch (err) { 
    res.status(404).send(`Sorry, cant find that ${err}`);
  }

})
      
}