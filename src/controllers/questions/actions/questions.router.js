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
    getQuestions
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
                                        <TextField id="filled-basic" label="Type the answer" variant="filled" fullWidth style={{paddingLeft: "10px", paddingRight:"10px"}} onChange={e => this.handleChange(qu.index, e.target.value)} />
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
                                    <Button>Send</Button>
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
    render(){
        console.log(this.state)
        const { questions } = this.props;
        return(
            <React.Fragment>
               <Container>
                {Boolean(questions.length) ?
                this.generateQuestionsOnView():
                this.loader()}
               </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const questions = state.questions.questions;
    return{
        questions
    }
  }
  
  const mapDispatchToProps = (dispatch,props,context) => {
    return{
        getQuestions: () => dispatch(getQuestions())
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )((QuestionsView))
  