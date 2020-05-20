import React           from 'react'


import { connect }     from 'react-redux'


import Grid            from '@material-ui/core/Grid';
import Paper            from '@material-ui/core/Paper';
import Button            from '@material-ui/core/Button';
import Container            from '@material-ui/core/Container';
import Card            from '@material-ui/core/Card';
import CardContent            from '@material-ui/core/CardContent';
import CardActions            from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography      from '@material-ui/core/Typography';
import Box      from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';


import {
    getQuestions,
    sendAnswers,
    setErrors,
    setRevisions
} from '../../../redux/actions/questions.actions'

class QuestionsView extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            answersValue: [],
        }
    }

    componentDidMount(){
        const { getQuestions } = this.props;
        getQuestions();
    }

    handleChange = (index, answer) => {
        let prevAnswersValue = this.state.answersValue;

        if(prevAnswersValue.length > 0){
            prevAnswersValue.forEach( (a,i) => {
                if(a.index === index && a.answer !== answer){
                    prevAnswersValue[i] = {index:index, answer:answer}
                }
                if(!prevAnswersValue.find(aws => aws.index === index)){
                    prevAnswersValue.push({index:index, answer:answer})
                }
            })
        } else {
            prevAnswersValue.push({index:index, answer:answer})
        }
        
        this.setState({answersValue: prevAnswersValue})
    }

    handleSubmit = () => {
        const { sendAnswers } = this.props;
        sendAnswers(this.state.answersValue)
    }
 
    generateQuestionsOnView = () => {
        const { questions } = this.props;
        let questionForView = [];
            questions.forEach( (qu, i) => {
                questionForView.push(
                    <React.Fragment key={i}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {qu.question}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={1}>
                                    <Grid item sm={12}>
                                    {qu.type === 'close' ?
                                        <RadioGroup style={{paddingLeft: "10px"}} onChange={e => this.handleChange(qu.index, e.target.value)}>
                                            <FormControlLabel value={qu.answer[0]} control={<Radio />} label={qu.answer[0]} />
                                            <FormControlLabel value={qu.answer[1]} control={<Radio />} label={qu.answer[1]} />
                                            <FormControlLabel value={qu.answer[2]} control={<Radio />} label={qu.answer[2]} />
                                        </RadioGroup>
                                    :
                                        <TextField id="filled-basic" label="Type the answer" variant="filled" fullWidth style={{paddingLeft: "10px", paddingRight:"10px"}} onChange={e => this.handleChange(qu.index, e.target.value)} required/>
                                    }
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                        <Box m={2} />
                    </React.Fragment>
                );
            })

            return(
                <React.Fragment>
                    {questionForView}
                    <Box m={4} />
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h6">Send answers?</Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container alignContent="center" alignItems="center">
                                <Grid item sm={12}>
                                    <Button onClick={this.handleSubmit}>Send</Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </React.Fragment>
            )
    }

    loader = () => {
        return(
            <React.Fragment>
                 <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item sm={12}>
                        <Paper
                        elevation={0}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflowX: "auto",
                            minHeight: 700
                        }}
                        >
                            <CircularProgress size={this.props.size || 40} />
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    showError = () => {
        const {error} = this.props;
        return(
            <React.Fragment>
            <Box m={4} />
            <Card style={{background: "red"}}>
                <CardContent>
                    <Typography variant="h6" component="h6">{error}</Typography>
                </CardContent>
                <CardActions>
                    <Grid container alignContent="center" alignItems="center">
                        <Grid item sm={12}>
                            <Button onClick={this.handleCloseError}>close</Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            <Box m={4} />
        </React.Fragment>
        )
    }

    handleCloseError = () => {
        const { setErrors } = this.props;
        setErrors(null)
    }

    showRevitions = () => {
        let correct = 0;
        const { revisions } = this.props;
        revisions.forEach(revition => {
            if ( revition.result === true ){
                correct = correct + 1;
            }
        })
        return(
            <React.Fragment>
            <Box m={4} />
            <Card style={{background: "green"}}>
                <CardContent>
                    <Typography variant="h6" component="h6">Number of correct anwers: {correct}</Typography>
                </CardContent>
                <CardActions>
                    <Grid container alignContent="center" alignItems="center">
                        <Grid item sm={12}>
                            <Button onClick={this.handleCloseResults}>close</Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            <Box m={4} />
        </React.Fragment>
        )
    }

    handleCloseResults = () => {
        const { setRevisions } = this.props;
        setRevisions([])
    }


    render(){
        console.log(this.state)
        const { loader, error, revisions } = this.props;
        return(
            <React.Fragment>
               <Container>
                   {error ? 
                   this.showError():
                   null}
                   {Boolean(revisions.length)?
                   this.showRevitions():
                   null
                   }
                    {loader ?
                        this.loader():
                        this.generateQuestionsOnView()
                    }
               </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const questions = state.questions.questions;
    const loader = state.questions.loader;
    const error = state.questions.error;
    const revisions = state.questions.revisions;
    return{
        questions,
        loader,
        error,
        revisions
    }
  }
  
  const mapDispatchToProps = (dispatch,props,context) => {
    return{
        getQuestions: () => dispatch(getQuestions()),
        sendAnswers: answers => dispatch(sendAnswers(answers)),
        setErrors: error => dispatch(setErrors(error)),
        setRevisions: results => dispatch(setRevisions(results))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )((QuestionsView))
  