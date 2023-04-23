import React, { useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/profile.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import Textcomponent from "../components/Textcomponent";
import "../css/modal.css";
import { useStateValue } from "../redux/Stateprovider";
function Profile() {
  const [persoanlInfo, setPersonalInfo] = useState(false);
  const [{ FirstName, LastName, email }, dispatch] = useStateValue();
  const [passwordModal, setPasswordModal] = useState(false);
  const [firstName, setFirstName] = useState(FirstName);
  const [lastName, setLastName] = useState(LastName);
  const [newEmail, setEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  const handlePersonalInfo = () => {
    setPersonalInfo((prev) => !prev);
  };

  const handlePasswordChange = () => {
    setPasswordModal((prev) => !prev);
  };

  const updateInfo = () => {
    axios
      .post("http://localhost:9000/user/update", {
        email: email,
        newEmail: newEmail,
        firstName: firstName,
        lastName: lastName,
      })
      .then(function (response) {
        dispatch({
          type: "SETUSER",
          item: {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          },
        });
      })
      .then(() => {
        handlePersonalInfo();
      })
      .catch((e) => console.log(e.response.data));
  };

  const updatePassword = () => {
    axios
      .post("http://localhost:9000/user/updatepassword", {
        email: email,
        currentPassword: password,
        newPassword: confirmPassword,
      })
      .then(() => {
        handlePersonalInfo();
        handlePasswordChange();
      })
      .catch((e) => console.log(e.response.data));
  };

  return (
    <>
      <Navbar />
      <IconButton
        className="edit__icon"
        sx={{
          backgroundColor: "rgb(132, 129, 129)",
          color: "white",
          "&:hover": {
            color: "orange",
            backgroundColor: "rgb(234, 234, 234)",
          },
        }}
        onClick={handlePersonalInfo}
      >
        <ModeEditIcon />
      </IconButton>
      <div className="profile">
        <div className="profile__heading">
          <Typography variant="h6">On the Web</Typography>
        </div>
        <div className="links">
          <Textcomponent label="linkedIn" disable={true} />
          <Textcomponent label="Github" disable={true} />
          <Textcomponent label="Twitter" disable={true} />
        </div>

        <div className="professional_info">
          <div className="profile__heading">
            <Typography>Professional Informaltion</Typography>
          </div>
          <div className="professional__content">
            <div className="education">
              <FormControl fullWidth>
                <InputLabel id="education">
                  What's your Higest education
                </InputLabel>
                <Select
                  labelId="education"
                  label="What's your Higest education"
                >
                  <MenuItem value={10}>Primary</MenuItem>
                  <MenuItem value={20}>Secondary</MenuItem>
                  <MenuItem value={30}>Graduation</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="profession">
              <FormControl fullWidth>
                <InputLabel id="profession">
                  What do you do currently
                </InputLabel>
                <Select labelId="education" label="What do you do currently">
                  <MenuItem value={10}>Schooling</MenuItem>
                  <MenuItem value={20}>College Student</MenuItem>
                  <MenuItem value={30}>Job</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="profile__security">
          <Typography>Password and Security</Typography>

          <Button
            sx={{
              backgroundColor: "rgb(255, 166, 49)",
              color: "white",
              width: "20vw",
              marginBlock: "1rem",
              "&:hover": {
                color: "red",
                backgroundColor: "rgb(231, 229, 229)",
              },
            }}
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>
        </div>
      </div>
      <div>
        <Modal
          open={persoanlInfo}
          onClose={handlePersonalInfo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="personalInfo__modal">
            <div className="modal__content">
              <div className="div"></div>
              <div className="modal__img">
                <img src="cs.png" alt="" />
              </div>
              <div className="modal__info">
                <TextField
                  sx={{ width: "30vw", marginBlock: "1rem" }}
                  placeholder={firstName}
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                ></TextField>
                <TextField
                  sx={{ width: "30vw", marginBlock: "1rem" }}
                  placeholder={lastName}
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                ></TextField>
                <TextField
                  sx={{ width: "30vw", marginBlock: "1rem" }}
                  placeholder={newEmail}
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
                <Button
                  sx={{
                    backgroundColor: "rgb(255, 166, 49)",
                    color: "white",
                    width: "10vw",
                    marginBlock: "1rem",
                  }}
                  onClick={updateInfo}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={passwordModal}
          onClose={handlePasswordChange}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="personalInfo__modal">
            <div className="modal__content">
              <div className="modal__img">
                <img src="cs.png" alt="" />
              </div>
              <div className="modal__info">
                <TextField
                  sx={{ width: "30vw", marginBlock: "1rem" }}
                  placeholder={password}
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></TextField>{" "}
                <TextField
                  sx={{ width: "30vw", marginBlock: "1rem" }}
                  placeholder={confirmPassword}
                  label="Confiem Password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                ></TextField>
                <Button
                  sx={{
                    backgroundColor: "rgb(255, 166, 49)",
                    color: "white",
                    width: "10vw",
                  }}
                  onClick={updatePassword}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Profile;
