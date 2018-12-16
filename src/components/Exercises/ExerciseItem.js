import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeadLift from '../../data/images/DeadLift.jpg';
import { withRouter } from 'react-router-dom';

const styles = {
    card: {
        maxWidth: 345,
        margin: '18px'
    },
    media: {
        height: 200,
    },
};

class ExerciseItem extends Component {
    render() {
        const { data, classes } = this.props;
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={DeadLift}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.name} <i>({data.type})</i>
                            </Typography>
                            <Typography component="p">
                                {data.description} by using <b>{data.weight}</b> kg
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary"
                            onClick={() => {
                                this.props.history.push({
                                    pathname: `exercises/${data.name.replace(/\s+/, "")}`,
                                    state: { data }
                                })
                            }}>
                            Connect
            </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

ExerciseItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ExerciseItem));