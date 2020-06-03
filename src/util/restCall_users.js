import { userInfo } from "./restAddress";

export const getUserInfo = async (id) => {
  const tempResp = await fetch(userInfo + id, {
    method: "GET",
  });

  const resp = await tempResp.json();
  try {
    if (resp.status !== 200 && resp.status !== 201) {
      console.log("Error!");
      throw new Error("Could not find User with your ID!");
    }
    return {
      name: resp.data.respFind.name,
      email: "resp.data.respFind.email",
      country: resp.data.respFind.country,
      country_code: resp.data.respFind.country_code,
      phone_number: resp.data.respFind.phone_number,
      user_display: resp.data.respFind.user_display,
      department: "resp.data.respFind.department",
      profile_pic: resp.data.respFind.profile_img_path,
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

// exports.updateCliente = async (data) => {
//   const response = await axios(`${constants.clients}/${data._id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: data,
//   });
//   return {
//     status: response.status,
//     statusText: response.statusText,
//     message: response.data.message,
//     data: response.data.data,
//   };
// };

export const getAllUserInfo = async () => {
  const tempResp = await fetch(userInfo, {
    method: "GET",
  });

  const resp = await tempResp.json();
  try {
    if (resp.status !== 200 && resp.status !== 201) {
      console.log("Error!");
      throw new Error("Could not find User with your ID!");
    }
    return {
      data: resp.data.respFind
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

//-------------------------------------------------------------------------------
// exports.getAllClientes = async () => {
//   const response = await axios(constants.clients, {
//     method: 'GET',
//   });
//   return {
//     status: response.status,
//     statusText: response.statusText,
//     message: response.data.message,
//     data: response.data,
//   };
// };

// exports.getCliente = async (data) => {
//   console.log(data);

//   const response = await axios(`${constants.clients}/${data._id}`, {
//     method: 'GET',
//   });
//   return {
//     status: response.status,
//     statusText: response.statusText,
//     message: response.data.message,
//     data: response.data,
//   };
// };

// exports.createCliente = async (data) => {
//   const response = await axios(constants.clients, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: data,
//   });
//   return {
//     status: response.status,
//     statusText: response.statusText,
//     message: response.data.message,
//     data: response.data,
//   };
// };

// exports.findCliente = async (data) => {
//   const response = await axios(`${constants.clients}/find`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: data,
//   });
//   return {
//     status: response.status,
//     statusText: response.statusText,
//     message: response.message,
//     data: response.data,
//   };
// };

// exports.deleteClient = async (data) => {
//   const response = await axios(`${constants.clients}/${data._id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return {
//     status: response.status,
//     statusText: response.statusText,
//     message: response.message,
//     data: response.data,
//   };
// };

// exports.clientHistory = async (data) => {
//   const response = await axios(`${constants.clients}/history/${data._id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: data,
//   });
//   return {
//     status: response.status,
//     statusText: response.statusText,
//     message: response.message,
//     data: response.data,
//   };
// };
