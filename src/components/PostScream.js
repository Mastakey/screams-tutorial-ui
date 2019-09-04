import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

//Mui Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { postScream, clearErrors } from '../redux/actions/dataActions';

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
      submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
      },
      progressSpinner: {
        position: 'absolute'
      },
      closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
      }
});


class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
      if(nextProps.UI.errors) {
        this.setState({
          errors: nextProps.UI.errors
        });
      }
      if (!nextProps.UI.errors && !nextProps.UI.loading){
        this.setState({ body: '', open: false, errors: {} });
      }
    }
    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({open: false, errors: {}});
    }
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.postScream({ body: this.state.body });
    }
    render() {
        const {errors} = this.state;
        const { classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a scream">
                    <AddIcon color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                  <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                  </MyButton>
                  <DialogTitle>Post a new scream</DialogTitle>
                  <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                      <TextField 
                        name="body" 
                        type="text" 
                        label="SCREAM!" 
                        multiline rows="3" 
                        placeholder="Scream at your fellow apes" 
                        errors={errors.body ? true: false } 
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth
                      />
                      <Button type="submit" variant="contained" color="primary" 
                        className={classes.submitButton} 
                        disabled={loading}>
                          Submit
                          {loading && (
                            <CircularProgress size={30} className={classes.progressSpinner} />
                          )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));
