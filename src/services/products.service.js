import { ADD_PRODUCTS_URL, GET_PRODUCTS_URL, GET_PRODUCT_BY_ID_URL,DELETE_PRODUCT_URL,UPDATE_PRODUCT_URL} from "../constants/api";



export async function  getProducts   () {
    const response = await fetch(GET_PRODUCTS_URL,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data;
}

export async function  addProducts(product) {
    const user = JSON.parse(localStorage.getItem('user'));
const jwtToken = user.jwtToken;
    debugger;
    try {
        const response = await fetch(ADD_PRODUCTS_URL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`}),
            body: JSON.stringify(product)
           });
            debugger;
            const data = await response.json();
            return  data;
    } catch (error) {
        console.log(error.message);
        debugger;
    }
    
}

export async function  getProductById   (id) {
    let url = GET_PRODUCT_BY_ID_URL;
    url = `${url}/${id}`;
    const response = await fetch(url,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data;
}

//delete product by id
export async function  deleteProduct(id) {
    const user = JSON.parse(localStorage.getItem('user'));
const jwtToken = user.jwtToken;
    let url = DELETE_PRODUCT_URL;
    url = `${url}/${id}`;
    const response = await fetch(url,
    {   method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${jwtToken}`}),
    });
    const data = await response.json();
    return  data;
}

//update product by id
export async function  updateProduct(id,product) {
    const user = JSON.parse(localStorage.getItem('user'));
const jwtToken = user.jwtToken;
    let url = UPDATE_PRODUCT_URL;
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
