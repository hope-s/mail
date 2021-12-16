import React from "react";
import {
  FormControl,
  IconButton,
  TextField,
  AppBar,
  Icon,
  Toolbar,
  Typography,
  Avatar,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import { useForm, useDebounce, useUpdateEffect } from "@fuse/hooks";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import EditProfileUseQuery from "../../../../core/services/api/EditProfile.api";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "95%",
    },
  },
  textField: {
    marginTop: "15px",
  },
  doneBtn: {
    width: "48px",
    height: "48px",
    color: "#8774e1",
    position: "absolute",
    right: "45%",
    cursor: "pointer",
  },
}));

function UserSidebar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ chatApp }) => chatApp.user);
  const editUser = EditProfileUseQuery();

  const { form, handleChange } = useForm(user ? { ...user } : false);

  const handleEditProfile = (user) => {
    console.log(user);
  };

  const updateUserData = useDebounce((form) => {
    dispatch(Actions.updateUserData(form));
  }, 500);

  useUpdateEffect(() => {
    updateUserData(form);
  }, [form, updateUserData]);

  if (!form) {
    return null;
  }

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar className="flex justify-between items-center px-16 pr-4">
          <Typography color="inherit" variant="subtitle1">
            User Info
          </Typography>
          <IconButton
            onClick={() => dispatch(Actions.closeUserSidebar())}
            color="inherit"
          >
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
        <Toolbar className="flex flex-col justify-center items-center p-24">
          <Avatar src={user.avatar} alt={user.name} className="w-96 h-96">
            {!user.avatar || user.avatar === "" ? user.name[0] : ""}
          </Avatar>
          <div className={classes.root}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                className="mt-5 bg-purple-dark"
                variant="contained"
                color="secondary"
                component="span"
              >
                Upload
              </Button>
            </label>
          </div>
          <Typography color="inherit" className="mt-16" variant="h6">
            {user.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <FuseScrollbars className="overflow-y-auto flex-1 p-24">
        <form>
          <FormControl
            component="fieldset"
            className="w-full mb-16"
            onSubmit={handleEditProfile}
          >
            <TextField
              label="Mood"
              name="mood"
              className="w-full"
              value={form.mood}
              margin="normal"
              multiline
              onChange={handleChange}
            />
          </FormControl>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              defaultValue="John"
            />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              defaultValue="Doe"
            />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              defaultValue="@JohnDoe"
            />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            />
          </form>
          <button type="submit">
            <CheckCircleIcon
              className={classes.doneBtn}
              onClick={() => {
                dispatch(Actions.closeUserSidebar());
              }}
            />
          </button>
        </form>
      </FuseScrollbars>
    </div>
  );
}

export default UserSidebar;
