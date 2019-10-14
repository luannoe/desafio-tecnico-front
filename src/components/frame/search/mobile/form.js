import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFlightUrl } from 'config/functions';
import { Row, Col, Button } from 'antd';
import Autocomplete from '../components/autocomplete';
import Datepicker from '../components/datepicker';
import Passengers from './passengers';
import '../style.scss';

function MobileInputs({
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
    <Row gutter={16} className="search__mobile__dialog">
      <Col span={24} className="mb-2">
        Sair de
        <Autocomplete
          airports={filteredFrom()}
          airport={from}
          setAirport={setFrom}
        />
      </Col>
      <Col span={24} className="mb-2">
        Ir para
        <Autocomplete airports={filteredTo()} airport={to} setAirport={setTo} />
      </Col>
      <Col span={12} className="mb-2">
        Data da ida
        <Datepicker
          date={outboundDate}
          setDate={setOutboundDate}
          disabledDate={disabledDateOutbound}
          placeholder="Selecione"
        />
      </Col>
      <Col span={12} className="mb-2">
        Data da volta
        <Datepicker
          date={inboundDate}
          setDate={setInboundDate}
          disabledDate={disabledDateInbound}
          placeholder="Opcional"
        />
      </Col>
      <Col span={24} className="mb-4">
        Passageiros e classe de voo
        <Passengers passengers={passengers} setPassengers={setPassengers} />
      </Col>
      <Col span={24}>
        <Button
          block
          onClick={getAirlines}
          type="primary"
          size="large"
          icon="search"
          disabled={!hasFlightInfo}
        >
          Pesquisar passagem
        </Button>
      </Col>
    </Row>
  );
}

export default withRouter(MobileInputs);
