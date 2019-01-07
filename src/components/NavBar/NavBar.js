import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import historicalInformation from '../../data/historicalInformation';

const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: '12px',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        cursor: 'pointer'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    heartIcon: {
        color: 'red',
    },
    sweatIcon: {
        color: 'pink',
    },
    iconBlock: {
        margin: '0px 10px',
        fontWeight: 'bold',
    },
    badge: {
        marginLeft: '15px',
    }
});

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorProfileEl: null,
            anchorHistoryEl: null,
        };
    }

    handleProfileMenuOpen = event => {
        this.setState({ anchorProfileEl: event.currentTarget });
    };

    handleProfileMenuClose = () => {
        this.setState({ anchorProfileEl: null });
    };

    handleHistoryMenuOpen = event => {
        this.setState({ anchorHistoryEl: event.currentTarget });
    };

    handleHistoryMenuClose = () => {
        this.setState({ anchorHistoryEl: null });
    };

    getTrainingAdviceColor(intelligentTrainer) {
        if (intelligentTrainer.trainingAdvice === 'start training') {
            return '#9500ae';
        } else if (intelligentTrainer.trainingAdvice === 'continue') {
            return '#76ff03';
        }

        return '#9500ae';
    }

    render() {
        const { anchorProfileEl, anchorHistoryEl } = this.state;
        const { classes, body, intelligentTrainer } = this.props;
        const isProfileOpen = Boolean(anchorProfileEl);
        const isHistoryOpen = Boolean(anchorHistoryEl);
        // const trainingAdviceColor = this.getTrainingAdviceColor(body);
        const trainingAdviceStyle = {
            color: this.getTrainingAdviceColor(intelligentTrainer),
        }
        const renderProfileMenu = (
            <Menu
                anchorEl={anchorProfileEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isProfileOpen}
                onClose={this.handleProfileMenuClose}
            >
                <MenuItem onClick={() => { this.props.history.push(`/`) }}>Update information</MenuItem>
            </Menu>
        );

        const renderHistoryMenu = (
            <Menu
                anchorEl={anchorHistoryEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isHistoryOpen}
                onClose={this.handleHistoryMenuClose}
            >
                <MenuItem onClick={() => { this.props.history.push(`/exercises/history/data`) }}>
                        Historical information
                    <Badge className={classes.badge} badgeContent={historicalInformation.length} color="secondary">
                    </Badge>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography onClick={() => { this.props.history.push(`/exercises`) }}
                            className={classes.title} variant="h6" color="inherit" noWrap>
                            Intelligent Training System
            </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Tooltip title={"Training advice"} placement="bottom">
                                <IconButton style={trainingAdviceStyle}>
                                    <DirectionsRunIcon />
                                    <b>{intelligentTrainer.trainingAdvice}</b>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Water advice"} placement="bottom">
                                <IconButton style={{color: '#1c54b2'}}>
                                    <WhatshotIcon />
                                    <b>{intelligentTrainer.waterAdvice}</b>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Current heart rate"} placement="bottom">
                                <IconButton color="secondary">
                                    <FavoriteIcon />
                                    {body.heartRate}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Current sweat rate"} placement="bottom">
                                <IconButton style={{color: '#1c54b2'}}>
                                    <WhatshotIcon />
                                    {body.sweatRate}
                                </IconButton>
                            </Tooltip>
                            <IconButton aria-owns={isHistoryOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleHistoryMenuOpen}
                                color="inherit">
                                <Badge badgeContent={historicalInformation.length} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-owns={isProfileOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderProfileMenu}
                {renderHistoryMenu}
            </div >
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavBar));
