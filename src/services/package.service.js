import { GET_PACKAGES_URL, ADD_PRODUCTS_URL, GET_PACKAGE_BY_ID_URL } from "../constants/api";
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0NmFlZmMwLTQ0OWYtNGE5Ny04ZjEzLTYyYzJlYWU0ZTQyYyIsIm5iZiI6MTY0NTY4NzAyNywiZXhwIjoxNjQ2MjkxODI3LCJpYXQiOjE2NDU2ODcwMjd9.-9uAICDZWghfxl70vLJ9q00TA_fdOqqEdd75JcyK1C0";

export async function  getPackages   () {
    const response = await fetch(GET_PACKAGES_URL,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data;
}

export async function  getPackageById   (id) {
    let url = GET_PACKAGES_URL;
    url = `${url}/${id}`;
    const response = await fetch(url,
    {   method: 'GET',
    });
    const data = await response.json();
    return  data;
}
