import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAirportCity } from 'config/functions';
import breakpoints from 'consts/breakpoints';
import moment from 'moment';
import Mobile from './mobile';
import Desktop from './desktop';
import './style.scss';

export default function Search() {
  // Redux
  const dispatch = useDispatch();
  const flight = useSelector(state => state.flight);
  const airports = useSelector(state => state.airports.data);
  const { width } = useSelector(state => state.responsive);
  const { from, to, outboundDate, inboundDate } = flight;

  // States
  const [hasFlightInfo, setHasFlightInfo] = useState(false);

  useEffect(() => {
    if (!!from && !!to && !!outboundDate) setHasFlightInfo(true);
    else setHasFlightInfo(false);
  }, [from, to, outboundDate]);

  /* AIRPORTS FUNCTIONS */
  const filteredFrom = () => {
    if (to) return airports.filter(a => a.airport.indexOf(getAirportCity(to)));
    return airports;
  };

  const filteredTo = () => {
    if (from)
      return airports.filter(a => a.airport.indexOf(getAirportCity(from)));
    return airports;
  };

  const setFrom = airport => {
    dispatch({ type: 'SET_FROM_AIRPORT', from: airport });
  };

  const setTo = airport => {
    dispatch({ type: 'SET_TO_AIRPORT', to: airport });
  };

  /* DATES FUNCTIONS */
  const disabledDateOutbound = current => {
    if (inboundDate) return current && current < moment();
    return current && current < moment();
  };

  const disabledDateInbound = current => {
    if (outboundDate)
      return current && current < moment(outboundDate, 'DD/MM/YYYY');
    return current && current < moment();
  };

  const setOutboundDate = date => {
    // If has a return flight with date less than outbound flight
    if (
      !!inboundDate &&
      moment(inboundDate, 'DD/MM/YYYY') < moment(date, 'DD/MM/YYYY')
    )
      dispatch({ type: 'SET_INBOUND_FLIGHT', inboundDate: '' });
    dispatch({ type: 'SET_OUTBOUND_FLIGHT', outboundDate: date });
  };

  const setInboundDate = date => {
    dispatch({ type: 'SET_INBOUND_FLIGHT', inboundDate: date });
  };

  /* PASSENGERS FUNCTIONS */
  const setPassengers = pass => {
    dispatch({ type: 'SET_PASSENGERS', passengers: pass });
  };

  return (
    <div className="search">
      {width > breakpoints.md ? (
        <Desktop
          hasFlightInfo={hasFlightInfo}
          filteredFrom={filteredFrom}
          filteredTo={filteredTo}
          setFrom={setFrom}
          setTo={setTo}
          disabledDateOutbound={disabledDateOutbound}
          disabledDateInbound={disabledDateInbound}
          setOutboundDate={setOutboundDate}
          setInboundDate={setInboundDate}
          setPassengers={setPassengers}
        />
      ) : (
        <Mobile
          hasFlightInfo={hasFlightInfo}
          filteredFrom={filteredFrom}
          filteredTo={filteredTo}
          setFrom={setFrom}
          setTo={setTo}
          disabledDateOutbound={disabledDateOutbound}
          disabledDateInbound={disabledDateInbound}
          setOutboundDate={setOutboundDate}
          setInboundDate={setInboundDate}
          setPassengers={setPassengers}
        />
      )}
    </div>
  );
}
