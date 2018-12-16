import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    maxWidth: '90%',
    margin: 'auto',
    padding: 0,
    // overflowX: 'hidden',
    // margin: '20px'
  },
  slider: {
    padding: '22px 0px',
    overflowX: 'hidden',
  },
};

class ExerciseSlider extends Component {

  render() {
    const { classes, value, valueToDisplay } = this.props;
    return (
      <div className={classes.root}>
        <Typography id="label">{valueToDisplay} (s)</Typography>
        <Slider
          onDragStart={this.props.onDragStart}
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

ExerciseSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseSlider);