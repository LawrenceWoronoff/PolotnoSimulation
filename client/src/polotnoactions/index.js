const API_BASE = "http://localhost:3000/api"
const ASSET_BASE = "http://localhost:3000/api/assets"

/** Export Image From Json */
export const exportImage = () => {
  // let data = new FormData();
  // data.append("wallet_address", wallet_address);
  
  return fetch(`${API_BASE}/polotno/export-jpg`, {
    method: "POST",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    body: {},
    // mode: "cors",
  });
};