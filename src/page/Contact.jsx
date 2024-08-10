import { getDocumentById } from "../utils/firebaseDB";
import instagram from "../assets/instagram.svg";
import whatsapp from "../assets/whatsapp.svg";
import facebook from "../assets/facebook.svg";
import { useEffect } from "react";

const contactInfo = await getDocumentById("Contact info", "Information");

export function Contact() {
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
  console.log(
    location,
    iFrame,
    mail,
    phone,
    schedule,
    lessonSchedule,
    locationLink,
    socialMedia
  );
  return (
    <div id="contact">
      <div className="contact-header">
        <h1>Contacta con nosotros</h1>
      </div>

      <div className="contact-container">
        <div>
          <div className="left-container">
            <div className="header-contact-container">
              <div className="contact-personal">
                <p>
                  <strong>Contacto</strong>
                </p>
                <p>
                  <strong>Teléfono:</strong> +506 8856 8973
                  <br />
                  <strong>Correo:</strong> gracielaqna@gmail.com
                </p>
              </div>
              <div className="contact-location">
                <p>
                  <strong>Ubicación</strong>
                </p>
                <p>{location}</p>
              </div>
              <div className="contact-social-media">
                <p>
                  <strong>Redes Sociales</strong>
                </p>
                <img src={facebook} alt="Facebook icon" />
                <img src={whatsapp} alt="Whatsapp icon" />
                <img src={instagram} alt="Instagram icon" />
              </div>
            </div>
            <div className="footer-contact-container">
              <div className="contact-schedule">
                <p>
                  <strong>Horario de consultas</strong>
                </p>
                  {Object.entries(schedule).map(([day, value]) => (
                    <p key={day}>
                      <strong>{day}</strong> {value}
                      <br />
                    </p>
                  ))}
              </div>
              <div className="contact-lessons-schedule">
                <p>
                  <strong>Horario de consultas</strong>
                </p>
                <p>
                  <strong>{lessonSchedule[0]}</strong>
                  <br />
                  <strong>{lessonSchedule[1]}</strong>
                  <br />
                  <strong>{lessonSchedule[2]}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="right-container">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.540690639967!2d-84.43681342608274!3d10.327733489795085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa065efd174d025%3A0xf6f936b3b4125b50!2sGNails!5e1!3m2!1ses!2scr!4v1723048753218!5m2!1ses!2scr"
              style={{
                width: "600px",
                height: "450px",
                // border: "0",
                // allowfullscreen: "",
                // loading: "lazy",
                // referrerpolicy: "no-referrer-when-downgrade",
              }}
            ></iframe> */}
          </div>
        </div>
        <div className="form-container"></div>
      </div>
    </div>
  );
}
