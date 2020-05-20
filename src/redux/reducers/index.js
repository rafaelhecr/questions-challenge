import { combineReducers }  from "redux";
import { i18nReducer }      from 'react-redux-i18n';

//reducers
import questions               from "./questions.reducer";



const reducers = combineReducers({
  questions,
  i18n: i18nReducer
});

export default reducers;