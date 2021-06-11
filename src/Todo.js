import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ImageIcon,
  ListItemText,
  Modal,
  Button,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import "./Todo.css";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    background: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateTodo = () => {
    // update the todo the new input text

    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am a model</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={updateTodo}>
            Update Todo
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar>
            {/* <Avatar>
            <ImageIcon />
          </Avatar> */}
          </ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="Dummy deadline..."
          />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit me </button>
        <DeleteForeverIcon
          onClick={(e) => db.collection("to dos").doc(props.todo.id).delete()}
        >
          Delete Me
        </DeleteForeverIcon>
      </List>
    </>
    // <div>
    //   <li>{props.text}</li>
    // </div>
  );
};

export default Todo;