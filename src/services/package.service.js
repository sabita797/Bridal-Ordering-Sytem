import { ADD_PACKAGE_URL, GET_PACKAGE_URL,DElETE_PACKAGE_URL, UPDATE_PACKAGE_URL } from "../constants/api";



export async function  addPackage(packages) {
    const user = JSON.parse(localStorage.getItem('user'));
const jwtToken = user.jwtToken; 
    debugger;
    try {
        const response = await fetch(ADD_PACKAGE_URL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`}),
            body: JSON.stringify(packages)
           });
            debugger;
            const data = await response.json();
            return  data;
    } catch (error) {
        console.log(error.message);
        debugger;
    }
    
}

export async function  getPackages   () {
    
    const response = await fetch(GET_PACKAGE_URL,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data.result;
}

export async function  getPackageById   (id) {
    let url = GET_PACKAGE_URL;
    url = `${url}/${id}`;
    const response = await fetch(url,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data;
}

//delete product by id
export async function  deletePackage(id) {
    const user = JSON.parse(localStorage.getItem('user'));
const jwtToken = user.jwtToken; 
    let url = DElETE_PACKAGE_URL;
    url = `${url}/${id}`;
    debugger
    const response = await fetch(url,
    {   method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${jwtToken}`}),
    });
    const data = await response.json();
    return  data;
}

//update package by id
export async function  updatePackage(id,product) {
    const user = JSON.parse(localStorage.getItem('user'));
const jwtToken = user.jwtToken; 
    debugger;
    let url = UPDATE_PACKAGE_URL;
    url = `${url}/${id}`;
    const response = await fetch(url,
    {   method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`}),
        body: JSON.stringify(product)
    });
    const data = await response.json();
    return  data;
}