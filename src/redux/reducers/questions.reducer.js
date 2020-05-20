import {
    SET_QUESTIONS
} from '../actions/questions.actions';

let init = {
    questions : []
}

export default (state = init, action) => {
    switch(action.type) {
      case SET_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.questions
      })
      default:
      return state;
    }
  }