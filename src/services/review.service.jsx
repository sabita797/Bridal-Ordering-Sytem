import { GET_REVIEW_BY_PRODUCTID_URL, ADD_REVIEWS_URL} from "../constants/api";
import {getUserInfo} from "./authServices";

export async function  getReviewByProductId   (id) {
    let url = GET_REVIEW_BY_PRODUCTID_URL;
    url = `${url}/${id}`;
    const response = await fetch(url,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data;
}

export async function  postReview(review) {
    const user = await getUserInfo();
    const jwtToken = user.jwtToken;
    debugger;
    try {
        const response = await fetch(ADD_REVIEWS_URL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`}),
            body: JSON.stringify(review)
           });
            const data = await response.json();
            return  data;
    } catch (error) {
        console.log(error.message);
    }
    
}