import React        from 'react';
import PropTypes    from "prop-types";
import { withStyles }     from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';




const useStyles   =  theme => ({
  root: {
    display: 'flex',
    paddingTop:40,
  },
  content: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
});


class MainLayout extends React.Component {
  static get contextTypes() {
    return {
      classes: PropTypes.object,
      theme: PropTypes.object,
      store: PropTypes.object.isRequired
    };
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    document.body.className = "main";
  }


  render(){
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={this.props.classes.title}>
                    Questions
                </Typography>
                <Button color="inherit">About</Button>
                </Toolbar>
            </AppBar>
            <div className={this.props.classes.root}>
                    <main className={this.props.classes.content}>
                        <div className={this.props.classes.toolbar} />
                        <this.props.component {...this.props} {...this.state} />
                    </main>
            </div>
        </React.Fragment>
    );
  }
}


export default withStyles(useStyles, { withTheme: true })(MainLayout);
