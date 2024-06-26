import React, { useState } from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  Typography,
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import clsx from "clsx";
import StatusIcon from "./StatusIcon";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  contactListItem: {
    borderBottom: "1px solid " + theme.palette.divider,
    "&.active": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  unreadBadge: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

function ContactListItem(props) {
  const classes = useStyles(props);
  const [moreMenuEl, setMoreMenuEl] = useState(null);

  function handleMoreMenuClick(event) {
    setMoreMenuEl(event.currentTarget);
  }

  function handleMoreMenuClose(event) {
    setMoreMenuEl(null);
  }
  return (
    <ListItem
      button
      className={clsx(classes.contactListItem, "px-16 py-12 min-h-92", {
        active: props.selectedContactId === props.contact.id,
      })}
      onClick={() => props.onContactClick(props.contact.id)}
    >
      <div className="mr-5">
        <IconButton
          aria-owns={moreMenuEl ? "chats-more-menu" : null}
          aria-haspopup="true"
          onClick={handleMoreMenuClick}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          id="chats-more-menu"
          anchorEl={moreMenuEl}
          open={Boolean(moreMenuEl)}
          onClose={handleMoreMenuClose}
        >
          <MenuItem onClick={handleMoreMenuClose}>Add Friend</MenuItem>
          <MenuItem onClick={handleMoreMenuClose}>Block User</MenuItem>
        </Menu>
      </div>
      <div className="relative mr-16">
        <div className="absolute right-0 bottom-0 -m-4 z-10">
          <StatusIcon status={props.contact.status} />
        </div>

        <Avatar src={props.contact.avatar} alt={props.contact.name}>
          {!props.contact.avatar || props.contact.avatar === ""
            ? props.contact.name[0]
            : ""}
        </Avatar>
      </div>

      <ListItemText
        classes={{
          root: "min-w-px",
          secondary: "truncate",
        }}
        primary={props.contact.name}
        secondary={props.contact.mood}
      />

      {props.contact.chatId && (
        <div className="flex flex-col justify-center items-end">
          {props.contact.lastMessageTime && (
            <Typography className="whitespace-no-wrap mb-8">
              {moment(props.contact.lastMessageTime).format("ll")}
            </Typography>
          )}
          {props.contact.unread && (
            <div
              className={clsx(
                classes.unreadBadge,
                "flex items-center justify-center min-w-24 h-24 rounded-full text-14 text-center"
              )}
            >
              {props.contact.unread}
            </div>
          )}
        </div>
      )}
    </ListItem>
  );
}

export default ContactListItem;
