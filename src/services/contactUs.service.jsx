import { ADD_CONTACTUS_URL } from "../constants/api";
import {getUserInfo} from "./authServices";

//AddContactUsService
export async function  postContactUs(contactUs) {
    const user = await getUserInfo();
    const jwtToken = user.jwtToken;
    debugger;
    try {
        const response = await fetch(ADD_CONTACTUS_URL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`}),
            body: JSON.stringify(contactUs)
           });
            const data = await response.json();
            return  data;
    } catch (error) {
        console.log(error.message);
    }
}

