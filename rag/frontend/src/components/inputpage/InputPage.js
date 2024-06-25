import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/InputPage.css";
import TripForm from "./TripForm";
import ExampleTrip from "./ExampleTrip";
import WorldMapSelector from "./WorldMapSelector";
import { getCode } from "country-list";
import { CircularProgress, Zoom, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import FloatingActionButton from "@mui/material/Fab";

function getFlagEmoji(countryName) {
  const countryCode = getCode(countryName);
  return countryCode
    ? String.fromCodePoint(
        ...[...countryCode].map((letter) => 0x1f1a5 + letter.charCodeAt())
      )
    : "";
}

function InputPage() {
  const [selectedMapCountries, setSelectedMapCountries] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSustainableOption, setIsSustainableOption] = useState(false);
  const [trips, setTrips] = useState([]);
  const [showExampleTrips, setShowExampleTrips] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const functionUrl = process.env.REACT_APP_FUNCTION_URL;
    const formData = {
      startDate,
      endDate,
      interests: selectedInterests.map((interest) => interest.value),
      countries: selectedMapCountries,
      isSustainable: isSustainableOption,
    };
    console.log("Sending data to the function:", formData);
    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const responseBody = await response.json();
      console.log("Response from the function:", responseBody);
      navigate("/result", {
        state: {
          message: responseBody.message,
          itinerary: responseBody.res,
          country: formData.countries[0],
          interests: selectedInterests.map((interest) => interest.value),
        },
      });
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleTripClick = (trip) => {
    navigate("/result", {
      state: {
        message: JSON.stringify(trip.tripSchedule),
        country: trip.country,
        interests: selectedInterests.map((interest) => interest.value),
      },
    });
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { CosmosClient } = require("@azure/cosmos");

        const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT
        const key = process.env.REACT_APP_COSMOS_KEY
        const client = new CosmosClient({ endpoint, key });

        const { database } = await client.databases.createIfNotExists({
          id: "WanderMate",
        });
        console.log(database.id);

        const { container } = await database.containers.createIfNotExists({
          id: "WanderMateContainer",
        });
        console.log(container.id);

        const { resources: response } = await container.items
          .query("SELECT * from c")
          .fetchAll();
        console.log(response);
        for (const item of response) {
          console.log(`${item.country}`);
        }

        const data = await response;
        setTrips(data);
        console.log("Fetched example trips:", data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <div className="inputPageDiv">
        {isLoading && (
          <div>
            <div class="blurOverlay"></div>
            <div className="loadingPlaceholder">
              <CircularProgress />
              <p>Generating your trip for you... 🚀</p>{" "}
            </div>
          </div>
        )}
        {showExampleTrips && <div className="blurOverlay"></div>}
        <FloatingActionButton
          color="primary"
          onClick={() => setShowExampleTrips(!showExampleTrips)}
          style={{ position: "fixed", right: 16, top: 16, zIndex: 100000 }}
        >
          <NotListedLocationIcon />
        </FloatingActionButton>
        {showExampleTrips && (
          <Zoom in={showExampleTrips}>
            <div className="exampleTrips">
              <div class="exampleTripsText">
                <h2>Example Trips 🌍</h2>
                We created some examples itinerary for you, choose your favorite
                destination below!
              </div>
              <div class="exampleTripsCards">
                {trips.map((trip, index) => (
                  <ExampleTrip
                    key={index}
                    trip={trip}
                    onClick={handleExampleTripClick}
                  />
                ))}
              </div>
            </div>
          </Zoom>
        )}
        <div>
          <div className="inputField">
            <div class="introText">
              <span>Where do you wanna go? ✈️</span>
            </div>
            <div class="lowerText">
              Select the countries you want to visit, your travel dates, and
              your interests to get personalized travel recommendations. 🌍
            </div>
            <form onSubmit={handleSubmit}>
              <WorldMapSelector setCountries={setSelectedMapCountries} />
              <div class="tripInputForm">
                {selectedMapCountries.length > 0 && (
                  <div class="countriesEmoji">
                    {selectedMapCountries
                      .map((country) => getFlagEmoji(country))
                      .join(" ")}
                  </div>
                )}

                <TripForm
                  startDate={startDate}
                  endDate={endDate}
                  selectedInterests={selectedInterests}
                  selectedCountry={selectedCountry}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  setSelectedInterests={setSelectedInterests}
                  setIsSustainableOption={setIsSustainableOption}
                />
                <div class="sendButton">
                  <IconButton type="submit" color="primary">
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InputPage;
