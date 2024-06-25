import React, { useEffect, useState } from "react";

const SearchImageBg = ({ query, width, height, isHeaderImage }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const subscriptionKey = process.env.REACT_APP_BING_SEARCH_KEY;

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&w=${width}&h=${height}&p=0&pid=16.1`,
          {
            headers: {
              "Ocp-Apim-Subscription-Key": subscriptionKey,
            },
          }
        );
        const data = await response.json();
        const firstImageResult = data.value?.find(image => image.width >= width && image.height >= height);
        
        if (firstImageResult) {
          setImageUrl(firstImageResult.thumbnailUrl);
        } else {
          console.error("Couldn't find image with desired dimensions!");
        }
      } catch (error) {
        console.error("Error fetching image:", error.message);
      }
    };

    if (query) {
      fetchImage();
    }
  }, [query, width, height]);
  
  const divStyle = {
    width: isHeaderImage ? `${width + 200}px` : `${width}px`,
    height: isHeaderImage ? `${height + 20}px` : `${height}px`,
    marginTop: isHeaderImage ? "-15px" : "0px",
    marginLeft: isHeaderImage ? "-15px" : "0px",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: isHeaderImage ? "blur(5px)" : "none",
  };

  const divParent = {
    overflow: "hidden",
    height: "500px",
    width: "1000px",
  };

  return (
    <div style={divParent}>
      <div style={divStyle}></div>
    </div>
  );
};

export default SearchImageBg;
