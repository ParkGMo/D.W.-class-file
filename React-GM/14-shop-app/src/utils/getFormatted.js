export function getISODate(date) {
  // toISOString() : 영국 기준시간 -> .getTimezoneOffset() == -540분이 나타난다.(영국과의 시간차이)
  const offset = new Date().getTimezoneOffset() * 60000;
  const dateSplitArr = new Date(date - offset).toISOString().split("T");
  const yyyymmdd = dateSplitArr[0];
  const hhmmss = dateSplitArr[1].split(".")[0];
  return { yyyymmdd, hhmmss };
}
