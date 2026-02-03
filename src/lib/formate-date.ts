
export  function formateDate(date: Date) {
  const d = new Date(date);
  const formattedDate =
    d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  return formattedDate;
}