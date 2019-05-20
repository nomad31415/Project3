import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
// material ui
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    signinLink: {
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'all .1s',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.primary.dark,
        },
    },
});

const renderInput = (
        { input, meta: { touched, error, warning }, ...custom}
    ) => (
    <FormControl margin="normal" required fullWidth>
        <TextField
            {...input}
            {...custom}
        />
        <div style={{color: '#bc360a'}}>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </FormControl>
);

const required = value => value ? undefined : 'Required';

class Signin extends Component {

    componentDidMount = () => {
        document.body.classList.add('bg-grey');
    };

    componentWillUnmount = () => {
        document.body.classList.remove('bg-grey');
    };

    onSubmit = formProps => {
        console.log('formProps');
        console.log(formProps);
        this.props.signin(formProps, () => {
            this.props.history.push('/protected');
        });
    };

    render() {
        const { handleSubmit, classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            name="email"
                            type="text"
                            label="Email"
                            component={renderInput}
                            autoComplete="email"
                            validate={required}
                        />
                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            component={renderInput}
                            autoComplete="password"
                            validate={required}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <div>{this.props.errorMessage}</div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Link to="/signup" className={classes.signinLink}>Don't have an account? Sign up here.</Link>
                </Paper>
            </main>
        );
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin' })
)(withStyles(styles)(Signin));
