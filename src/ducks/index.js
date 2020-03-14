// DUCKS: https://github.com/erikras/ducks-modular-redux
import { combineReducers } from "redux";

import teams from "./teams";
import standings from "./standings";
import yesterday from "./yesterday";
import today from "./today";
import hitterStats from "./hitterStats";
import pitcherStats from "./pitcherStats";
import team from "./team";
import news from "./news";

const reducers = combineReducers({
  teams,
  standings,
  yesterday,
  today,
  hitterStats,
  pitcherStats,
  team,
  news
});

export default reducers;
