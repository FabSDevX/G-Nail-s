import { getDocumentById } from "../utils/firebaseDB";

const contactInfo = await getDocumentById("Contact info", "Information");

export function Contact() {
  const { location, iFrame, mail, phone, schedule, lessonsSchedule, locationLink, socialMedia } = contactInfo;
  console.log(location, iFrame, mail, phone, schedule, lessonsSchedule, locationLink, socialMedia);

  return (
    <div id="contact">
      <div className="contact-header">
        <h1>Contacta con nosotros</h1>
      </div>

      <div className="contact-container">
        <div>
          <div className="left-container"></div>
          <div className="right-container"></div>
        </div>
        <div className="form-container"></div>
      </div>
    </div>
  );
}
