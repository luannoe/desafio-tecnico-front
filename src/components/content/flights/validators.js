import moment from 'moment';

const errors = [];

const testTripType = tripType => {
  if (tripType !== 'RT' && tripType !== 'OW') {
    if (errors.findIndex(e => e.id === 1) === -1)
      errors.push({
        id: 1,
        message: 'O tipo de viagem está errado.',
      });
  } else {
    const index = errors.findIndex(e => e.id === 1);
    if (index !== -1) errors.splice(index, 1);
  }
};

const testAirport = (airport, airports, type) => {
  const hasAirport = !!airports.find(a => a.abbr === airport);
  const id = type === 'aeroporto de saída' ? 2 : 3;
  if (!hasAirport) {
    if (errors.findIndex(e => e.id === id) === -1)
      errors.push({
        id,
        message: `O ${type} informado não existe.`,
      });
  } else {
    const index = errors.findIndex(e => e.id === id);
    if (index !== -1) errors.splice(index, 1);
  }
};

const testDate = (date, type) => {
  const id = type === 'data de saída' ? 4 : 5;
  if (!moment(date).isValid()) {
    if (errors.findIndex(e => e.id === id) === -1)
      errors.push({
        id,
        type,
        message: `A ${type} informada não é válida.`,
      });
  } else {
    const index = errors.findIndex(e => e.id === id);
    if (index !== -1) errors.splice(index, 1);
  }
};

const testPassengers = (adults, children, infants) => {
  if (
    !Number.isInteger(adults) ||
    !Number.isInteger(children) ||
    !Number.isInteger(infants)
  ) {
    if (errors.findIndex(e => e.id === 6) === -1)
      errors.push({
        id: 6,
        message: 'A quantidade de passageiros não é válida.',
      });
  } else {
    const index = errors.findIndex(e => e.id === 6);
    if (index !== -1) errors.splice(index, 1);
  }

  if (adults + children + infants > 9) {
    if (errors.findIndex(e => e.id === 7) === -1)
      errors.push({
        id: 7,
        message:
          'A quantidade total de passageiros não pode ser maior do que 9.',
      });
  } else {
    const index = errors.findIndex(e => e.id === 7);
    if (index !== -1) errors.splice(index, 1);
  }

  if (adults < children + infants) {
    if (errors.findIndex(e => e.id === 8) === -1)
      errors.push({
        id: 8,
        message:
          'A quantidade de crianças e bebês deve ser menor do que a quantidade de adultos.',
      });
  } else {
    const index = errors.findIndex(e => e.id === 8);
    if (index !== -1) errors.splice(index, 1);
  }
};

const testCabin = cabin => {
  if (cabin !== 'EC' && cabin !== 'EX') {
    if (errors.findIndex(e => e.id === 9) === -1)
      errors.push({
        id: 9,
        message: 'A classe da cabine informada não existe.',
      });
  } else {
    const index = errors.findIndex(e => e.id === 9);
    if (index !== -1) errors.splice(index, 1);
  }
};

const testTripTypeInbound = (tripType, inboundDate) => {
  if (tripType === 'RT' && !inboundDate) {
    if (errors.findIndex(e => e.id === 10) === -1)
      errors.push({
        id: 10,
        message: 'Os parâmetros da sua busca estão incorretos.',
      });
  } else {
    const index = errors.findIndex(e => e.id === 10);
    if (index !== -1) errors.splice(index, 1);
  }
};

export default function validation(flight, airports) {
  const {
    tripType,
    from,
    to,
    outboundDate,
    inboundDate,
    adults,
    children,
    infants,
    cabin,
  } = flight;

  testTripType(tripType);
  testAirport(from, airports, 'aeroporto de saída');
  testAirport(to, airports, 'aeroporto de chegada');
  testDate(outboundDate, 'data de saída');
  testDate(inboundDate, 'data de chegada');
  testPassengers(adults, children, infants);
  testCabin(cabin);
  testTripTypeInbound(tripType, inboundDate);

  return { errors, isValid: errors.length === 0 };
}
