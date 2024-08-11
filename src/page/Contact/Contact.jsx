import { getDocumentById } from "../../utils/firebaseDB";
import instagram from "../../assets/instagram.svg";
import whatsapp from "../../assets/whatsapp.svg";
import facebook from "../../assets/facebook.svg";
import { Button, TextField } from "@mui/material";
import { ContactForm } from "./components/ContactForm";

// const contactInfo = await getDocumentById("Contact info", "Information");

const contactInfoTitleStyles = {
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "24px",
  lineHeight: "120%",
  letterSpacing: "-0.02em",
  //   margin: "0px",
};

const contactInfoSubTitleStyles = {
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "120%",
};

const subSectionStyles = {
  background: "white",
  margin: "15px",
  padding: "0 15px 15px 15px",
  borderRadius: "10px",
};

export function Contact() {
  const contactInfo = {
    phone: "+50684527729",
    socialMedia: {
      instagram: "https://www.instagram.com",
      facebook: "https://www.facebook.com",
    },
    iFrame:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.1804701166134!2d-84.43418486067681!3d10.32743794933481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa065efd174d025%3A0xf6f936b3b4125b50!2sGNails!5e0!3m2!1ses!2scr!4v1723333807197!5m2!1ses!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    schedule: {
      "Lunes a viernes": "8:00 am - 6:00 pm",
      Sábado: "8:00 am - 4:00 pm",
      Domingo: "8:00 am - 11:00 am",
    },
    mail: "ejemplo@gmail.com",
    locationLink: "https://maps.app.goo.gl/yR86LiyPSqLxETfr9",
    lessonSchedule: [
      "9:00 am - 12:00 md",
      "1:00 pm -  4:00 pm",
      "6:30 pm - 9:30 pm",
    ],
    location:
      "Ciudad Quesada, San Carlos 21001 Quesada, Alajuela Province, Costa Rica",
  };
  const {
    location,
    iFrame,
    mail,
    phone,
    schedule,
    lessonSchedule,
    locationLink,
    socialMedia,
  } = contactInfo;

  const filteredIFrame = String(iFrame).match(/src="([^"]+)"/);
  const urlIFrame = filteredIFrame ? filteredIFrame[1] : null;
  const whatsappPhone = `https://wa.me/${phone}`;
  return (
    <div id="contact">
      <div
        className="contact-header"
        style={{
          backgroundImage: "url(/contact-background.webp)",
          backgroundRepeat: "repeat",
          height: "288px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "5em",
            fontFamily: "cursive",
            fontWeight: "bold",
            fontStyle: "italic",
            backgroundImage:
              "linear-gradient(180deg, rgba(251, 133, 185, 1) 0%, rgba(240, 88, 156, 1) 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}
        >
          Contacta con nosotros
        </p>
      </div>

      <div className="contact-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            padding: "40px",
          }}
        >
          <div
            className="left-container"
            style={{
              backgroundImage: "url(/contact-background2.webp)",
              backgroundRepeat: "round",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="header-contact-container" style={subSectionStyles}>
              <div style={{borderBottom: "black solid 1px"}} className="contact-personal">
                <p style={contactInfoTitleStyles}>
                  <strong>Contacto</strong>
                </p>
                <p>
                  <strong style={contactInfoSubTitleStyles}>Teléfono:</strong>{" "}
                  {phone}
                  <br />
                  <strong style={contactInfoSubTitleStyles}>
                    Correo:
                  </strong>{" "}
                  {mail}
                </p>
              </div>
              <div style={{borderBottom: "black solid 1px"}} className="contact-location">
                <p style={contactInfoTitleStyles}>
                  <strong>Ubicación</strong>
                </p>
                <p style={{ width: "60%" }}>{location}</p>
              </div>
              <div style={{borderBottom: "black solid 1px"}} className="contact-social-media">
                <p style={{ ...contactInfoTitleStyles, textAlign: "center" }}>
                  <strong>Redes Sociales</strong>
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "33% 33% 33%",
                    justifyItems: "center",
                  }}
                >
                  <a href={socialMedia["facebook"]}>
                    <img src={facebook} alt="Facebook icon" />
                  </a>
                  <a href={whatsappPhone}>
                    <img src={whatsapp} alt="Whatsapp icon" />
                  </a>
                  <a href={socialMedia["instagram"]}>
                    <img src={instagram} alt="Instagram icon" />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-contact-container" style={{...subSectionStyles, display:"flex", gap:"30px"}}>
              <div className="contact-schedule">
                <p style={{...contactInfoTitleStyles, margin: "15px 0 0 0"}}>
                  <strong>Horario de consultas</strong>
                </p>
                <div style={{marginTop: "16px"}}>
                {Object.entries(schedule).map(([day, value]) => (
                    <p style={{margin: "0"}} key={day}>
                    <strong style={contactInfoSubTitleStyles}>{day}</strong>{" "}
                    {value}
                    <br />
                  </p>
                ))}
                </div>
              </div>
              <div className="contact-lessons-schedule">
                <p style={{...contactInfoTitleStyles, textAlign: "center", margin: "15px 0 0 0"}}>
                  <strong>Horario de consultas</strong>
                </p>
                <p style={{textAlign:"center"}}>
                  <strong style={contactInfoSubTitleStyles}>
                    {lessonSchedule[0]}
                  </strong>
                  <br />
                  <strong style={contactInfoSubTitleStyles}>
                    {lessonSchedule[1]}
                  </strong>
                  <br />
                  <strong style={contactInfoSubTitleStyles}>
                    {lessonSchedule[2]}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div
            className="right-container"
            style={{
              width: "560px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #000000",
            }}
          >
            <iframe
              src={urlIFrame}
              style={{
                height: "500px",
                border: "0",
                allowfullscreen: "",
                loading: "lazy",
              }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <Button
              href={locationLink}
              variant="outlined"
              style={{
                background: "var(--primary-color)",
                color: "black",
                height: "81px",
                fontSize: "25px",
        
              }}
            >
              Ir a la ubicación
            </Button>
          </div>
        </div>
        <ContactForm/>
      </div>
    </div>
  );
}
