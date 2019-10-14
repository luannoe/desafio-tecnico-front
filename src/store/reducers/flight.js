import moment from 'moment';

moment.suppressDeprecationWarnings = true;

const INITIAL_STATE = {
  from: '',
  to: '',
  outboundDate: moment()
    .add(1, 'days')
    .format('DD/MM/YYYY'),
  inboundDate: '',
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
    cabin: 1, // 1 = econômica (EC), 2 = executiva (EX)
  },
};

const createData = flight => {
  const data = {
    from: `${(flight.from || {}).airport} (${(flight.from || {}).abbr})`,
    to: `${(flight.to || {}).airport} (${(flight.to || {}).abbr})`,
    outboundDate: moment(flight.outboundDate).format('DD/MM/YYYY'),
    inboundDate: flight.inboundDate
      ? moment(flight.inboundDate).format('DD/MM/YYYY')
      : '',
    passengers: {
      adults: Number(flight.adults),
      children: Number(flight.children),
      infants: Number(flight.infants),
      cabin: flight.cabin === 'EC' ? 1 : 2,
    },
  };

  delete data.adults;
  delete data.children;
  delete data.infants;
  delete data.cabin;

  return data;
};

export default function airports(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_FLIGHT':
      return { ...state, ...createData(action.flight) };
    case 'SET_FROM_AIRPORT':
      return { ...state, from: action.from };
    case 'SET_TO_AIRPORT':
      return { ...state, to: action.to };
    case 'SET_OUTBOUND_FLIGHT':
      return { ...state, outboundDate: action.outboundDate };
    case 'SET_INBOUND_FLIGHT':
      return { ...state, inboundDate: action.inboundDate };
    case 'SET_PASSENGERS':
      return { ...state, passengers: action.passengers };
    default:
      return state;
  }
}
