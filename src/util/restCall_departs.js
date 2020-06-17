import axios from 'axios';
import queryString from 'querystring';

import {
  getDepartColleagues,
  createDepart,
  getAllDeparts,
  departs
} from './restAddress';

export const getUserDepartColleagues = async (id, obj) => {
  try {
    const tempObj = {};
    if (obj.is_active) tempObj.is_active = obj.is_active;
    const params = queryString.stringify(tempObj);
    const tempResp = await fetch(`${getDepartColleagues}${id}?${params}`, {
      method: 'GET'
    });

    const resp = await tempResp.json();
    if (resp.status !== 200 && resp.status !== 201) {
      console.log('Error!');
      throw new Error('Could not find User with your ID!');
    }
    console.log(resp);

    return {
      resp
    };
  } catch (error) {
    //   UIkit.modal.dialog(`<p class="uk-modal-body">${error.message}</p>`);
    //   setState({
    //     token: null,
    //     tokenInfo: null,
    //     authLoading: false,
    //     error: error,
    //  });
    return error.message;
  }
};

export const getDepartmentData = async (departmentID) => {
  try {
    const tempObj = {};
    if (departmentID) tempObj.departmentID = departmentID;
    const params = queryString.stringify(tempObj);
    const resp = await axios(`${getAllDeparts}?${params}`, {
      method: 'GET'
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    return error;
  }
};

export const createDepartment = async (obj) => {
  try {
    const resp = await axios(`${createDepart} `, {
      method: 'POST',
      data: obj
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const updateDepart = async (id, obj) => {
  try {
    const resp = await axios(`${departs}/${id}`, {
      method: 'PUT',
      data: obj
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};
