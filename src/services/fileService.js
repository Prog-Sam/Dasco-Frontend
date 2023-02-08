import http from './httpService';

export async function getFile(fileName) {
  
  try {
    const response = await http.get(`/FileUpload/${fileName}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (ex) {
    console.log(ex);
  }
}

export async function saveFile(file, id) {
  try {
    const plasticType = await http.get(`/plasticType/${id}`);

    if(!plasticType)
    return('Plastic Type Not Found');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    let fileInDb = await http.post(`/FileUpload`, file, config);
    console.log(fileInDb);

    console.log({...plasticType.data, ['imageLocation']: fileInDb.data});
    await http.put(`/plasticType/${id}`, {...plasticType.data, ['imageLocation']: fileInDb.data})
    return fileInDb;
  } catch (ex) {
    console.log(ex);
  }
}

export async function deleteFile(id) {
  try {
    const deleted = await http.delete(`/FileUpload/?filePath=${id}`);
    console.log(deleted);
  } catch (ex) {
    console.log(ex);
  } 
}
