import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { updateDocumentById } from "../../../utils/firebaseDB";
import { useState } from "react";
import { ContactInformation } from "../../Contact/components/ContactInformation";
// import { getDocumentById } from "../../../utils/firebaseDB";
import Modal from "@mui/material/Modal";
import { ModalChanges } from "../../../component/ConfirmationModal";
// const contactInfo = await getDocumentById("Contact info", "Information");

const contactAdminTitles = {
  fontSize: "x-large",
  fontWeight: "600",
  margin: "15px auto",
};

const contactAdminSubTitles = {
  fontSize: "large",
  fontWeight: "600",
  margin: "5px 0 0 5px",
};

const contactTitleInput = {
  padding: "0",
  alignItems: "center",
  marginBottom: "10px",
};

const contactInput = {
  width: "90%",
};

const formButtons = {
  height: "50px",
  fontSize: "14px",
  borderRadius: "10px",
  border: "none",
  width: {
    xs: "130px",
    sm: "170px",
  },
  "&:hover": {
    border: "none",
    background: "var(--secondary-color)",
    color: "black",
  },
  "&:focus": {
    outline: "none",
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "78vw",
  height: "68vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const inputSeparation = {
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row",
  },
  gap: {
    xs: "0px",
    sm: "10px",
  },
  marginBottom: {
    xs: "20px",
    sm: "0",
  },
};

