import React from "react";
import "./LocalSelect.css";
import { useLocale, useSetLocale } from "../contexts/LocalContext";

function LocalSelect(props) {
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handleChange = (e) => {
    setLocale(e.target.value);
  };
  return (
    <select className="LocaleSelect" onChange={handleChange}>
      <option value={"ko"}>한국어</option>
      <option value={"en"}>English</option>
    </select>
  );
}

export default LocalSelect;
