import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getAirportAbbr } from 'config/functions';
import 'moment/min/locales';
import { Icon } from 'antd';
import '../style.scss';
import mapMarker from 'assets/images/icons/map-marker.png';
import calendar from 'assets/images/icons/calendar.png';
import users from 'assets/images/icons/users.png';
import Form from './form';

export default function SearchMobile({
  hasFlightInfo,
  filteredFrom,
  filteredTo,
  setFrom,
  setTo,
  disabledDateOutbound,
  disabledDateInbound,
  setOutboundDate,
  setInboundDate,
  setPassengers,
}) {
  const dispatch = useDispatch();
  const flight = useSelector(state => state.flight);
  const { searchDialog } = useSelector(state => state.responsive);
  const { from, to, outboundDate, inboundDate, passengers } = flight;
  const { adults, children, infants } = passengers;

  const handleForm = bool => {
    if (hasFlightInfo)
      dispatch({ type: 'SET_SEARCH_DIALOG', searchDialog: bool });
  };

  useEffect(() => {
    // If missing data
    if (!hasFlightInfo) handleForm(true);
    // eslint-disable-next-line
  }, [hasFlightInfo]);

  const date = dateFlight => {
    let _date = {};
    if (dateFlight.length === 10)
      _date = {
        year: moment(dateFlight, 'DD/MM/YYYY').format('YYYY'),
        month: moment(dateFlight, 'DD/MM/YYYY')
          .locale('pt-BR')
          .format('MMM'),
        day: moment(dateFlight, 'DD/MM/YYYY').format('DD'),
      };

    return (
      <div className="search__mobile__item">
        <img src={calendar} alt="Calendar" />
        <span className="uppercase">
          {_date.day ? (
            <>
              <strong>{_date.day}</strong> {_date.month} {_date.year}
            </>
          ) : (
            '-'
          )}
        </span>
      </div>
    );
  };

  const locationElement = (
    <div className="search__mobile__item">
      <img src={mapMarker} alt="Map Marker" />
      <span className="bold">
        {getAirportAbbr(from)} - {getAirportAbbr(to)}
      </span>
    </div>
  );

  const passengersElement = (
    <div className="search__mobile__item">
      <img src={users} alt="Users" />
      <span className="bold">{adults + children + infants}</span>
    </div>
  );

  const noFlightInfo = (
    <div>
      <Icon type="info-circle" className="mr-2 primary--text" />
      Preencha abaixo as informações da viagem.
    </div>
  );

  const flightInfo = (
    <>
      {locationElement}
      <div className="search__mobile__divider" />
      {date(outboundDate)}
      {date(inboundDate)}
      <div className="search__mobile__divider" />
      {passengersElement}
    </>
  );

  return (
    <>
      <div className="search__mobile" onClick={() => handleForm(!searchDialog)}>
        {hasFlightInfo ? flightInfo : noFlightInfo}
      </div>
      {searchDialog ? (
        <Form
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
        <></>
      )}
    </>
  );
}
