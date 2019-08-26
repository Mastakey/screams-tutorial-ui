import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        objectFit: 'cover'
    },
    image: {
        minWidth: 200,

    },
    content: {
        padding: 25
    }
}

export class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = this.props;
        //const classes = this.props.classes;
        //const body = this.props.scream.body;
        //..
        //let createdAtMS = createdAt._seconds ? new Date(createdAt._seconds * 1000) : new Date();
        //let date = new Date(createdAtMS).toISOString();
        let relTime = dayjs(createdAt).fromNow();
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} className={classes.image} 
                title="Profile image" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{relTime}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream);
