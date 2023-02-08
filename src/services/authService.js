import http from './httpService';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(user) {
  try {
    const auth = await http.post(`/auth`, user);

    localStorage.setItem(tokenKey, auth.data);
    return auth;
  } catch (ex) {
    toast.error(ex.response.data.message);
  }
}

export async function changePass(passwordObject){
  const currentUserId = getCurrentUser().nameid;
  try {
    let localPasswordObject = {...passwordObject, ['id']: currentUserId }

    const auth = await http.put(`/auth/${currentUserId}`, localPasswordObject)

    return auth;
    
  } catch (ex) {
    toast.error(ex.response.data)
    throw new Error(ex.response.data);
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}
