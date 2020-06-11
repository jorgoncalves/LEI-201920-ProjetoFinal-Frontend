//const base = 'http://localhost:8080';
const base = 'http://192.168.1.39:8080';

module.exports = Object.freeze({
  loginAddress: `${base}/auth/login`,
  userInfo: `${base}/user/`,
  getDocs: `${base}/docs/getDocs`,
  getDepartColleagues: `${base}/depart/userDepartColleagues/`,
  getDocumentForUser: `${base}/docs/:idUser/:stateDoc`,
  getCountries: `https://restcountries.eu/rest/v2/all`,
});
