import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExerciseSlider from '../Slider/ExerciseSlider';
import MonitoringTable from '../Monitoring/MonitoringTable';
import Button from '@material-ui/core/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import bodyConditions from '../../data/bodyConditions';
import config from '../../data/config';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    type: {
        fontSize: 24,
        fontStyle: 'italic',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

let interval = null;
const MIN = 0;
const MAX = 100;
class Exercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            sliderValue: MIN,
            exerciseSecond: MIN,
        };
    }

    receive = (exerciseSecond, exerciseType) => {
        if (exerciseType === 'Strength') {
            const currentBodyCondition = bodyConditions.strength.filter(s => s.duration === exerciseSecond)[0];
            return currentBodyCondition;
        }
        if (exerciseType === 'Cardio') {
            const currentBodyCondition = bodyConditions.cardio.filter(s => s.duration === exerciseSecond)[0];
            return currentBodyCondition;
        }
    }

    monitor(exerciseSecond) {
        const exerciseInformation = this.props.location.state.data;
        if (exerciseInformation.type === 'Strength') {
            // Monitor Strength type exercises every 10 seconds
            if (exerciseSecond % config.monitoringTimes.strength === 0) {
                const currentBodyCondition = this.receive(exerciseSecond, exerciseInformation.type);
                this.props.onChangeBodyCondition(currentBodyCondition);
            }
        }
        if (exerciseInformation.type === 'Cardio') {
            // Monitor Strength type exercises every 30 seconds
            if (exerciseSecond % config.monitoringTimes.cardio === 0) {
                const currentBodyCondition = this.receive(exerciseSecond, exerciseInformation.type);
                this.props.onChangeBodyCondition(currentBodyCondition);
            }
        }
    }

    start = () => {
        const { sliderValue } = this.state;
        const exerciseInformation = this.props.location.state.data;
        const currentSliderValue = sliderValue + 1;
        const currentExerciseSecond = exerciseInformation.type === 'Strength' ? currentSliderValue : currentSliderValue * 3;
        if (Math.floor(currentSliderValue, 2) === MAX) {
            this.props.updateIntelligentTrainer('trainingAdvice', 'Dead lift');
            this.props.updateIntelligentTrainer('waterAdvice', 'Drink some water');
            clearInterval(interval);
            interval = null;
            this.setState(({
                sliderValue: currentSliderValue,
                exerciseSecond: currentExerciseSecond,
                active: false,
            }), () => this.monitor(currentExerciseSecond))
        } else {
            this.props.updateIntelligentTrainer('trainingAdvice', 'continue');
            this.setState(({
                sliderValue: currentSliderValue,
                exerciseSecond: currentExerciseSecond,
                active: true,
            }), () => this.monitor(currentExerciseSecond));
        }
    }

    updatesSlider = (event, currentSliderValue) => {
        const exerciseInformation = this.props.location.state.data;
        const currentExerciseSecond = exerciseInformation.type === 'Strength' ? currentSliderValue : currentSliderValue * 3;
        this.props.updateIntelligentTrainer('trainingAdvice', 'continue');
        this.setState(({
            sliderValue: Math.floor(currentSliderValue, 2),
            exerciseSecond: Math.floor(currentExerciseSecond, 2),
        }), () => this.monitor(currentSliderValue));
    };

    changeMode = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
            this.setState({
                active: false,
            });
        } else {
            interval = setInterval(this.start, 100);
        }
    }

    onDragStart = () => {
        if (interval) {
            this.changeMode();
        }
    }

    render() {
        const { classes, normValuesByAge, userInfo } = this.props;
        const { active, exerciseSecond, sliderValue } = this.state;
        const exerciseInformation = this.props.location.state.data;
        return (
            <div>
                <div className={classes.line}>
                    <span className={classes.name}>{exerciseInformation.name}</span>
                    <span className={classes.type}> ({exerciseInformation.type})</span>
                </div>
                <Button disabled={exerciseSecond === MAX} onClick={() => this.changeMode()} variant="contained" color="primary" className={classes.button}>
                    {active ? "Stop" : "Start"}
                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    {active ? <PauseCircleFilledIcon className={classes.rightIcon} /> : <PlayCircleFilledIcon className={classes.rightIcon} />}
                </Button>
                <ExerciseSlider onDragStart={this.onDragStart} onChange={this.updatesSlider} valueToDisplay={exerciseSecond} value={sliderValue} active={active} />
                <MonitoringTable exercise={exerciseInformation} userInfo={userInfo} normValuesByAge={normValuesByAge} bodyConditions={bodyConditions} value={exerciseSecond} />
            </div>
        );
    }
}

Exercise.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Exercise));