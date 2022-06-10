import { GET_CAROUSEL_URL, ADD_CAROUSEL_URL, DELETE_CAROUSEL_URL } from "../constants/api";



export async function  getCarousel   () {
    const response = await fetch(GET_CAROUSEL_URL,
    {   method: 'GET',
        // headers: new Headers({
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${await token}`})
    });
    const data = await response.json();
    return  data;
}

export async function  addCarousel(img) {
    const user = JSON.parse(localStorage.getItem('user'));
    const jwtToken = user.jwtToken;
    try {
        const response = await fetch(ADD_CAROUSEL_URL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`}),
            body: JSON.stringify(img)
           });
            debugger;
            const data = await response.json();
            return  data;
    } catch (error) {
        console.log(error.message);
        debugger;
    }
    
}

//delete carousel
export async function  deleteCarousel(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const jwtToken = user.jwtToken;
    let url = DELETE_CAROUSEL_URL;
    url = `${url}/${id}`;
    const response = await fetch(url,
    {   method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${jwtToken}`}),
    });
    const data = await response.json();
    return  data;
}