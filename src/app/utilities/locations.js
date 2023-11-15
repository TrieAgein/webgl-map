export const getLocation = (city) => {
  switch (city) {
    case "LA":
      return {
        latitude: 34.137197,
        longitude: -118.347238,
        zoom: 13,
        pitch: 0,
        bearing: 0,
      };
    case "NYC":
      return {
        latitude: 40.712776,
        longitude: -74.005974,
        zoom: 13,
        pitch: 0,
        bearing: 0,
      };
    default:
      return {
        latitude: 40.712776,
        longitude: -74.005974,
        zoom: 13,
        pitch: 0,
        bearing: 0,
      };
  }
};
