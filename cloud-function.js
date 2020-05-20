/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const cors = require('cors')({origin: true});

exports.challengeQuestions = (req, res) => {
    cors(req, res, () => {});

    const questions = [
              {
                  index: 0,
                  question: "What is Javascript?",
                  type: "close",
                  answer: ["Programming Languaje", "Runtime", "Both"],
                  correct: "Programming Languaje"
              },
              {
                  index: 1,
                  question: "Name of enggine made for Google for Javascript",
                  type: "open",
                  answer: [],
                  correct: "V8"
              },
              {
                  index: 2,
                  question: "Which company developed JavaScript?",
                  type: "close",
                  answer: ["Netscape", "Mozilla", "Microsoft"],
                  correct: "Netscape"
              },
              {
                  index: 3,
                  question: "How declare variables in Javascript?",
                  type: "close",
                  answer: ["let","var","both"],
                  correct: "both"
              },
              {
                  index: 4,
                  question: "Data type for Int in Javascript",
                  type: "open",
                  answer: [],
                  correct: "Number"
              },
              {
                  index: 5,
                  question: "Is Javascript Case-Sensitive Languaje?",
                  type: "close",
                  answer: ["yes", "no"],
                  correct: "yes"
              },
          ]

    switch (req.method) {
        case 'GET':
            let questionsReturn = [];
            let questionsReturnWithOutA = [];
          
              function random(mn, mx) {  
                return Math.random() * (mx - mn) + mn;  
              }
          
              for(let i=0; i<3; i++){
                let ques = questions[Math.floor(random(1, 6))-1];
                if(questionsReturn.length >0){
                    while(questionsReturn.find(questionR => questionR.index === ques.index )){
                        ques = questions[Math.floor(random(1, 6))-1];
                    }
                    questionsReturn.push(ques);
                } else {
                    questionsReturn.push(ques);
                }
              }
              
              questionsReturn.forEach(qu => {
                  delete qu.correct;
                  questionsReturnWithOutA.push(qu)
              })
          
              res.status(200).send(questionsReturnWithOutA);  
          break;
        case 'POST':
          let revision = [];
          let entryAnswers = req.body;
          if(entryAnswers.length === 3){
              entryAnswers.forEach(eA => {
                  let question = questions.find(qu => qu.index === eA.index);
                  if(Boolean(question)){
                      console.log("question: ", question)
                      let eAString = String(eA.answer).trim().toLowerCase();
                      let quString = String(question.correct).trim().toLowerCase();
                      console.log("input to compare",eAString);
                      console.log("question to compare",quString);
                      if(eAString === quString){
                          revision.push({index: eA.index, result: true})
                      } else {
                          revision.push({index: eA.index, result: false})
                      }  
                  }
              })
          } else {
              res.status(400).send('Incomplete answers')
          }
          res.status(200).send(revision)
          break;
        default:
          res.status(405).send({error: 'Something blew up!'});
          break;
      }

  
};
