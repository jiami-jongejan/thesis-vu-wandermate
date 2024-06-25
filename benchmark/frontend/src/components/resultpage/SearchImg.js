import React, { useEffect, useState } from "react";

const SearchImage = ({ query }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const subscriptionKey = process.env.REACT_APP_BING_SEARCH_KEY;

    if (!subscriptionKey) {
      console.error("Bing Search API subscription key is missing.");
      return;
    }

    const fetchImage = async () => {
      const searchQuery = `${query} ${query} travel blog photography`;

      try {
        const response = await fetch(
          `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(
            searchQuery
          )}&count=1`,
          {
            headers: {
              "Ocp-Apim-Subscription-Key": subscriptionKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        if (data.value && data.value.length > 0) {
          const firstImageResult = data.value[0];
          setImageUrl(firstImageResult.thumbnailUrl);
        } else {
          console.log("Couldn't find image results!");
        }
      } catch (error) {
        console.error("Error fetching image:", error.message);
      }
    };

    fetchImage();
  }, [query]);

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt={query} /> : <p>Loading image...</p>}
    </div>
  );
};

export default SearchImage;
