import emailjs from "@emailjs/browser";

//Configuration of EmailJS System
emailjs.init({
    publicKey: import.meta.env.VITE_EMAILJS_PUBLICAPIKEY,
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: [],
      // The variable contains the email address
      watchVariable: "userEmail",
    },
    limitRate: {
      // Set the limit rate for the application
      id: "app",
      // Allow 1 request per 1s
      throttle: 1000,
    },
  });
