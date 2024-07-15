import { getXmlToJson } from "../utils/getXmlToJson";

const SERVICEKey =
  "3enTQKFbdwp7mY5McRmHelO8xxgi4LDBLefpQOsKT06WUGR3F4IhllVUPd90RuALzzzNTQuQfCGvK70tMyjJVA%3D%3D";
function getFormattedDate() {
  const today = new Date();
  const isoString = today.toISOString();
  const formattedDate = isoString.split("T")[0].split("-").join("");
  return formattedDate;
}

async function getSunsetRiseData() {
  var xhr = new XMLHttpRequest();
  var url =
    "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo"; /*URL*/
  var queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + SERVICEKey; /*Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("locdate") +
    "=" +
    encodeURIComponent(getFormattedDate()); /**/
  queryParams +=
    "&" +
    encodeURIComponent("location") +
    "=" +
    encodeURIComponent("대전"); /**/
  const result = await fetch(url + queryParams);
  const textResult = await result.text();
  const xmlString = new DOMParser().parseFromString(textResult, "text/xml");
  const jsonResult = getXmlToJson(xmlString);
  // fetch를 json으로 바꿔줌
  /* xhr.open("GET", url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log(
        "Status: " +
          this.status +
          "nHeaders: " +
          JSON.stringify(this.getAllResponseHeaders()) +
          "nBody: " +
          this.responseText
      );
    }
  };

  xhr.send("");*/
  return jsonResult.response.body.items.item;
}
export { getSunsetRiseData };
