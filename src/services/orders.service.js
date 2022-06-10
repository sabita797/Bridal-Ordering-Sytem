import {GET_ORDERS_URL} from '../constants/api';


export async function getOrders() {
    const user = JSON.parse(localStorage.getItem('user'));
    const jwtToken = user.jwtToken;
    const response = await fetch(GET_ORDERS_URL,
    {   method: 'GET',
        headers: new Headers({
            Authorization: `Bearer ${jwtToken}`,
        }),
    });
    const data = await response.json();
    return  data;
}
