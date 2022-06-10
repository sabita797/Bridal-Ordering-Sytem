import {GET_CONTACT_US_URL} from '../constants/api';

export async function getContactUs() {
    const response = await fetch(GET_CONTACT_US_URL,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data;
}