import { getDepartColleagues } from './restAddress';

export const getUserDepartColleagues = async (id) => {
  const tempResp = await fetch(getDepartColleagues + id, {
    method: 'GET',
  });

  const resp = await tempResp.json();
  try {
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
