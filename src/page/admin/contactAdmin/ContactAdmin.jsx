import { Box, TextField, Typography } from "@mui/material";
import { updateDocumentById } from "../../../utils/firebaseDB";
import { useState } from "react";
import { ContactInformation } from "../../Contact/components/ContactInformation";
import { getDocumentById } from "../../../utils/firebaseDB";
import { ConfirmationDialog } from "../../../component/ConfirmationDialog";
import { Toaster } from "sonner";
import { promiseToast } from "../../../utils/toast";
import ModalContainer from "../../../component/ModalContainer";
import { AdminFormBtn } from "../../../component/AdminFormBtn";

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

const contactInfo = await getDocumentById("Contact info", "Information");
function ContactAdmin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [handleDialog, setHandleDialog] = useState(false);
  const [modifiedData, setModifiedData] = useState({});
  const [lessonSchedule, setLessonSchedule] = useState(
    contactInfo.lessonSchedule
  );
  const [scheduleData, setScheduleData] = useState(contactInfo.schedule);
  const [location, setLocation] = useState(contactInfo.location);
  const [iFrame, setIFrame] = useState(contactInfo.iFrame);
  const [mail, setMail] = useState(contactInfo.mail);
  const [phone, setPhone] = useState(contactInfo.phone);
  const [locationLink, setLocationLink] = useState(contactInfo.locationLink);
  const [socialMedia, setSocialMedia] = useState(contactInfo.socialMedia);

  function onChangeFields(key, value) {
    const newModifiedData = { ...modifiedData, [key]: value };
    setModifiedData(newModifiedData);
  }

  function handleSavedChanges() {
    promiseToast(
      updateDocumentById("Contact info", "Information", modifiedData),
      "Cambios guardado",
      "Error"
    );
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
        <ModalContainer open={open} handleClose={handleClose}>
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
        </ModalContainer>

        <ConfirmationDialog
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
                    inputProps={{ maxLength: 100 }}
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
          <Toaster richColors />
          <AdminFormBtn
            handleOpenPreview={handleOpen}
            handleSaveChanges={setHandleDialog}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ContactAdmin;