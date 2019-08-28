import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';

import { editUserDetails } from '../redux/actions/userActions';

//Mui Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      button: {
        marginTop: 20,
        position: 'relative',
        float: 'right'
      },
});

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };
    handleOpen = () => {
        this.setState({
            open: true
        });
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>
                            Edit your details
                        </DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField name="bio" fullWidth type="text" label="Bio" multiline rows="3" placeholder="A short bio about yourself" className={classes.textField} value={this.state.bio} 
                                onChange={this.handleChange} />
                                <TextField name="website" fullWidth type="text" label="website" placeholder="You website" className={classes.textField} value={this.state.website} 
                                onChange={this.handleChange} />
                                <TextField name="location" fullWidth type="text" label="location" placeholder="Location" className={classes.textField} value={this.state.location} 
                                onChange={this.handleChange} />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
