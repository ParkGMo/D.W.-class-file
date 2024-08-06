import React from "react";
import "./LocalSelect.css";
import { useLocale, useSetLocale } from "../contexts/LocalContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { lang } from "../store/localSlice";

function LocalSelect(props) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.local.language);

  const handleChange = (e) => {
    // setLocale(e.target.value);
    dispatch(lang({ language: e.target.value }));
    // if (e.target.value === "ko") {
    //   dispatch(lang({ language: e.target.value }));
    // } else {
    //   dispatch(lang({ language: e.target.value }));
    // }
  };
  return (
    <select className="LocaleSelect" onChange={handleChange}>
      <option value={"ko"}>한국어</option>
      <option value={"en"}>English</option>
    </select>
  );
}

export default LocalSelect;
