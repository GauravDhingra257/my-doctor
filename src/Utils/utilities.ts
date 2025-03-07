import axios from "axios";

// This function will simulate setting the location
const setLocation = (location) => {
  console.log("Location set to:", location);
};

// This function will simulate setting an error message
const setError = (message) => {
  console.error("Error:", message);
};

let locationFetched = false; // Flag to track if location has been fetched

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    console.log("Fetching location...");
    if (navigator.geolocation && !locationFetched) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use OpenCage Geocoding API (you can replace this with another service if desired)
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2b8666389d85435e814259be6079334d`
            );
            const data = response.data;
            if (data.results && data.results.length > 0) {
              const addressComponents = data.results[0].components;
              const city = addressComponents.city || addressComponents.town || addressComponents.village;
              const state = addressComponents.state;
              const district = addressComponents.county || addressComponents.district;

              setLocation({ city, district, state });
              locationFetched = true; // Mark as fetched
              resolve({ city, district, state });
            } else {
              reject("Unable to fetch address");
            }
          } catch (err) {
            reject("Error in fetching location data.");
          }
        },
        (err) => {
          reject("Geolocation error: " + err.message);
        }
      );
    } else if (locationFetched) {
      resolve({ message: "Location already fetched" });
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};
