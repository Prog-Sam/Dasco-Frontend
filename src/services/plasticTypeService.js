import http from './httpService';

export async function getPlasticTypes() {
  const plasticTypes = await http.get(`/plasticType`);
  // console.log(result);
  return plasticTypes;
}

export async function getPlasticType(id) {
  const plasticType = await http.get(`/plasticType/${id}`);
  // console.log(result);
  return plasticType;
}

export async function savePlasticType(plasticType) {
  let localPlasticType = { ...plasticType };
  delete localPlasticType['id'];

  let plasticTypeInDb = await http.post(`/plasticType`, localPlasticType);
  return plasticTypeInDb;
}

export async function updatePlasticType(plasticType) {
  let localPlasticType = { ...plasticType };

  let plasticTypeInDb = await http.put(`/plasticType/${plasticType.id}`, localPlasticType);
  return plasticTypeInDb;
}

export async function deletePlasticType(id) {

  let plasticTypeInDb = await http.delete(`/plasticType/${id}`);
  return plasticTypeInDb;
}
