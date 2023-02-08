import http from './httpService';

export async function getUsers() {
  const users = await http.get(`/user`);
  // console.log(result);
  return users;
}

export async function getUser(id) {
  const user = await http.get(`/user/${id}`);
  // console.log(result);
  return user;
}

export async function saveUser(user) {
  let localUser = { ...user };
  delete localUser['id'];

  let userInDb = await http.post(`/user`, localUser);
  return userInDb;
}

export async function updateUser(user) {
  let localUser = { ...user };

  let userInDb = await http.put(`/user/${user.id}`, localUser);
  return userInDb;
}

export async function deleteUser(id) {

  let userInDb = await http.delete(`/user/${id}`);
  return userInDb;
}
