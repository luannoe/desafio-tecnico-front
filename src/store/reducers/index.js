import { combineReducers } from 'redux';
import responsive from './responsive';
import alert from './alert';
import airports from './airports';
import flight from './flight';
import flights from './flights';

export default combineReducers({
  responsive,
  alert,
  airports,
  flight,
  flights,
});
