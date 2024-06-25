import React from "react";
import "../../css/ExampleTrip.css";

function ExampleTrip({ trip, onClick }) {
  return (
    <div
      onClick={() => onClick(trip)}
      style={{ cursor: "pointer" }}
      className="exampleTrip"
    >
      <img src={trip.image} alt="" />
      <div className="content">
        <h2>
          <span>{trip.country}</span>
        </h2>
        <p>Duration: {trip.days}s</p>
        <p>Tags: {trip.tags}</p>
      </div>
    </div>
  );
}

export default ExampleTrip;
