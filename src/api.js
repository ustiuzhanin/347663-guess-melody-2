import axios from "axios";
import {ActionCreator} from "./reducer";

export default function configueAPI(dispatch) {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true
  });

  const onSucces = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requiredAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSucces, onFail);

  return api;
}
