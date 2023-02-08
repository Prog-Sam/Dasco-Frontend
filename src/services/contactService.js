import http from './httpService';

export async function getContacts() {
  const contacts = await http.get(`/contact`);
  // console.log(result);
  return contacts;
}

export async function getContact(id) {
  const contact = await http.get(`/contact/${id}`);
  // console.log(result);
  return {data:{...contact.data, ['userId']: contact.data.user.id, ['contactTypeId']: contact.data.contactType.id}};
}

export async function saveContact(contact) {
  let localContact = { ...contact };
  delete localContact['id'];

  let contactInDb = await http.post(`/contact`, localContact);
  return contactInDb;
}

export async function updateContact(contact) {
  let localContact = { ...contact };

  let contactInDb = await http.put(`/contact/${contact.id}`, localContact);
  return contactInDb;
}

export async function deleteContact(id) {

  let contactInDb = await http.delete(`/contact/${id}`);
  return contactInDb;
}
