import http from './httpService';
import { getCurrentUser } from './authService';

export async function getUserAccounts() {
  const userAccounts = await http.get(`/userAccount`);
  // console.log(result);
  return userAccounts;
}

export async function getUserAccount(id) {
  const userAccount = await http.get(`/userAccount/${id}`);
  return {data: {...userAccount.data, ['userId']: userAccount.data.user.id}};
}

export async function saveUserAccount(userAccount) {
  let localUserAccount = {...userAccount, ['accessorId']:parseInt(getCurrentUser().nameid)};
  delete localUserAccount['id'];

  let userAccountInDb = await http.post(`/userAccount`, localUserAccount);
  return userAccountInDb;
}

export async function updateUserAccount(userAccount) {
  try {
    let localUserAccount = {...userAccount, ['accessorId']: parseInt(getCurrentUser().nameid)};

  let userAccountInDb = await http.put(`/userAccount/${userAccount.id}`, localUserAccount);
  return userAccountInDb;
  } catch (ex) {
    console.log(ex.response);
  }
}

export async function deleteUserAccount(id) {

    let userInDb = await http.delete(`/user/${id}`);
    return userInDb;
  }