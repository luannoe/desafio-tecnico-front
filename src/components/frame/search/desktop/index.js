import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFlightUrl } from 'config/functions';
import { Row, Col, Button } from 'antd';
import Airport from './airport';
import Date from './date';
import Passengers from './passengers';
import '../style.scss';

function SearchDesktop({
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
  history,
}) {
  const dispatch = useDispatch();
  const flight = useSelector(state => state.flight);
  const { from, to, outboundDate, inboundDate, passengers } = flight;
  const { adults, children, infants, cabin } = passengers;
  const [validPassengers, setValidPassengers] = useState(true);

  useEffect(() => {
    if (children + infants > adults || children + infants + adults > 9)
      setValidPassengers(false);
    else setValidPassengers(true);
  }, [adults, children, infants]);

  const getAirlines = () => {
    dispatch({ type: 'CLEAR_FLIGHTS' });
    const flightUrl = getFlightUrl(
      from,
      to,
      outboundDate,
      inboundDate,
      cabin,
      adults,
      children,
      infants
    );

    if (history) history.push(flightUrl);
  };

  return (
    <div className="search__desktop">
      <Row>
        <Col span={4}>
          <Airport
            label="Sair de"
            airports={filteredFrom()}
            airport={from}
            setAirport={setFrom}
          />
        </Col>

        <Col span={4}>
          <Airport
            label="Ir para"
            airports={filteredTo()}
            airport={to}
            setAirport={setTo}
          />
        </Col>

        <Col span={4}>
          <Date
            label="Ida"
            placeholder="Selecione"
            date={outboundDate}
            setDate={setOutboundDate}
            disabledDate={disabledDateOutbound}
          />
        </Col>

        <Col span={4}>
          <Date
            label="Volta"
            placeholder="Opcional"
            date={inboundDate}
            setDate={setInboundDate}
            disabledDate={disabledDateInbound}
          />
        </Col>

        <Col span={4}>
          <Passengers passengers={passengers} setPassengers={setPassengers} />
        </Col>

        <Col span={4} className="flex-center">
          <Button
            onClick={getAirlines}
            type="primary"
            size="large"
            icon="search"
            disabled={!hasFlightInfo || !validPassengers}
          >
            Pesquisar
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(SearchDesktop);
