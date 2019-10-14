import { cloneDeep } from 'lodash';

const INITIAL_FILTER_TYPES = {
  airline: {
    label: 'Companhia aérea',
    filters: null,
  },
  period: {
    label: 'Horário de partida',
    filters: null,
  },
  from: {
    label: 'Aeroportos de partida',
    filters: null,
  },
  to: {
    label: 'Aeroportos de chegada',
    filters: null,
  },
};

const INITIAL_SORT_TABLE = {
  key: 'price',
  crescent: true,
};

const INITIAL_STATE = {
  inbound: [],
  outbound: [],
  filteredInbound: [],
  filteredOutbound: [],
  inboundFilterTypes: cloneDeep(INITIAL_FILTER_TYPES),
  outboundFilterTypes: cloneDeep(INITIAL_FILTER_TYPES),
  sortTableOutbound: cloneDeep(INITIAL_SORT_TABLE),
  sortTableInbound: cloneDeep(INITIAL_SORT_TABLE),
};

const getFlights = (oldFlights, newFlights) => {
  return oldFlights.concat(newFlights);
};

const buildFilters = (filterTypes, flights) => {
  flights.forEach(flight => {
    Object.keys(filterTypes).forEach(key => {
      const filterType = filterTypes[key];
      if (!filterType.filters) filterType.filters = {};
      filterType.filters[flight[key]] = false;
    });
  });

  const period = {};
  const labels = [
    'Madrugada - 00:00 às 05:59',
    'Manhã - 06:00 às 11:59',
    'Tarde - 12:00 às 17:59',
    'Noite - 18:00 às 23:59',
  ];
  labels.forEach(label => {
    if (
      filterTypes.period.filters &&
      filterTypes.period.filters[label] !== undefined
    )
      period[label] = filterTypes.period.filters[label];
  });
  filterTypes.period.filters = period;
  return filterTypes;
};

const updateFilter = (filterTypes, filterType, filter) => {
  const filters = filterTypes;
  filters[filterType].filters[filter] = !filters[filterType].filters[filter];
  return filters;
};

const filteredFlights = (state, _flights, _filterTypes, _sortTable, type) => {
  const flights = _flights || state[type];
  const filterTypes = _filterTypes || state[`${type}FilterTypes`];
  const sortTable =
    _sortTable ||
    state[`sortTable${type.charAt(0).toUpperCase()}${type.slice(1)}`];
  const filtersObj = {};

  Object.keys(filterTypes).forEach(keys => {
    if (!filtersObj[keys]) filtersObj[keys] = [];
    Object.keys(filterTypes[keys].filters || {}).forEach(filterKey => {
      if (filterTypes[keys].filters[filterKey])
        filtersObj[keys].push(filterKey);
    });
  });

  return flights
    .filter(flight => {
      let bool = true;
      Object.keys(filtersObj).forEach(key => {
        const values = filtersObj[key];
        if (values.length)
          bool = bool && !!values.find(val => val === flight[key]);
      });
      return bool;
    })
    .sort((a, b) => {
      if (a[sortTable.key] < b[sortTable.key])
        return sortTable.crescent ? -1 : 1;
      if (a[sortTable.key] > b[sortTable.key])
        return sortTable.crescent ? 1 : -1;
      return 0;
    });
};

export default function airports(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CLEAR_FLIGHTS':
      return cloneDeep(INITIAL_STATE);
    case 'SET_FLIGHTS':
      const inbound = getFlights(state.inbound, action.flights.inbound);
      const outbound = getFlights(state.outbound, action.flights.outbound);
      return {
        ...state,
        inbound,
        outbound,
        filteredInbound: filteredFlights(state, inbound, null, null, 'inbound'),
        filteredOutbound: filteredFlights(
          state,
          outbound,
          null,
          null,
          'outbound'
        ),
        inboundFilterTypes: buildFilters(state.inboundFilterTypes, inbound),
        outboundFilterTypes: buildFilters(state.outboundFilterTypes, outbound),
      };
    case 'SET_FILTER':
      const newFilters = updateFilter(
        state[`${action.flightType}FilterTypes`],
        action.filterType,
        action.filter
      );
      const returnFilter = { ...state };
      returnFilter[`${action.flightType}FilterTypes`] = newFilters;
      returnFilter[
        `filtered${action.flightType
          .charAt(0)
          .toUpperCase()}${action.flightType.slice(1)}`
      ] = filteredFlights(state, null, newFilters, null, action.flightType);
      return returnFilter;
    case 'SET_SORT_TABLE':
      const returnSortTable = { ...state };
      returnSortTable[
        `filtered${action.flightType
          .charAt(0)
          .toUpperCase()}${action.flightType.slice(1)}`
      ] = filteredFlights(
        state,
        null,
        null,
        action.sortTable,
        action.flightType
      );
      return returnSortTable;
    default:
      return state;
  }
}
