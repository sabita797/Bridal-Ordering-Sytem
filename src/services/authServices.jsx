import { USER_LOGIN, USER_REGISTER } from "../constants/api";


export async function loginService(item) {

    const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(item)
    }
    const response = await fetch(USER_LOGIN, requestOptions);
    return response;
}

export async function signUpService(item) {

    const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(item)
    }
    debugger;
    const response = await fetch(USER_REGISTER, requestOptions);
    debugger;
    return response;

}

export async function getUserInfo(){
    const userInfo = JSON.parse(localStorage.getItem('LogedIn'));
    if(userInfo){
        return userInfo;
    }else{
        return null;
    }
}