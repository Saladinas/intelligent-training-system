import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1,
        background: 'url(https://i.pinimg.com/originals/bb/63/9a/bb639a17ace15e0a26244f060cd686df.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
    },
    grid: {
        margin: 'auto',

    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
    block: {
        display: 'inline-block',
    },
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        minWidth: '90%',
    },
    paper: {
        padding: 20,
        backgroundColor: 'rgba(63, 81, 181, 1)',
        // backgroundColor: rgba(51, 170, 51, .1) '#3f51b5',
        // opacity: 0.2,
    }
});

class Form extends Component {
    render() {
        const { classes, userInfo } = this.props;
        const valid = userInfo.age && userInfo.height && userInfo.weight;
        return (
            <div className={classes.root}>
                <Grid direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }} className={classes.grid} container spacing={24}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper} elevation={16}>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Age</InputLabel>
                                    <Select
                                        value={userInfo.age}
                                        onChange={this.props.handleChange('age')}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={20}>&lt; 20</MenuItem>
                                        <MenuItem value={30}>20 - 30</MenuItem>
                                        <MenuItem value={40}>30 - 40</MenuItem>
                                        <MenuItem value={50}>40 - 50</MenuItem>
                                        <MenuItem value={60}>50 - 60</MenuItem>
                                        <MenuItem value={70}>60 - 70</MenuItem>
                                        <MenuItem value={80}>70 - 80</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl
                                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                                    aria-describedby="weight-helper-text"
                                >
                                    <TextField
                                        type="number"
                                        id="adornment-weight"
                                        value={userInfo.weight}
                                        onChange={this.props.handleChange('weight')}
                                        inputProps={{
                                            'max': 10,
                                            'aria-label': 'Weight',
                                        }}
                                    />
                                    <FormHelperText id="weight-helper-text">Weight (kg)</FormHelperText>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl
                                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                                    aria-describedby="weight-helper-text"
                                >
                                    <TextField
                                        id="adornment-weight"
                                        value={userInfo.height}
                                        onChange={this.props.handleChange('height')}
                                        inputProps={{
                                            'aria-label': 'Height',
                                        }}
                                    />
                                    <FormHelperText id="weight-helper-text">Height (cm)</FormHelperText>
                                </FormControl>
                            </div>
                            <Tooltip title={valid ? "" : "You must fill all fields"} placement="top" aria-label="Add">
                                <span>
                                    <Button onClick={() => this.props.history.push("/exercises")}
                                        disabled={!valid} variant="contained" color="primary" className={classes.button}>
                                        Continue
                            </Button>
                                </span>
                            </Tooltip>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Form));
