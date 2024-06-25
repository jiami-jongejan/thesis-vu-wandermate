import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";

const geoUrl = "https://wandermate2.blob.core.windows.net/img/geography.json"

const colorPalette = ["#7986CB", "#64B5F6", "#4DD0E1", "#4DB6AC"];
const WorldMapSelector = ({ setCountries }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [position, setPosition] = useState({ zoom: 1 });
  const handleZoomIn = () => {
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }));
  };
  const handleZoomOut = () => {
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }));
  };
  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name;
    const countryId = geo.id;
    setSelectedCountries((prevSelected) => {
      if (prevSelected.includes(countryId)) {
        const newSelected = prevSelected.filter((id) => id !== countryId);
        setCountries((prevCountries) =>
          prevCountries.filter((name) => name !== countryName)
        );
        return newSelected;
      } else {
        setCountries((prevCountries) => [...prevCountries, countryName]);
        return [...prevSelected, countryId];
      }
    });
  };
  const getColor = (id) => {
    return colorPalette[id % colorPalette.length];
  };

  return (
    <div>
      <div className="zoomButtons">
        <div className="zoomIn" onClick={handleZoomIn}>
          +
        </div>
        <div className="zoomOut" onClick={handleZoomOut}>
          -
        </div>
      </div>
      <div className="geoMap">
        <ComposableMap>
          <ZoomableGroup zoom={position.zoom}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo, index) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                    data-tooltip-id="map-tooltip"
                    data-tooltip-content={geo.properties.name}
                    style={{
                      default: {
                        outline: "none",
                        fill: selectedCountries.includes(geo.id)
                          ? "#3F51B5"
                          : getColor(index),
                      },
                      hover: {
                        fill: selectedCountries.includes(geo.id)
                          ? "#3F51B5"
                          : "#3F51B5",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#3F51B5",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip id="map-tooltip" />
      </div>
    </div>
  );
};

export default WorldMapSelector;
