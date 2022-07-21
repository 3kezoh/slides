import React, { useCallback, useState, useContext, useEffect } from "react";
import "../styles/workspace.css";

import { uid } from "uid";
import { ref, set, onValue } from "firebase/database";
import { db } from "../sources/services/firebase-config";
import { UserContext } from "../sources/context/UserContext";

import {
  Button,
  CardActionArea,
  CardActions,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Fab,
  Box,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Workspace = () => {
  //Room creation modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roomName, setRoomName] = useState("");

  const { currentUser } = useContext(UserContext);

  //On submit of room creation form
  const handleForm = useCallback(
    (e) => {
      e.preventDefault();

      console.log("b");
      const roomUuid = uid();
      set(ref(db, `room/${roomUuid}`), {
        users: [currentUser.uid],
        infos: {
          uuid: roomUuid,
          name: roomName,
        },
      });

      handleClose();
    },
    [roomName]
  );

  // Get all rooms
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const roomRef = ref(db, `room`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRooms(data);
    });
  }, [currentUser.uid]);

  //Handle delete room
  const handleDelete = useCallback((roomUuid) => {
    set(ref(db, `room/${roomUuid}`), null);
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleForm}>
          <Box sx={modalStyle}>
            <TextField
              fullWidth
              value={roomName}
              variant="outlined"
              onInput={(e) => setRoomName(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ marginTop: 1 }}
              endIcon={<SendIcon />}
              type="submit"
            >
              Créer la room
            </Button>
          </Box>
        </form>
      </Modal>
      <Typography variant="h2" className="title" sx={{paddingTop: 5}}>
        Choisissez votre room
      </Typography>
      <Fab
        variant="extended"
        sx={{ fontSize: 15, marginTop: 4 }}
        className="add-room"
        onClick={handleOpen}
      >
        <AddIcon sx={{ mr: 1, fontSize: 40 }} />
        Créer une room
      </Fab>
      <div className="rooms">
        {rooms &&
          Object.values(rooms).map(({ infos: { name, uuid } }) => (
            <Card sx={{ maxWidth: 500 }} className="card-rooms">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random/500x200"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleDelete(uuid)}
                >
                  Supprimer
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Workspace;
