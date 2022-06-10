import {PAYMENT_VERIFICATION_URL} from '../constants/api';

export async function  verifyPayment(payload) {
    let payloadData = {
        token : payload.token,
        amount: "1000"
    }

    let reqbody = JSON.stringify(payloadData);
    debugger;

    try {
        const response = await fetch(PAYMENT_VERIFICATION_URL, {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: reqbody,
        });
        const data = await response.json();
        if(data.successResponse){
            console.log("Payment Successful",data.successResponse);
            return true;
        }else{
            return false;
        }
      } catch (error) {
        console.log(error.message);
        return false;
      }
}

