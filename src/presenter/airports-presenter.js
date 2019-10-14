import axios from 'axios';

export default {
  getAirports() {
    const { REACT_APP_AIRPORTS } = process.env;
    return new Promise((resolve, reject) => {
      axios
        .get(REACT_APP_AIRPORTS)
        .then(response => {
          const airports = Object.values(response.data.airports).map(
            (airport, index) => ({
              index,
              airport: airport[0],
              abbr: airport[1],
              country: airport[2],
            })
          );
          resolve(airports);
        })
        .catch(response => {
          reject(response);
        });
    });
  },
};
