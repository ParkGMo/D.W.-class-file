import React from "react";
const RATINGS = [1, 2, 3, 4, 5];

function Star() {
  return <spam>★</spam>;
}

function Rating(props) {
  return (
    <div>
      {RATINGS.map((Arr) => {
        return <Star key={Arr} />;
      })}
    </div>
  );
}

export default Rating;
