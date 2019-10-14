import api from 'config/axios';
import moment from 'moment';

const prefix = 'search';

const getBestPrice = pricing => {
  if (pricing.bestPriceAt === 'airline') return pricing.airline.saleTotal;
  if (!!pricing.miles) return pricing.miles.saleTotal;
  return pricing.ota.saleTotal;
};

const getPeriod = date => {
  const momentDate = Number(moment(date).format('HHmm'));
  if (momentDate >= 0 && momentDate < 600) return 'Madrugada - 00:00 às 05:59';
  if (momentDate >= 600 && momentDate < 1200) return 'Manhã - 06:00 às 11:59';
  if (momentDate >= 1200 && momentDate < 1800) return 'Tarde - 12:00 às 17:59';
  return 'Noite - 18:00 às 23:59';
};

export default {
  getAirlines(params) {
    return new Promise((resolve, reject) => {
      api
        .post(`${prefix}?time=${Date.now()}`, params)
        .then(response => resolve(response))
        .catch(response => {
          reject(response);
        });
    });
  },
  getFlights(searchId, airlineLabel) {
    return new Promise((resolve, reject) => {
      api
        .get(`${prefix}/${searchId}/flights?airline=${airlineLabel}`)
        .then(response => {
          response.outbound.forEach(flight => {
            flight.price = getBestPrice(flight.pricing);
            flight.period = getPeriod(flight.departureDate);
          });
          response.inbound.forEach(flight => {
            flight.price = getBestPrice(flight.pricing);
            flight.period = getPeriod(flight.departureDate);
          });
          resolve(response);
        })
        .catch(response => reject(response));
    });
  },
};
