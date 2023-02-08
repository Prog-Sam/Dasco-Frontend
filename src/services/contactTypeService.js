import http from './httpService';

export async function getContactTypes() {
  const contactTypes = await http.get(`/contactType`);
  // console.log(result);
  return contactTypes;
}

export async function getContactType(id) {
  const contactType = await http.get(`/contactType/${id}`);
  // console.log(result);
  return contactType;
}

export async function saveContactType(contactType) {
  let localContactType = { ...contactType };
  delete localContactType['id'];

  let contactTypeInDb = await http.post(`/contactType`, localContactType);
  return contactTypeInDb;
}

export async function updateContactType(contactType) {
  let localContactType = { ...contactType };

  let contactTypeInDb = await http.put(`/contactType/${contactType.id}`, localContactType);
  return contactTypeInDb;
}

export async function deleteContactType(id) {

  let contactTypeInDb = await http.delete(`/contactType/${id}`);
  return contactTypeInDb;
}
