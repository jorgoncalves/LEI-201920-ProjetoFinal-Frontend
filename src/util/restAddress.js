// const base = 'http://localhost:8080';
const base = 'http://192.168.1.39:8080';

module.exports = Object.freeze({
  signupAddress: `${base}/auth/signup`,
  loginAddress: `${base}/auth/login`,
  userInfo: `${base}/user/`,
  userNotification: `${base}/user/notification`,
  getDocs: `${base}/docs/getDocs`,
  getDocDepart: `${base}/docs/getDocDepart`,
  getDocsPermissions: `${base}/docs/getDocsPermissions`,
  getDepartColleagues: `${base}/depart/userDepartColleagues/`,
  getDocumentForUser: `${base}/docs/:idUser/:stateDoc`,
  getCountries: `https://restcountries.eu/rest/v2/all`,
  geFile: `${base}/filexplorer/getFile`,
  getAllDeparts: `${base}/depart`,
  departs: `${base}/depart`,
  insertDoc: `${base}/docs/insertDoc`,
  updateDoc: `${base}/docs`,
  createDepart: `${base}/depart/create`,
  getRecords:`${base}/registers/getRecords`
});
