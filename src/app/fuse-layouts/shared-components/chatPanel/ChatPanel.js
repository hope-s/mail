import React, {useCallback, useEffect} from 'react';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import keycode from 'keycode';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import ContactList from './ContactList';
import Chat from './Chat';

const useStyles = makeStyles(theme => ({
    root : {
        width                         : 70,
        maxWidth                      : 70,
        minWidth                      : 70,
        [theme.breakpoints.down('md')]: {
            width   : 0,
            maxWidth: 0,
            minWidth: 0
        }
    },
    panel: {
        position                      : 'absolute',
        width                         : 360,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        right                         : 0,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(290px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition                    : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened'                    : {
            transform: 'translateX(0)'
        }
    }
}));

function ChatPanel(props)
{
    const dispatch = useDispatch();
    const contacts = useSelector(({chatPanel}) => chatPanel.contacts.entities);
    const selectedContactId = useSelector(({chatPanel}) => chatPanel.contacts.selectedContactId);
    const state = useSelector(({chatPanel}) => chatPanel.state);

    const classes = useStyles(props);
    const selectedContact = contacts.find(_contact => _contact.id === selectedContactId);

    const handleDocumentKeyDown = useCallback(event => {
        if ( keycode(event) === 'esc' )
        {
            dispatch(Actions.closeChatPanel());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(Actions.getUserData());
        dispatch(Actions.getContacts());
        return (() => {
            document.removeEventListener('keydown', handleDocumentKeyDown);
        });
    }, [dispatch, handleDocumentKeyDown]);

    useEffect(() => {
        if ( state )
        {
            document.addEventListener("keydown", handleDocumentKeyDown);
        }
        else
        {
            document.removeEventListener('keydown', handleDocumentKeyDown);
        }

    }, [handleDocumentKeyDown, state]);

    return (
        <></>
    );
}

export default withReducer('chatPanel', reducer)(ChatPanel);
