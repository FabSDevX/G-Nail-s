export function getActualDate(format) {
  const date = new Date();

  let formattedDate = "";

  switch (format) {
    case "YYYY-MMMM": {
      const year = date.getFullYear();
      const month = date.toLocaleString("es-CR", { month: "long" });
      formattedDate = `${year}-${month}`;
      break;
    }
    default: {
      formattedDate = date.toLocaleDateString("es-CR");
      break;
    }
  }
  return formattedDate;
}
