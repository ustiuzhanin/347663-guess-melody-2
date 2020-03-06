import {combineReducers} from "redux";
import {reducer as user} from "./user/user";
import {reducer as data} from "./data/data";
import {reducer as game} from "./game/game";
import {reducer as errors} from "./errors/errors";

export default combineReducers({
  data,
  user,
  game,
  errors
});
