import moment from 'moment';

export const clearQuery = text =>
  (text || '')
    .normalize('NFD')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s/g, '')
    .toLowerCase();

export const getAirportAbbr = text => {
  if (text.length === 3) return text;
  return (text || '').substr(text.length - 4).slice(0, 3);
};

export const getAirportCity = text =>
  (text || '')
    .substr(0, text.length - 6)
    .split('-')[0]
    .replace(/\s+$/, '');

export const getFlightUrl = (
  from,
  to,
  outboundDate,
  inboundDate,
  cabin,
  adults,
  children,
  infants
) => {
  const tripType = inboundDate ? 'RT' : 'OW';
  const _outboundDate = moment(outboundDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const _inboundDate = inboundDate
    ? moment(inboundDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    : null;
  const _from = getAirportAbbr(from);
  const _to = getAirportAbbr(to);
  const _cabin = cabin === 1 ? 'EC' : 'EX';
  if (_inboundDate)
    return `/flights/${tripType}/${_from}/${_to}/${_outboundDate}/${_inboundDate}/${adults}/${children}/${infants}/${_cabin}`;
  return `/flights/${tripType}/${_from}/${_to}/${_outboundDate}/${adults}/${children}/${infants}/${_cabin}`;
};
