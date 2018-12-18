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
import BenchPress from '../../data/images/BenchPress.jpg';
import PushUp from '../../data/images/PushUp.jpg';
import Squat from '../../data/images/Squat.jpg';
import ShoulderShrug from '../../data/images/ShoulderShrug.jpg';
import LegCurl from '../../data/images/LegCurl.jpg';
import ChestFly from '../../data/images/ChestFly.jpg';
import BicepsCurl from '../../data/images/BicepsCurl.jpg';
import JumpingRope from '../../data/images/JumpingRope.jpg';
import { withRouter } from 'react-router-dom';

const styles = {
    card: {
        maxWidth: 345,
        margin: '18px'
    },
    media: {
        height: 200,
    },
    info: {
        fontWeight: 'bold',
        fontSize: '16px',
    },
    description: {
        marginTop: '5px',
    },
};

class ExerciseItem extends Component {
    getImage(imadeKey) {
        if (imadeKey === 'DeadLift') {
            return DeadLift;
        }
        if (imadeKey === 'BenchPress') {
            return BenchPress;
        }
        if (imadeKey === 'PushUp') {
            return PushUp;
        }
        if (imadeKey === 'Squat') {
            return Squat;
        }
        if (imadeKey === 'ShoulderShrug') {
            return ShoulderShrug;
        }
        if (imadeKey === 'LegCurl') {
            return LegCurl;
        }
        if (imadeKey === 'ChestFly') {
            return ChestFly;
        }
        if (imadeKey === 'BicepsCurl') {
            return BicepsCurl;
        }
        if (imadeKey === 'JumpingRope') {
            return JumpingRope;
        }
    }

    render() {
        const { data, classes } = this.props;
        const image = this.getImage(data.image);
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={image}
                            className={classes.media}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.name} <i>({data.type})</i>
                            </Typography>
                            <Typography component="">
                                <span className={classes.info}>{data.times ? `By doing ${data.times} times ` : null}
                                    {data.weight ? `with ${data.weight} kg` : null}</span>
                            </Typography>
                            <Typography className={classes.description} component="i">
                                {data.description}
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