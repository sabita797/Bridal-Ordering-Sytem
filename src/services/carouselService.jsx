import { CAROUSEL } from "../constants/api";

export async function getCarousel () {
    debugger;
    const response = await fetch(CAROUSEL,
    {   method: 'GET',
        headers: { 'content-type': 'application/json' },
    });
    debugger;
    const data = await response.json();
    debugger;
    return  data;
}