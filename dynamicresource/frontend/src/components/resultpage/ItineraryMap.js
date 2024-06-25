import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
} from "react-azure-maps";
import { AuthenticationType } from "azure-maps-control";

const ItineraryMap = ({ coordinates }) => {
  const averageCoord = coordinates
    .reduce(
      (acc, val) => {
        acc[0] += val[0];
        acc[1] += val[1];
        return acc;
      },
      [0, 0]
    )
    .map((val) => val / coordinates.length);
  const option = {
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: process.env.REACT_APP_AZURE_MAPS_KEY,
    },
    center: averageCoord.reverse(),
    zoom: 6,
    view: "Auto",
  };

  return (
    <>
      <AzureMapsProvider>
        <div
          style={{
            position: "absolute",
            height: "1500px",
            width: "calc(100% - 900px)",
            left: "900px",
          }}
        >
          <AzureMap options={option}>
            <AzureMapDataSourceProvider id={"DataSource Provider"}>
              <AzureMapLayerProvider
                options={{
                  color: ["get", "color"],
                }}
                id={"shape AzureMapLayerProvider"}
                type={"SymbolLayer"}
              >
                <AzureMapFeature
                  id={"symbol AzureMapFeature"}
                  type={"Symbol"}
                  options={{
                    iconOptions: {
                      image: "pin-round-blue",
                    },
                  }}
                />
              </AzureMapLayerProvider>

              {coordinates.map((coordinate, index) => (
                <AzureMapFeature
                  key={`feature-${index}`}
                  variant={"shape"}
                  id={`feature-${index}`}
                  type="Point"
                  coordinate={[coordinate[1], coordinate[0]]}
                  properties={{
                    title: `${index}`,
                    icon: "pin-round-blue",
                  }}
                  options={{
                    iconOptions: {
                      textOptions: {
                        textField: ["get", "title"],
                        textSize: 12,
                        offset: [0, 1.5],
                      },
                    },
                  }}
                />
              ))}
            </AzureMapDataSourceProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </>
  );
};

export default ItineraryMap;
