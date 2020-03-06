import axios from "axios";
import {ActionCreator} from "./reducer/errors/errors";

export default function configueAPI(dispatch) {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true
  });

  const onSucces = (response) => response;

  const onFail = (err) => {
    dispatch(ActionCreator.showErrorMessage(err.response));
    return err;
  };

  api.interceptors.response.use(onSucces, onFail);

  return api;
}
