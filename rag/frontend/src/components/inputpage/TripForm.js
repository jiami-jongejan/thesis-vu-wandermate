import React from "react";
import CreatableSelect from "react-select/creatable";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Switch,
  FormControlLabel,
  Tooltip,
  ThemeProvider,
  createTheme,
  Alert,
  Snackbar,
} from "@mui/material";

const TripForm = ({
  startDate,
  endDate,
  selectedInterests,
  selectedCountry,
  isSustainableOption,
  setStartDate,
  setEndDate,
  setSelectedInterests,
  setIsSustainableOption,
}) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const interestOptions = [
    { value: "culture", label: "🎭 Culture" },
    { value: "beach", label: "🏖️ Beach" },
    { value: "hiking", label: "🚶‍♂️ Hiking" },
    { value: "food", label: "🍽️ Food" },
    { value: "history", label: "🏛️ History" },
    { value: "art", label: "🎨 Art" },
    { value: "music", label: "🎵 Music" },
    { value: "nature", label: "🌳 Nature" },
    { value: "sports", label: "⚽ Sports" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "adventure", label: "🌄 Adventure" },
    { value: "diving", label: "🤿 Diving" },
    { value: "sightseeing", label: "🏰 Sightseeing" },
    { value: "photography", label: "📷 Photography" },
    { value: "wildlife", label: "🦁 Wildlife" },
    { value: "cruising", label: "🛳️ Cruising" },
    { value: "skiing", label: "⛷️ Skiing" },
    { value: "mountaineering", label: "🧗‍♂️ Mountaineering" },
    { value: "camping", label: "⛺ Camping" },
  ];
  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: "#ccc",
            "&.Mui-checked": {
              color: "#fff",
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "green",
            },
          },
        },
      },
    },
  });
  const handleSelectChange = (value) => {
    if (value.length > 4) {
      setOpenSnackbar(true);
    } else {
      setSelectedInterests(value);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <div className="date-picker-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            format="MM/dd"
            label="Start Date"
            inputVariant="outlined"
          />
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            format="MM/dd"
            label="End Date"
            inputVariant="outlined"
            minDate={startDate}
          />
        </LocalizationProvider>

        <CreatableSelect
          isMulti
          onChange={handleSelectChange}
          options={interestOptions}
          value={selectedInterests}
          placeholder="Select or type interests..."
        />
        <div class="sustainableOption">
          <ThemeProvider theme={theme}>
            <Tooltip title="Toggle sustainable options">
              <FormControlLabel
                control={
                  <Switch
                    checked={isSustainableOption}
                    onChange={(event) =>
                      setIsSustainableOption(event.target.checked)
                    }
                    sx={{
                      width: 80,
                      height: 40,
                      padding: "7px",
                      "& .MuiSwitch-switchBase": {
                        "&.Mui-checked": {
                          transform: "translateX(28px)",
                        },
                      },
                      "& .MuiSwitch-thumb": {
                        width: 30,
                        height: 30,
                      },
                      "& .MuiSwitch-track": {
                        borderRadius: 20 / 2,
                      },
                    }}
                    icon={
                      <span
                        role="img"
                        aria-label="plant"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "-3px",
                          marginLeft: "-3px",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          fontSize: "14px",
                          boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        🌱
                      </span>
                    }
                    checkedIcon={
                      <span
                        role="img"
                        aria-label="plant"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "-3px",
                          marginLeft: "7px",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          fontSize: "14px",
                          boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        🌿
                      </span>
                    }
                  />
                }
              />
            </Tooltip>
          </ThemeProvider>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="warning"
              sx={{ width: "100%" }}
            >
              You can select up to 4 interests only.
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default TripForm;
