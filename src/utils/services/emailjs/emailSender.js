import emailjs from "@emailjs/browser";

//Send an email from the contact me form
export async function sendEmail(templateParams) {
  const response = await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICEID,
    import.meta.env.VITE_EMAILJS_TEMPLATEID,
    templateParams
  );
  return response
}
