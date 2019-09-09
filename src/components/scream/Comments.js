import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
      },
      invisibleSeparator: {
          border: 'none',
          margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBotton: 20
    },
      profileImage: {
          maxWidth: 200,
          height: 200,
          borderRadius: '50%',
          objectFit: 'cover'
      },
      dialogContent: {
          padding: 20
      },
      expandButton: {
        position: 'absolute',
        left: '90%'
      },
      spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
      },
      commentImage: {
          maxWidth: '100%',
          height: 100,
          objectFit: 'cover',
          borderRadius: '50%'
      },
      commentData: {
          marginLeft: 20
      }
});

class Comments extends Component {
    render(){
        const {comments, classes} = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                } )}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);