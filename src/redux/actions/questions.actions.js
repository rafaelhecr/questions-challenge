export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_REVISIONS = "SET_REVISIONS";
export const SET_LOADER = "SET_LOADER";
export const SET_ERROR = "SET_ERROR";

export const setQuestions = questions => {
    return{
        type: SET_QUESTIONS,
        questions: questions
    }
}

export const setRevisions = revisions => {
    return{
        type: SET_REVISIONS,
        revisions: revisions
    }
}

export const setLoader = state => {
    return{
        type: SET_LOADER,
        state
    }
}

export const setErrors = error => {
    return{
        type: SET_ERROR,
        error
    }
}


export const getQuestions = () => {
    
    return (dispatch, getState) => {
         fetch('https://us-central1-sion-devcat-firebase.cloudfunctions.net/react-questions-backend',
            {  method: 'GET',
               mode: 'cors',
             })
        .then(response => {
            return response.json();
        })
        .then(questions => {
            return dispatch(setQuestions(questions))
        })

    }
}

export const sendAnswers = (answers) => {
    return (dispatch, getState) => {
        dispatch(setLoader(true))
        fetch('https://us-central1-sion-devcat-firebase.cloudfunctions.net/react-questions-backend',
           {  method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(answers)
            })
       .then(response => {
           return response.json();
       })
       .then(ansChecked => {
           dispatch(setLoader(false))
           return dispatch(setRevisions(ansChecked))
       })
       .catch(err => {
           dispatch(setLoader(false))
           return dispatch(setErrors("Incomplete anwers"))
        })

   }
}