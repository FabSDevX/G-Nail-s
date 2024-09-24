import { Box, TextField, Typography } from "@mui/material";
import { updateDocumentById } from "../../../utils/firebaseDB";
import { useEffect, useState } from "react";
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

function ContactAdmin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [handleDialog, setHandleDialog] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    location: "",
    phone: "",
    mail: "",
    facebook: "",
    instagram: "",
    iFrame: "",
    schedule: {
      schedule1: { day: "N", time: "N" },
      schedule2: { day: "N", time: "N" },
      schedule3: { day: "N", time: "N" },
    },
    lessonSchedule: "",
    locationLink: "",
    socialMedia: {
      facebook: "",
      instagram: "",
    },
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await getDocumentById("Contact info", "Information");
      if (data) {
        setContactInfo(data);
      }
    };
    fetchContactInfo();
  }, []);

  function handleSavedChanges() {
    promiseToast(
      updateDocumentById("Contact info", "Information", contactInfo),
      "Cambios guardado",
      "Error"
    );
  }

  const handleScheduleChange = (index, field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [`schedule${index + 1}`]: {
          ...prev.schedule[`schedule${index + 1}`],
          [field]: value,
        },
      },
    }));
  };

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
            location={contactInfo.location}
            iFrame={contactInfo.iFrame}
            mail={contactInfo.mail}
            phone={contactInfo.phone}
            schedule={contactInfo.schedule}
            lessonSchedule={contactInfo.lessonSchedule}
            locationLink={contactInfo.locationLink}
            socialMedia={contactInfo.socialMedia}
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
                      id="phone"
                      value={contactInfo.phone || ""}
                      name="phone"
                      required
                      inputProps={{ maxLength: 12 }}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box sx={contactTitleInput}>
                    <Typography sx={contactAdminSubTitles}>Correo</Typography>
                    <TextField
                      sx={contactInput}
                      id="outlined-required"
                      value={contactInfo.mail || ""}
                      name="mail"
                      type="email"
                      required
                      inputProps={{ maxLength: 30 }}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, mail: e.target.value })
                      }
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
                    value={contactInfo.location || ""}
                    rows={5}
                    inputProps={{ maxLength: 100 }}
                    name="location"
                    required
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        location: e.target.value,
                      })
                    }
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
                    value={contactInfo.socialMedia["facebook"] || ""}
                    name="socialMedia"
                    required
                    onChange={(e) => {
                      const updatedSocialMedia = {
                        ...contactInfo.socialMedia,
                        facebook: e.target.value,
                      };
                      setContactInfo((prev) => ({
                        ...prev,
                        socialMedia: updatedSocialMedia,
                      }));
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={contactAdminSubTitles}>Instagram</Typography>
                  <TextField
                    sx={contactInput}
                    id="outlined-required"
                    value={contactInfo.socialMedia["instagram"] || ""}
                    name="socialMedia"
                    required
                    onChange={(e) => {
                      const updatedSocialMedia = {
                        ...contactInfo.socialMedia,
                        instagram: e.target.value,
                      };
                      setContactInfo((prev) => ({
                        ...prev,
                        socialMedia: updatedSocialMedia,
                      }));
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ ...contactAdminTitles, marginBottom: "5px" }}>
                  Horario de consulta
                </Typography>
                {[...Array(3)].map((_, index) => (
                  <Box key={index} sx={inputSeparation}>
                    <TextField
                      sx={contactInput}
                      id={`schedule-day-${index}`}
                      value={
                        contactInfo.schedule[`schedule${index + 1}`]?.day || ""
                      }
                      name={`schedule-day-${index}`}
                      required
                      onChange={(e) =>
                        handleScheduleChange(index, "day", e.target.value)
                      }
                    />
                    <TextField
                      sx={contactInput}
                      id={`schedule-time-${index}`}
                      value={
                        contactInfo.schedule[`schedule${index + 1}`]?.time || ""
                      }
                      name={`schedule-time-${index}`}
                      required
                      onChange={(e) =>
                        handleScheduleChange(index, "time", e.target.value)
                      }
                    />
                  </Box>
                ))}
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
                      value={contactInfo.iFrame || ""}
                      rows={11}
                      name="iFrame"
                      required
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          iFrame: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box>
                    <Typography sx={contactAdminSubTitles}>
                      Ubicacion link:
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-required"
                      value={contactInfo.locationLink || ""}
                      name="locationLink"
                      required
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          locationLink: e.target.value,
                        })
                      }
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
                  value={contactInfo.lessonSchedule[0] || ""}
                  name="lessonSchedule"
                  required
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => {
                    const newLessonSchedule = [...contactInfo.lessonSchedule];
                    newLessonSchedule[0] = e.target.value;
                    setContactInfo({
                      ...contactInfo,
                      lessonSchedule: newLessonSchedule,
                    });
                  }}
                />
                <br />
                <TextField
                  id="outlined-required"
                  value={contactInfo.lessonSchedule[1] || ""}
                  name="lessonSchedule"
                  required
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => {
                    const newLessonSchedule = [...contactInfo.lessonSchedule];
                    newLessonSchedule[1] = e.target.value;
                    setContactInfo({
                      ...contactInfo,
                      lessonSchedule: newLessonSchedule,
                    });
                  }}
                />
                <br />
                <TextField
                  id="outlined-required"
                  value={contactInfo.lessonSchedule[2] || ""}
                  name="lessonSchedule"
                  required
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => {
                    const newLessonSchedule = [...contactInfo.lessonSchedule];
                    newLessonSchedule[2] = e.target.value;
                    setContactInfo({
                      ...contactInfo,
                      lessonSchedule: newLessonSchedule,
                    });
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
