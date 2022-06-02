import axios from "axios";

const API_BASE = "http://localhost:3000/api"
// const ASSET_BASE = "http://localhost:3000/api/assets"

/** Export Image From Json */
export const processTemplate = (jsonFile, feed) => {
  return  axios.post(`${API_BASE}/polotno/process-template`, 
            {
               jsonFile: jsonFile,
               feed: feed,
            }
          );
};


export const getTemplateOriginal = (jsonFile) => {
  return  axios.post(`${API_BASE}/polotno/template-view`, { jsonFile, jsonFile });
}

export const uploadTemplateJson = (myfile) => {
  const formData = new FormData();
  formData.append('myfile', myfile);
  const config = {
    headers: {
      'content-type' : 'multipart/form-data'
    }
  };

  return axios.post(`${API_BASE}/file/upload-template`, formData, config);
}
