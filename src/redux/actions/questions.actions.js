export const SET_QUESTIONS = "SET_QUESTIONS";

export const setQuestions = questions => {
    return{
        type: SET_QUESTIONS,
        questions: questions
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