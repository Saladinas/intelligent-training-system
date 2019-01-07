import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoodCircle from '@material-ui/icons/Mood';
import historicalInformation from '../../data/historicalInformation';
import { withRouter } from 'react-router-dom';

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
    table: {
        marginTop: '5px',
        marginBottom: '20px'
    },
    title: {
        fontSize: '20px',
        marginBottom: '10px',
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

class HistoricalData extends Component {

    render() {
        const { classes, normValues, userInfo } = this.props;
        return (
            <div className={classes.root}>
                {historicalInformation.map(historical => {
                    return (
                        <div>
                            <span className={classes.title}>{historical.date} {historical.time} <b>{historical.exercise}</b> (<i>{historical.type}</i>)</span>
                            <Table key={historical.time} className={classes.table}>
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
                                    {historical.values.map(value => {
                                    return (
                                        <TableRow className={classes.row} key={value.duration}>
                                            <CustomTableCell className={classes.tableCell}>{value.duration}</CustomTableCell>
                                            <CustomTableCell className={classes.tableCell}>{value.heartRate}</CustomTableCell>
                                            <CustomTableCell className={classes.tableCell}>[{normValues.normLowest}-{normValues.normHighest}]</CustomTableCell>
                                            <CustomTableCell className={classes.tableCell}>{normValues.maximum}</CustomTableCell>
                                            <CustomTableCell className={classes.tableCell}><MoodCircle className={classes.mood} /></CustomTableCell>
                                            <CustomTableCell className={classes.tableCell}>{value.sweatRate}</CustomTableCell>
                                            <CustomTableCell className={classes.tableCell}>{value.sweatRate * parseInt(userInfo.height) / 100}</CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                                </TableBody>
                            </Table>
                        </div>
                    )
                })}

            </div>
        );
    }
}

HistoricalData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(HistoricalData));