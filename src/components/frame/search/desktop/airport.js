import React from 'react';
import { getAirportAbbr, getAirportCity } from 'config/functions';
import { Popover } from 'antd';
import MapMarker from 'assets/images/icons/map-marker.png';
import '../style.scss';
import Autocomplete from '../components/autocomplete';

export default function Airport({ label, airports, airport, setAirport }) {
  return (
    <Popover
      // eslint-disable-next-line
      content={(
        <Autocomplete
          airports={airports}
          airport={airport}
          setAirport={setAirport}
        />
        // eslint-disable-next-line
      )}
      placement="bottom"
    >
      <div className="search__desktop__column" title={airport}>
        <div className="search__desktop__column__info">
          <span className="search__desktop__column__label">{label}</span>
          {airport ? (
            <>
              <span className="search__desktop__column__title">
                {getAirportCity(airport)}

                <span className="search__desktop__column__title__subtitle">
                  {getAirportAbbr(airport)}
                </span>
              </span>
            </>
          ) : (
            <span className="search__desktop__column__select--label">
              Selecione
            </span>
          )}
        </div>
        <img
          src={MapMarker}
          alt="Map Marker"
          className="search__desktop__icon"
        />
      </div>
    </Popover>
  );
}
