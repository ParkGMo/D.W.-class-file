function generateRandomHex() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  return hex;
}
export default function generateColorCode() {
  const colorCode = `#${generateRandomHex()}${generateRandomHex()}${generateRandomHex()}
  `;
  return colorCode;
}

// export : 해당하는 것에 모두 export를 붙여준다.
// export default : 하나면 export  할때