export function ContactAdmin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [handleDialog, setHandleDialog] = useState(false);
  const [modifiedData, setModifiedData] = useState({});
  const [lessonSchedule, setLessonSchedule] = useState([
    "9:00 am - 12:00 mdZZZ",
    "1:00 pm -  4:00 pmZZZ",
    "6:30 pm - 9:30 pmZZZ",
  ]);
  const [scheduleData, setScheduleData] = useState({
    schedule2: {
      day: "Sábado",
      time: "8:00 am - 4:00 pm",
    },
    schedule1: {
      day: "Lunes a viernes",
      time: "8:00 am - 11:00 am",
    },
    schedule3: {
      day: "Domingo",
      time: "8:00 am - 11:00 am",
    },
  });
  const [location, setLocation] = useState(
    "Ciudad Quesada, San Carlos 21001 Quesada, Alajuela Province, Costa RicaXXX"
  );
  const [iFrame, setIFrame] = useState(
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.1804701166134!2d-84.43418486067681!3d10.32743794933481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa065efd174d025%3A0xf6f936b3b4125b50!2sGNails!5e0!3m2!1ses!2scr!4v1723333807197!5m2!1ses!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>XXX'
  );
  const [mail, setMail] = useState("faporras05@hotmail.comXXX");
  const [phone, setPhone] = useState("+50684527729xxx");
  const [locationLink, setLocationLink] = useState(
    "https://maps.app.goo.gl/yR86LiyPSqLxETfr9XXX"
  );
  const [socialMedia, setSocialMedia] = useState({
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.comsaaaXXX",
  });

  // const [lessonSchedule, setLessonSchedule] = useState(contactInfo.lessonSchedule);
  // const { location, iFrame, mail, phone, schedule, locationLink, socialMedia } = contactInfo;
  // function updateFields(key, value) {
  //   switch (key) {
  //     case "location":
  //       setLocation(value);
  //       break;
  //     case "iFrame":
  //       setIFrame(value);
  //       break;
  //     case "mail":
  //       setIFrame(value);
  //       break;
  //     case "phone":
  //       setIFrame(value);
  //       break;
  //     case "locationLink":
  //       setIFrame(value);
  //       break;
  //     case "socialMedia":
  //       setIFrame(value);
  //       break;
  //     case "setLessonSchedule":
  //       setIFrame(value);
  //       break;
  //       case "setLessonSchedule":
  //         setIFrame(value);
  //         break;
  //     // Add other cases for mail, phone, socialMedia, etc.
  //   }
  // }

  function onChangeFields(key, value) {
    // updateFields(key, value);
    const newModifiedData = { ...modifiedData, [key]: value };
    setModifiedData(newModifiedData);
  }

  function handleSavedChanges() {
    updateDocumentById("Contact info", "Information", modifiedData);
  }
  return (
    <Box
      id="contact-admin"
      sx={{
        maxWidth: "90%",
        margin: "60px auto 0 auto",
        paddingBottom: "10px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          color: "var(--admin-title-color)",
          fontSize: {
            xs: "30px",
            sm: "40px",
            md: "50px",
            lg: "60px",
          },
        }}
      >
        Contacto
      </Typography>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <ContactInformation
              location={location}
              iFrame={iFrame}
              mail={mail}
              phone={phone}
              schedule={scheduleData}
              lessonSchedule={lessonSchedule}
              locationLink={locationLink}
              socialMedia={socialMedia}
            />
          </Box>
        </Modal>
        <ModalChanges
          agreedFuntion={handleSavedChanges}
          state={[handleDialog, setHandleDialog]}
          modalTitle={"Seguro de guardar los cambios?"}
        />
        <Box
          className="form-container"
          sx={{
            border: "1px solid black",
            boxShadow: "5px 5px 5px 0px gray",
            borderRadius: "10px",
            marginTop: "30px",
            padding: "30px",
          }}
        >
          <Box
            className="form-info-container"
            sx={{
              gridTemplateColumns: "50% 50%",
              display: {
                sm: "flex",
                md: "grid",
              },
              flexDirection: {
                sm: "column",
                md: "row",
              },
            }}
          >
            <Box className="left-contact-container">
              <Box className="contact-info-container">
                <Typography sx={contactAdminTitles}>Contacto</Typography>
                <Box>
                  <Box sx={contactTitleInput}>
                    <Typography sx={contactAdminSubTitles}>Telefono</Typography>
                    <TextField
                      sx={contactInput}
                      id="outlined-required"
                      defaultValue={phone}
                      name="phone"
                      onChange={(e) => {
                        setPhone(e.target.value);
                        onChangeFields(e.target.name, e.target.value);
                      }}
                    />
                  </Box>
                  <Box sx={contactTitleInput}>
                    <Typography sx={contactAdminSubTitles}>Correo</Typography>
                    <TextField
                      sx={contactInput}
                      id="outlined-required"
                      defaultValue={mail}
                      name="mail"
                      onChange={(e) => {
                        setMail(e.target.value);
                        onChangeFields(e.target.name, e.target.value);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ ...contactAdminTitles, marginBottom: "5px" }}>
                  Ubicación
                </Typography>
                <Box sx={contactInput}>
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-multiline-static"
                    multiline
                    defaultValue={location}
                    rows={5}
                    name="location"
                    onChange={(e) => {
                      setLocation(e.target.value);
                      onChangeFields(e.target.name, e.target.value);
                    }}
                  />
                  <Typography
                    sx={{ color: "gray", opacity: "85%", textAlign: "end" }}
                  >
                    Max 100 caracteres
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={contactAdminTitles}>Redes sociales</Typography>
                <Box>
                  <Typography sx={contactAdminSubTitles}>Facebook</Typography>
                  <TextField
                    sx={contactInput}
                    id="outlined-required"
                    defaultValue={socialMedia["facebook"]}
                    name="socialMedia"
                    onChange={(e) => {
                      setSocialMedia({
                        ...socialMedia,
                        ["facebook"]: e.target.value,
                      });
                      onChangeFields(e.target.name, {
                        ...socialMedia,
                        ["facebook"]: e.target.value,
                      });
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={contactAdminSubTitles}>Instagram</Typography>
                  <TextField
                    sx={contactInput}
                    id="outlined-required"
                    defaultValue={socialMedia["instagram"]}
                    name="socialMedia"
                    onChange={(e) => {
                      setSocialMedia({
                        ...socialMedia,
                        ["instagram"]: e.target.value,
                      });
                      onChangeFields(e.target.name, {
                        ...socialMedia,
                        ["instagram"]: e.target.value,
                      });
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ ...contactAdminTitles, marginBottom: "5px" }}>
                  Horario de consulta
                </Typography>
                <Box sx={inputSeparation}>
                  <TextField
                    id="outlined-required"
                    name="schedule"
                    onChange={(e) => {
                      const newScheduleData = scheduleData;
                      newScheduleData["schedule1"].day = e.target.value;
                      setScheduleData(newScheduleData);
                      onChangeFields(e.target.name, newScheduleData);
                    }}
                    defaultValue={scheduleData["schedule1"].day}
                  />
                  <TextField
                    id="outlined-required"
                    name="schedule"
                    onChange={(e) => {
                      const newScheduleData = scheduleData;
                      newScheduleData["schedule1"].time = e.target.value;
                      setScheduleData(newScheduleData);
                      onChangeFields(e.target.name, newScheduleData);
                    }}
                    defaultValue={scheduleData["schedule1"].time}
                  />
                </Box>
                <Box sx={inputSeparation}>
                  <TextField
                    id="outlined-required"
                    name="schedule"
                    onChange={(e) => {
                      const newScheduleData = scheduleData;
                      newScheduleData["schedule2"].day = e.target.value;
                      setScheduleData(newScheduleData);
                      onChangeFields(e.target.name, newScheduleData);
                    }}
                    defaultValue={scheduleData["schedule2"].day}
                  />
                  <TextField
                    id="outlined-required"
                    name="schedule"
                    onChange={(e) => {
                      const newScheduleData = scheduleData;
                      newScheduleData["schedule2"].time = e.target.value;
                      setScheduleData(newScheduleData);
                      onChangeFields(e.target.name, newScheduleData);
                    }}
                    defaultValue={scheduleData["schedule2"].time}
                  />
                </Box>
                <Box sx={inputSeparation}>
                  <TextField
                    id="outlined-required"
                    name="schedule"
                    onChange={(e) => {
                      const newScheduleData = scheduleData;
                      newScheduleData["schedule3"].day = e.target.value;
                      setScheduleData(newScheduleData);
                      onChangeFields(e.target.name, newScheduleData);
                    }}
                    defaultValue={scheduleData["schedule3"].day}
                  />
                  <TextField
                    id="outlined-required"
                    name="schedule"
                    onChange={(e) => {
                      const newScheduleData = scheduleData;
                      newScheduleData["schedule3"].time = e.target.value;
                      setScheduleData(newScheduleData);
                      onChangeFields(e.target.name, newScheduleData);
                    }}
                    defaultValue={scheduleData["schedule3"].time}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box>
                <Box>
                  <Typography sx={contactAdminTitles}>Mapa</Typography>
                  <Box>
                    <Typography sx={contactAdminSubTitles}>Iframe</Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-multiline-static"
                      multiline
                      defaultValue={iFrame}
                      rows={11}
                      name="iFrame"
                      onChange={(e) => {
                        setIFrame(e.target.value);
                        onChangeFields(e.target.name, e.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={contactAdminSubTitles}>
                      Ubicacion link:
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-required"
                      defaultValue={locationLink}
                      name="locationLink"
                      onChange={(e) => {
                        setLocationLink(e.target.value);
                        onChangeFields(e.target.name, e.target.value);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ ...contactAdminTitles, marginBottom: "5px" }}>
                  Horario de lecciones
                </Typography>
                <TextField
                  id="outlined-required"
                  defaultValue={lessonSchedule[0]}
                  name="lessonSchedule"
                  onChange={(e) => {
                    const newLessonSchedule = [...lessonSchedule];
                    newLessonSchedule[0] = e.target.value;
                    setLessonSchedule(newLessonSchedule);
                    onChangeFields(e.target.name, newLessonSchedule);
                  }}
                />
                <br />
                <TextField
                  id="outlined-required"
                  defaultValue={lessonSchedule[1]}
                  name="lessonSchedule"
                  onChange={(e) => {
                    const newLessonSchedule = [...lessonSchedule];
                    newLessonSchedule[1] = e.target.value;
                    setLessonSchedule(newLessonSchedule);
                    onChangeFields(e.target.name, newLessonSchedule);
                  }}
                />
                <br />
                <TextField
                  id="outlined-required"
                  defaultValue={lessonSchedule[2]}
                  name="lessonSchedule"
                  onChange={(e) => {
                    const newLessonSchedule = [...lessonSchedule];
                    newLessonSchedule[2] = e.target.value;
                    setLessonSchedule(newLessonSchedule);
                    onChangeFields(e.target.name, newLessonSchedule);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              width: "100%",
              justifyContent: "end",
              marginTop: "15px",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: {
                xs: "end",
              },
            }}
          >
            <Button
              onClick={handleOpen}
              variant="outlined"
              sx={{
                ...formButtons,
                background: "var(--preview-changes-color)",
                color: "white",
              }}
            >
              Prevista
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outlined"
              sx={{
                ...formButtons,
                background: "var(--cancel-changes-color)",
                color: "#444444",
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setHandleDialog(true)}
              variant="outlined"
              sx={{
                ...formButtons,
                background: "var(--save-changes-color)",
                color: "white",
              }}
            >
              Guardar cambios
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
