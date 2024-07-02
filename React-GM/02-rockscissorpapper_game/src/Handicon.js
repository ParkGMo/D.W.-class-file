import React from "react";

import rockImg from "./assets/rock.svg";
import scissorImg from "./assets/scissor.svg";
import paperImg from "./assets/paper.svg";

const IMAGES = {
  rock: rockImg,
  scissor: scissorImg,
  paper: paperImg,
};

function Handicon({ value, className }) {
  const src = IMAGES[value];
  return <img src={src} className={className} />;
}

export default Handicon;
