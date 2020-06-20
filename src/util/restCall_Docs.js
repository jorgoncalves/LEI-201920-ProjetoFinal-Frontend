import axios from 'axios';
import queryString from 'querystring';
import {
  getDocsPermissions,
  getAllDeparts,
  getDocs,
  getDocDepart,
  insertDoc,
  updateDoc,
  getCommits
} from './restAddress';

export const getDocCommits = async (documentID) => {
  try {
    const tempObj = {};
    if (documentID) {
      tempObj.documentID_new = documentID;
      tempObj.documentID_old = documentID;
    }
    const params = queryString.stringify(tempObj);

    const resp = await axios(`${getCommits}?${params}`, {
      method: 'GET'
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getDocsUser = async (userID, status, documentID) => {
  try {
    const tempObj = {};
    if (userID) tempObj.userID = userID;
    if (status) tempObj.status = status;
    if (documentID) tempObj.documentID = documentID;
    const params = queryString.stringify(tempObj);
    const resp = await axios(`${getDocsPermissions}?${params}`, {
      method: 'GET'
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    return error;
  }
};

export const getDocsOnly = async (userID, status, documentID) => {
  try {
    const tempObj = {};
    if (userID) tempObj.userID = userID;
    if (status) tempObj.status = status;
    if (documentID) tempObj.documentID = documentID;
    const params = queryString.stringify(tempObj);

    const resp = await axios(`${getDocs}?${params}`, {
      method: 'GET'
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getAllDepartments = async (obj) => {
  try {
    const tempObj = {};
    if (obj.is_active) tempObj.is_active = obj.is_active;
    const params = queryString.stringify(tempObj);
    const resp = await axios(`${getAllDeparts}?${params}`);
    console.log(resp);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getDocDepartPermissions = async (documentID) => {
  try {
    const tempObj = {};
    if (documentID) tempObj.documentID = documentID;
    const params = queryString.stringify(tempObj);
    const resp = await axios(`${getDocDepart}?${params}`);
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const insertDocument = async (userID, data) => {
  try {
    const resp = await axios(`${insertDoc}/${userID} `, {
      method: 'POST',
      data: data
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const updateDocument = async (documentID, data) => {
  try {
    const resp = await axios(`${updateDoc}/${documentID} `, {
      method: 'PUT',
      data: data
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};
