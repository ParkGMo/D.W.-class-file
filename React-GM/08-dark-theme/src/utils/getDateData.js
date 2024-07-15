function getTimes() {
  const today = new Date();
  const isoString = today.toISOString();
  const hourMinuts = isoString.split("T")[1].split(":");
  return hourMinuts[0] + hourMinuts[1];
}
export { getTimes };
