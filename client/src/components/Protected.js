import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import requireAuth from './requireAuth';
import Drawer from '../components/Drawer';

const styles = {
    textCenter: {
        textAlign: 'center',
    },
};

class Protected extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Drawer />
                <div>
                    <h3 className={classes.textCenter}>You are signed in. This is a protected route!</h3>
                </div>
            </div>
        );
    }
}

Protected.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default requireAuth(withStyles(styles)(Protected));