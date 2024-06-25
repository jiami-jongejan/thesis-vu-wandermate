import React from "react";
import SearchImageBg from "./SearchImgBg";
import "../../css/ActivityBlock.css";

const ActivityBlock = ({ activity, isLast, focused }) => {
  let activityEmoji;
  switch (activity.activityType) {
    case "Wine tasting":
      activityEmoji = "🍷";
      break;
    case "Hike":
      activityEmoji = "🚶‍♂️";
      break;
    case "Beach":
      activityEmoji = "🏖️";
      break;
    case "History":
      activityEmoji = "🏛️";
      break;
    case "Sightseeing":
      activityEmoji = "🏰";
      break;
    case "Adventure":
      activityEmoji = "🌄";
      break;
    case "Food":
      activityEmoji = "🍽️";
      break;
    case "Shopping":
      activityEmoji = "🛍️";
      break;
    case "Nature":
      activityEmoji = "🌳";
      break;
    case "Culture":
      activityEmoji = "🎭";
      break;
    case "Relax":
      activityEmoji = "🛀";
      break;
    default:
      activityEmoji = "🌍";
      break;
  }
  function getTransportEmoji(transport) {
    switch (transport) {
      case "Car":
      case "car":
        return "🚗";
      case "Train":
      case "train":
        return "🚆";
      case "Bus":
      case "bus":
        return "🚌";
      case "Flight":
      case "flight":
        return "✈️";
      case "Boat":
      case "boat":
      case "Ferry":
      case "ferry":
        return "⛵";
      default:
        return "🚂";
    }
  }
  const activityStyle = focused
    ? { opacity: 1, transform: "scale(1.02)", filter: "none" }
    : { opacity: 0.6, transform: "scale(1)", filter: "blur(1px)" };

  return (
    <div className="activityContainer" style={activityStyle}>
      <div className="activity">
        <div className="activityImage">
          <SearchImageBg query={activity.name} width={300} height={380} />
        </div>
        <div className="activityText">
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>
        </div>
        <div className="activityBottom">
          <p>
            <b>Travel tips:</b> {activity.travelTips}
          </p>
          <div className="keywords">
            <div className="keywordDuration">
              <div className="emoji">📅</div>
              <b>{activity.duration}</b> days
            </div>
            <div className="keywordActivityType">
              <div className="emoji">{activityEmoji}</div>
              {activity.activityType}
            </div>
          </div>
        </div>
      </div>
      {!isLast && (
        <div class="transportLine">
          <div class="transportEmoji">
            {getTransportEmoji(activity.transport)}
          </div>
          <div class="transportType">{activity.transport}</div>
          <div class="transportCompany">{activity.company}</div>
        </div>
      )}
    </div>
  );
};

export default ActivityBlock;
