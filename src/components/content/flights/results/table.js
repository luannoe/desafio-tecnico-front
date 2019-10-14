import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Skeleton, Popover } from 'antd';
import moment from 'moment';
import breakpoints from 'consts/breakpoints';
import colors from 'consts/colors';
import { FaAngleDown } from 'react-icons/fa';
import './table.scss';

export default function Table({ type, flights, loadings, sortTable }) {
  const dispatch = useDispatch();
  const { width } = useSelector(state => state.responsive);
  const [headers, setHeaders] = useState({
    airline: { label: 'Companhia', mobile: true },
    departureDate: { label: 'Partida', crescent: null, mobile: true },
    duration: { label: 'Duração', crescent: null, mobile: true },
    arrivalDate: { label: 'Chegada', crescent: null, mobile: true },
    details: { label: 'Detalhes' },
    price: { label: 'Preço', crescent: null },
  });

  const price = bestPrice => {
    return String(bestPrice.toFixed(2)).replace('.', ',');
  };

  const handleSortTable = (key, crescent) => {
    if (headers[key].crescent === undefined) return;

    Object.values(headers).forEach(val => {
      if (val.crescent !== undefined) val.crescent = null;
    });

    headers[key].crescent = !crescent;
    setHeaders(headers);

    dispatch({
      type: `SET_SORT_TABLE`,
      flightType: type,
      sortTable: { key, crescent: !crescent },
    });
  };

  useEffect(() => {
    handleSortTable(sortTable.key, sortTable.crescent);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleSortTable(sortTable.key, sortTable.crescent);
    // eslint-disable-next-line
  }, [sortTable]);

  return (
    <div className="flights-datatable">
      <div className="flights-datatable__header">
        <Row>
          {Object.keys(headers).map(key => (
            <Col
              key={key}
              onClick={() => {
                handleSortTable(key, headers[key].crescent);
              }}
              className={`flex-center ${
                headers[key].mobile ? null : 'desktop-only'
              } ${headers[key].crescent !== undefined ? 'pointer' : null}`}
              xl={4}
              xs={headers[key].mobile ? 6 : null}
            >
              {headers[key].label}{' '}
              {headers[key].crescent !== undefined ? (
                <FaAngleDown
                  style={{
                    color:
                      headers[key].crescent !== null ? '#fff' : colors.primary,
                  }}
                  className={`carot ${
                    headers[key].crescent === false ? 'carot--rotate' : null
                  }`}
                />
              ) : null}
            </Col>
          ))}
        </Row>
      </div>

      <div className="flights-datatable__content">
        {Object.values(loadings).some(load => load) && flights.length === 0
          ? Object.keys(loadings).map(load => (
              <Row className="card--flight--loading" key={load}>
                <Col className="card--flight__info" span={24}>
                  <Skeleton active />
                </Col>
              </Row>
            ))
          : flights.map(flight => (
              <Row className="card--flight" key={flight.id}>
                <Col
                  className="flex-center flex-column card--flight__info"
                  xs={6}
                  xl={4}
                >
                  <h4>{flight.airline}</h4>
                  <span>{flight.flightNumber}</span>
                </Col>
                <Col
                  className="flex-center flex-column card--flight__info"
                  xs={6}
                  xl={4}
                >
                  <h4>{moment(flight.departureDate).format('HH:mm')}</h4>
                  <span>{flight.from}</span>
                </Col>
                <Col
                  className="flex-center flex-column card--flight__info"
                  xs={6}
                  xl={4}
                >
                  <h4>
                    {moment.duration({ minutes: flight.duration }).hours()}H
                    {moment.duration({ minutes: flight.duration }).minutes()}
                  </h4>
                  <span>
                    {flight.stops === 0
                      ? 'Voo direto'
                      : flight.stops === 1
                      ? '1 parada'
                      : `${flight.stops} paradas`}
                  </span>
                </Col>
                <Col
                  className="flex-center flex-column card--flight__info"
                  xs={6}
                  xl={4}
                >
                  <h4>{moment(flight.arrivalDate).format('HH:mm')}</h4>
                  <span>{flight.to}</span>
                </Col>
                <Col className="flex-center flex-column" xs={24} xl={4}>
                  <Popover content={<FlightDetails flight={flight} />}>
                    <Button className="btn--details">
                      <span className="primary--text btn--details__icon">
                        +
                      </span>{' '}
                      Detalhes do voo
                    </Button>
                  </Popover>
                </Col>
                <Col className="flex-center flex-column" xs={24} xl={4}>
                  <OriginalPrice pricing={flight.pricing} />
                  <Button
                    block={width < breakpoints.lg}
                    type="primary"
                    className="btn--price"
                  >
                    R${price(flight.price)}
                  </Button>
                  <PriceAlert pricing={flight.pricing} />
                </Col>
              </Row>
            ))}
      </div>
    </div>
  );
}

function FlightDetails({ flight }) {
  const cabin = flight.cabin === 'EC' ? 'Econômica' : 'Executiva';
  const miles = flight.pricing.miles ? flight.pricing.miles.adult.miles : '';
  return (
    <>
      <div>
        <strong>Classe deste trecho:</strong> {cabin}
      </div>
      {flight.pricing.miles ? (
        <div>
          <strong>Qnt. de milhas:</strong> {miles} (por adulto)
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function OriginalPrice({ pricing }) {
  const price = () => {
    if (!!pricing.airline && pricing.bestPriceAt !== 'airline')
      return `${pricing.airlineName} R$ ${pricing.airline.saleTotal}`;
    return '';
  };

  return <span className="original-price">{price()}</span>;
}

function PriceAlert({ pricing }) {
  const hasAirline = !!pricing.airline;
  const hasOta = !!pricing.ota;
  const hasMiles = !!pricing.miles;

  const text = () => {
    if (hasAirline && (hasOta || hasMiles))
      if (pricing.bestPriceAt === 'airline')
        return 'Mais economia na cia aérea';
      else
        return `Economize ${pricing.savingPercentage.toFixed(2)}% na MaxMilhas`;
    if (hasAirline) return 'Exclusivo na cia aérea';
    return 'Exclusivo na MaxMilhas';
  };

  return (
    <span
      className={`msg-price bold ${
        pricing.savingPercentage ? 'warning--text' : null
      }`}
    >
      {text()}
    </span>
  );
}
