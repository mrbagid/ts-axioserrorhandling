
import axios from 'axios';

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response);
    return response;
  },
  async (error: AxiosError) => {
    apiErrorHandler(error);
    return Promise.reject(error);
  },
);
//.....

const knownErrors = ['INVALID_USER_ID','WRONG_FLIGHT_ID'];
export function apiErrorHandler(error: AxiosError<any>) {
  const code = error.response?.data?.error?.code;
  const errorJ = error.response?.data?.error;
  console.error(error);
  if (!knownErrors.includes(code)) {
    toast('server error');
    sendErrorToAppLogServer(errorJ);
  }
  else{
    toast(specificErrorMsg(code));
  }
}