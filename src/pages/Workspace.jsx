import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { onValue, ref, set, update } from "firebase/database";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { UserContext } from "../context/UserContext";
import { db } from "../services/firebase-config";
import "../styles/workspace.css";

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

function Workspace() {
  const navigate = useNavigate();

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

      const roomUuid = uid();
      set(ref(db, `room/${roomUuid}`), {
        users: { [currentUser.uid]: true },
        infos: {
          uuid: roomUuid,
          name: roomName,
        },
        slide: {
          0: {
            htmlCode: "",
            uuid: uid(),
          },
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
  }, []);

  //Handle join room
  const handleJoin = useCallback(
    (roomUuid) => {
      if (roomUuid) {
        update(ref(db, `room/${roomUuid}/users`), {
          [currentUser.uid]: true,
        });
        navigate(`/room/${roomUuid}`);
      }
    },
    [currentUser.uid]
  );

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
              placeholder="Nom de la room"
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
      <Typography variant="h3" className="title" sx={{ paddingTop: 5 }}>
        Sélectionnez votre room
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
            <Card sx={{ maxWidth: 500 }} className="card-rooms" key={uuid}>
              <CardActionArea onClick={() => handleJoin(uuid)}>
                <CardMedia
                  component="iframe"
                  height="200"
                  image={`preview/room/${uuid}`}
                  className="iframe"
                  align="bottom"
                  frameBorder="0"
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
}

export default Workspace;
