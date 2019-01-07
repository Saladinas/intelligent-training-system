import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoodCircle from '@material-ui/icons/Mood';
import Paper from '@material-ui/core/Paper';

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
    tableCell: {
        textAlign: 'center',
    },
    mood: {
        color: '#76ff03',
    },
};

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class MonitoringTable extends Component {

    filterBodyConditionsByExerciseType(exercise, bodyConditions) {
        if (exercise.type === 'Strength') {
            return bodyConditions.strength;
        };
        if (exercise.type === 'Cardio') {
            return bodyConditions.cardio;
        };
    }

    render() {
        const { value, classes, bodyConditions, normValues, userInfo, exercise } = this.props;
        const filteredBodyConditionsByExerciseType = this.filterBodyConditionsByExerciseType(exercise, bodyConditions);
        const filteredBodyConditionsByDuration = filteredBodyConditionsByExerciseType.filter(x => x.duration <= Math.floor(value, 2)).reverse()
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell className={classes.tableCell}>Duration (s)</CustomTableCell>
                            <CustomTableCell className={classes.tableCell}>Heart rate</CustomTableCell>
                            <CustomTableCell className={classes.tableCell}>Norm heart rate</CustomTableCell>
                            <CustomTableCell className={classes.tableCell}>Maximum heart rate</CustomTableCell>
                            <CustomTableCell className={classes.tableCell}>Heart rate status</CustomTableCell>
                            <CustomTableCell className={classes.tableCell}>Sweat rate</CustomTableCell>
                            <CustomTableCell className={classes.tableCell}>Sweating (liters/hour)</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBodyConditionsByDuration.map(condition => {
                            return (
                                <TableRow className={classes.row} key={condition.duration}>
                                    <CustomTableCell className={classes.tableCell}>{condition.duration}</CustomTableCell>
                                    <CustomTableCell className={classes.tableCell}>{condition.heartRate}</CustomTableCell>
                                    <CustomTableCell className={classes.tableCell}>[{normValues.normLowest}-{normValues.normHighest}]</CustomTableCell>
                                    <CustomTableCell className={classes.tableCell}>{normValues.maximum}</CustomTableCell>
                                    <CustomTableCell className={classes.tableCell}><MoodCircle className={classes.mood}/></CustomTableCell>
                                    <CustomTableCell className={classes.tableCell}>{condition.sweatRate}</CustomTableCell>
                                    <CustomTableCell className={classes.tableCell}>{condition.sweatRate * parseInt(userInfo.height) / 100}</CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

MonitoringTable.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
};

export default withStyles(styles)(MonitoringTable);