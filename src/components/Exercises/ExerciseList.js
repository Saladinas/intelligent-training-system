import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExerciseItem from './ExerciseItem';
import exercises from '../../data/exercises';
import config from '../../data/config';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    flexGrow: 1,

  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ALL = 'All';
class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: ALL
    };
  }

  handleChange(newValue) {
    this.setState({
      checked: newValue,
    })
  }

  filterExercises(exercises) {
    const { checked } = this.state;
    if (checked === ALL) {
      return exercises;
    } else {
      return exercises.filter(e => e.type === checked);
    }
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    const filteredExercises = this.filterExercises(exercises);
    return (
      <div className={classes.root}>
        <FormGroup className={classes.formGroup} row>
          {config.types.map(type => {
            const isChecked = type.value === checked ? true : false;
            return (
              <FormControlLabel key={type.value}
                control={
                  <Checkbox
                    disabled={type.disabled}
                    checked={isChecked}
                    onChange={() => this.handleChange(type.value)}
                    value={type.value}
                  />
                }
                label={type.value}
              />
            );
          })}
        </FormGroup>
        <Grid container>
          {filteredExercises.map(exercise => {
            return <ExerciseItem onChangeBodyCondition={this.props.onChangeBodyCondition} data={exercise} key={exercise.id} />
          })}
        </Grid>
      </div>
    );
  }
}

ExerciseList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseList);
