import {
    SET_QUESTIONS,
    SET_REVISIONS,
    SET_LOADER,
    SET_ERROR
} from '../actions/questions.actions';

let init = {
    questions : [],
    revisions: [],
    loader: true,
    error: null
}

export default (state = init, action) => {
    switch(action.type) {
      case SET_QUESTIONS:
      return Object.assign({}, state, {
        loader: false,
        questions: action.questions
      })
      case SET_REVISIONS:
        return Object.assign({}, state, {
          loader: false,
          revisions: action.revisions
        })
      case SET_LOADER:
          return Object.assign({}, state, {
            loader: action.state
          })
      case SET_ERROR:
        return Object.assign({}, state, {
          error: action.error
        })
      default:
      return state;
    }
  }