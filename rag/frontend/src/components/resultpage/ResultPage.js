import { useLocation } from "react-router-dom";
import ActivityBlock from "./ActivityBlock";
import "../../css/ResultPage.css";
import SearchImageBg from "./SearchImgBg";
import ItineraryMap from "./ItineraryMap";
import { getCode } from "country-list";
import React, { useState, useEffect, useRef } from "react";

function getFlagEmoji(countryName) {
  const countryCode = getCode(countryName);
  return countryCode
    ? String.fromCodePoint(
        ...[...countryCode].map((letter) => 0x1f1a5 + letter.charCodeAt())
      )
    : "";
}

function getInterestEmoji(interest) {
  switch (interest) {
    case "wine tasting":
      return "🍷";
    case "hike":
      return "🚶‍♂️";
    case "beach":
      return "🏖️";
    case "history":
      return "🏛️";
    case "sightseeing":
      return "🏰";
    case "adventure":
      return "🌄";
    case "food":
      return "🍽️";
    case "shopping":
      return "🛍️";
    case "nature":
      return "🌳";
    case "culture":
      return "🎭";
    case "relax":
      return "🛀";
    default:
      return "🌍";
  }
}

const ResultPage = () => {
  const scrollContainerRef = useRef(null);
  const location = useLocation();
  const message = location.state?.itinerary;
  let json_message;
  try {
    json_message = JSON.parse(location.state?.itinerary || '[]');
  } catch (error) {
    console.error('Failed to parse itinerary JSON:', error);
    json_message = [];
  }
  const first_country = location.state?.country;
  const user_interests = location.state?.interests;
  const [focusedIndex, setFocusedIndex] = useState(0);

  console.log("first_country:", first_country);

  const coordinatesList = json_message.map((item) => item.coordinates);
  console.log("coordinatesList:", coordinatesList);

  console.log("message:" + message);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      let nearestIndex = 0;
      const offsetAdjustment = -300;
      const itineraryBoxes = Array.from(
        scrollContainer.querySelectorAll(".itineraryBox")
      );

      itineraryBoxes.forEach((box, index) => {
        const boxTop =
          box.offsetTop - scrollContainer.offsetTop - offsetAdjustment;
        const scrollMiddle =
          scrollContainer.scrollTop + scrollContainer.clientHeight / 2;

        if (scrollMiddle >= boxTop) {
          nearestIndex = index;
        }
      });

      setFocusedIndex(nearestIndex);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <div className="backgroundImage">
        <ItineraryMap
          coordinates={json_message.map((item) => item.coordinates)}
        />
      </div>
      <div className="textDivResult" ref={scrollContainerRef}>
        <div className="resultPage">
          <div className="headerImgResult">
            <SearchImageBg
              query={first_country}
              width={1000}
              height={500}
              isHeaderImage={true}
            />
          </div>
          <div className="destinationTitle">
            <span>
              {getFlagEmoji(first_country)} {first_country}
            </span>
          </div>
          <div class="interests">
            {user_interests.map((interest, index) => (
              <div key={index} className="userInterest">
                {getInterestEmoji(interest)} {interest}
              </div>
            ))}
          </div>
          <div className="travelItinerary">
            {json_message.map((item, index) => (
              <div key={index} className="itineraryBox">
                <ActivityBlock
                  activity={item}
                  isLast={index === json_message.length - 1}
                  focused={index === focusedIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
