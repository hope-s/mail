import { FuseScrollbars, FuseAnimateGroup, FuseUtils } from "@fuse";
import {
  AppBar,
  Avatar,
  ListItemIcon,
  List,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  Icon,
  IconButton,
  Input,
  Paper,
  Modal,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import StatusIcon from "./StatusIcon";
import ContactListItem from "./ContactListItem";
import Banner from "./Banner";
import Form from "./Form";
import { useHistory } from "react-router-dom";

const statusArr = [
  {
    title: "Online",
    value: "online",
  },
  {
    title: "Away",
    value: "away",
  },
  {
    title: "Do not disturb",
    value: "do-not-disturb",
  },
  {
    title: "Offline",
    value: "offline",
  },
];

function ChatsSidebar(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
  const user = useSelector(({ chatApp }) => chatApp.user);
  let history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [statusMenuEl, setStatusMenuEl] = useState(null);
  const [moreMenuEl, setMoreMenuEl] = useState(null);

  function handleMoreMenuClick(event) {
    setMoreMenuEl(event.currentTarget);
  }

  function handleMoreMenuClose(event) {
    setMoreMenuEl(null);
  }

  const handleLogOutCLicked = (event) => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  function handleStatusMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setStatusMenuEl(event.currentTarget);
  }

  function handleStatusSelect(event, status) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      Actions.updateUserData({
        ...user,
        status,
      })
    );
    setStatusMenuEl(null);
  }

  function handleStatusClose(event) {
    event.preventDefault();
    event.stopPropagation();
    setStatusMenuEl(null);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const [groupModalOpen, setGroupOpen] = useState(false);
  const [channelModalOpen, setChannelOpen] = useState(false);

  const handleGroupModalOpen = () => {
    setGroupOpen(true);
  };

  const handleGroupModalClose = () => {
    setGroupOpen(false);
  };
  const handleChannelModalOpen = () => {
    setChannelOpen(true);
  };

  const handleChannelModalClose = () => {
    setChannelOpen(false);
  };

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar className="flex justify-between items-center px-16 pr-4">
          {user && (
            <div
              className="relative w-40 h-40 p-0 cursor-pointer"
              onClick={() => dispatch(Actions.openUserSidebar())}
            >
              <Avatar src={user.avatar} alt={user.name} className="w-40 h-40">
                {!user.avatar || user.avatar === "" ? user.name[0] : ""}
              </Avatar>

              <div
                className="absolute right-0 bottom-0 -m-4 z-10 cursor-pointer"
                aria-owns={statusMenuEl ? "switch-menu" : null}
                aria-haspopup="true"
                onClick={handleStatusMenuClick}
              >
                <StatusIcon status={user.status} />
              </div>

              <Menu
                id="status-switch"
                anchorEl={statusMenuEl}
                open={Boolean(statusMenuEl)}
                onClose={handleStatusClose}
              >
                {statusArr.map((status) => (
                  <MenuItem
                    onClick={(ev) => handleStatusSelect(ev, status.value)}
                    key={status.value}
                  >
                    <ListItemIcon className="min-w-40">
                      <StatusIcon status={status.value} />
                    </ListItemIcon>
                    <ListItemText primary={status.title} />
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          <div>
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
              <MenuItem
                onClick={() => {
                  dispatch(Actions.openUserSidebar());
                  setMoreMenuEl(null);
                }}
              >
                Edit Profile
              </MenuItem>
              <MenuItem>
                <button type="button" onClick={handleChannelModalOpen}>
                  Create Channel
                </button>
                <Modal
                  open={channelModalOpen}
                  onClose={handleChannelModalClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className="flex justify-center items-center"
                >
                  <Form component="Channel"></Form>
                </Modal>
              </MenuItem>
              <MenuItem>
                <button type="button" onClick={handleGroupModalOpen}>
                  Create Group
                </button>
                <Modal
                  open={groupModalOpen}
                  onClose={handleGroupModalClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className="flex justify-center items-center"
                >
                  <Form component="Group"></Form>
                </Modal>
              </MenuItem>
              <MenuItem onClick={handleLogOutCLicked}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {useMemo(
          () => (
            <Toolbar className="px-16">
              <Paper
                className="flex p-4 items-center w-full px-8 py-4 rounded-8"
                elevation={1}
              >
                <Icon className="mr-8" color="action">
                  search
                </Icon>

                <Input
                  placeholder="Search or start new chat"
                  className="flex flex-1"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    "aria-label": "Search",
                  }}
                  onChange={handleSearchText}
                />
              </Paper>
            </Toolbar>
          ),
          [searchText]
        )}
      </AppBar>

      <FuseScrollbars className="overflow-y-auto flex-1">
        <List className="w-full">
          {useMemo(() => {
            function getFilteredArray(arr, searchText) {
              if (searchText.length === 0) {
                return arr;
              }
              return FuseUtils.filterArrayByString(arr, searchText);
            }

            const chatListContacts =
              contacts.length > 0 && user && user.chatList
                ? user.chatList.map((_chat) => ({
                    ..._chat,
                    ...contacts.find(
                      (_contact) => _contact.id === _chat.contactId
                    ),
                  }))
                : [];
            const contactsArr = getFilteredArray([...contacts], searchText);
            const chatListArr = getFilteredArray(
              [...chatListContacts],
              searchText
            );

            return (
              <React.Fragment>
                <FuseAnimateGroup
                  enter={{
                    animation: "transition.expandIn",
                  }}
                  className="flex flex-col flex-shrink-0"
                >
                  <Banner />
                  {chatListArr.length > 0 && (
                    <Typography
                      className="font-300 text-20 px-16 py-24"
                      color="secondary"
                    >
                      Private Chats
                    </Typography>
                  )}

                  {chatListArr.map((contact) => (
                    <ContactListItem
                      key={contact.id}
                      contact={contact}
                      onContactClick={(contactId) => {
                        dispatch(Actions.getChat(contactId));
                        dispatch(Actions.turnBackFromChat(true));
                      }}
                    />
                  ))}

                  {contactsArr.length > 0 && ( // change contacts arr to channels arr
                    <Typography
                      className="font-300 text-20 px-16 py-24"
                      color="secondary"
                    >
                      Channels
                    </Typography>
                  )}

                  {contactsArr.map((contact) => (
                    <ContactListItem
                      key={contact.id}
                      contact={contact}
                      onContactClick={(contactId) => {
                        dispatch(Actions.getChat(contactId));
                        dispatch(Actions.turnBackFromChat(true));
                      }}
                    />
                  ))}
                  {contactsArr.length > 0 && (
                    <Typography
                      className="font-300 text-20 px-16 py-24"
                      color="secondary"
                    >
                      Contacts
                    </Typography>
                  )}

                  {contactsArr.map((contact) => (
                    <ContactListItem
                      key={contact.id}
                      contact={contact}
                      onContactClick={(contactId) =>
                        dispatch(Actions.getChat(contactId))
                      }
                    />
                  ))}

                  {contactsArr.length > 0 && ( // change contacts arr to groups arr
                    <Typography
                      className="font-300 text-20 px-16 py-24"
                      color="secondary"
                    >
                      Groups
                    </Typography>
                  )}

                  {contactsArr.map((contact) => (
                    <ContactListItem
                      key={contact.id}
                      contact={contact}
                      onContactClick={(contactId) =>
                        dispatch(Actions.getChat(contactId))
                      }
                    />
                  ))}
                </FuseAnimateGroup>
              </React.Fragment>
            );
          }, [contacts, user, searchText, dispatch])}
        </List>
      </FuseScrollbars>
    </div>
  );
}

export default ChatsSidebar;
