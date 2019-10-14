import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlightsPresenter from 'presenter/flights-presenter';
import { Row, Col } from 'antd';
import ErrorImg from 'assets/images/error.png';
import { MdRemoveRedEye } from 'react-icons/md';
import { FiFilter } from 'react-icons/fi';
import Alert from './alert';
import FiltersCard from './filters-card';
import FiltersDialog from './filters-dialog';
import Table from './table';
import './style.scss';

export default function Results({ airlineResults }) {
  const dispatch = useDispatch();
  const {
    filteredInbound,
    filteredOutbound,
    inboundFilterTypes,
    outboundFilterTypes,
    sortTableOutbound,
    sortTableInbound,
  } = useSelector(state => state.flights);
  const [avaibleAirlines, setAvaibleAirlines] = useState([]);
  const [loadings, setLoadings] = useState({});
  const [error, setError] = useState(false);
  const [hasFlights, setHasFlights] = useState(false);

  useEffect(() => {
    const avaible = (airlineResults || {}).airlines.filter(
      airline => airline.status.enable
    );
    const _loadings = {};
    avaible.forEach(airline => {
      _loadings[airline.label] = true;
    });
    setLoadings(_loadings);
    setAvaibleAirlines(avaible);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const _loadings = {};
    if (avaibleAirlines.length > 0) {
      avaibleAirlines.forEach(airline => {
        _loadings[airline.label] = true;
      });

      avaibleAirlines.forEach(airline => {
        FlightsPresenter.getFlights(airlineResults.id, airline.label)
          .then(response => {
            dispatch({ type: 'SET_FLIGHTS', flights: response });
          })
          .catch(() => {
            setError(true);
          })
          .finally(() => {
            _loadings[airline.label] = false;
            setLoadings({ ..._loadings });
          });
      });
    }

    // eslint-disable-next-line
  }, [avaibleAirlines]);

  useEffect(() => {
    const bool =
      avaibleAirlines.length === 0 ||
      (filteredInbound.length === 0 &&
        filteredOutbound.length === 0 &&
        Object.values(loadings).every(load => !load));
    setHasFlights(bool);
  }, [avaibleAirlines, loadings, filteredInbound, filteredOutbound]);

  return (
    <div className="results-container">
      {error ? (
        <Error />
      ) : hasFlights ? (
        <UnavableAirlines />
      ) : (
        <AvaibleAirlines
          loadings={loadings}
          inbound={filteredInbound}
          outbound={filteredOutbound}
          inboundFilterTypes={inboundFilterTypes}
          outboundFilterTypes={outboundFilterTypes}
          sortTableOutbound={sortTableOutbound}
          sortTableInbound={sortTableInbound}
        />
      )}
    </div>
  );
}

function Error() {
  return (
    <div className="results-container__unavaible min-height flex-center">
      <img
        src={ErrorImg}
        style={{ height: 230, marginBottom: 40 }}
        alt="Nenhuma opção de voo"
      />
      <h2 className="ma-0 primary--text">Oops!</h2>
      <p className="mb-0">Aconteceu algum erro ao buscar os voos.</p>
      <p className="mb-0">Por favor, tente novamente!</p>
    </div>
  );
}

function UnavableAirlines() {
  return (
    <div className="results-container__unavaible min-height flex-center">
      <img
        src={ErrorImg}
        style={{ height: 230, marginBottom: 40 }}
        alt="Nenhuma opção de voo"
      />
      <h2 className="ma-0 primary--text">Oops!</h2>
      <p className="mb-0">
        Não encontramos nenhuma opção de voo para o trecho que você procura.
      </p>
      <p className="mb-0">Você pode tentar outros filtros de busca.</p>
    </div>
  );
}

function AvaibleAirlines({
  inbound,
  outbound,
  inboundFilterTypes,
  outboundFilterTypes,
  sortTableInbound,
  sortTableOutbound,
  loadings,
}) {
  const [tabActive, setTabActive] = useState(1);
  const [dialogFilters, setDialogFilters] = useState(false);

  return (
    <div className="results-container__content">
      <div className="results-container__tabs">
        <div
          onClick={() => setTabActive(1)}
          className={`results-container__tabs__tab ${
            tabActive === 1 ? 'results-container__tabs__tab--active' : null
          }`}
        >
          Selecione seu voo de ida
        </div>
        {inbound.length > 0 ? (
          <div
            onClick={() => setTabActive(2)}
            className={`results-container__tabs__tab ${
              tabActive === 2 ? 'results-container__tabs__tab--active' : null
            }`}
          >
            Selecione seu voo de volta
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="results-container__tabs__content pa-5">
        <Row gutter={16}>
          <Col xs={24} lg={8} xl={6}>
            {Object.values(loadings).some(load => !load) ||
            (inbound.length !== 0 && outbound.length !== 0) ? (
              <Alert />
            ) : (
              <></>
            )}
            {tabActive === 1 ? (
              <FiltersCard
                type="outbound"
                filterTypes={outboundFilterTypes}
                loadings={loadings}
              />
            ) : (
              <FiltersCard
                type="inbound"
                filterTypes={inboundFilterTypes}
                loadings={loadings}
              />
            )}
          </Col>
          <Col xs={24} lg={16} xl={18}>
            {tabActive === 1 ? (
              <Table
                type="outbound"
                flights={outbound}
                loadings={loadings}
                sortTable={sortTableOutbound}
              />
            ) : (
              <Table
                type="inbound"
                flights={inbound}
                loadings={loadings}
                sortTable={sortTableInbound}
              />
            )}
          </Col>
        </Row>
      </div>

      <div className="results-container__footer-mobile">
        <div
          className="results-container__footer-mobile__item"
          onClick={() => {
            setDialogFilters(true);
          }}
        >
          <FiFilter className="footer__icon" />
          <span className="footer__text">Filtrar voos</span>
        </div>
        <div className="results-container__footer-mobile__item">
          <MdRemoveRedEye className="footer__icon" />
          <span className="footer__text">Milhas do voo</span>
        </div>
      </div>

      {tabActive === 1 ? (
        dialogFilters ? (
          <FiltersDialog
            type="outbound"
            filterTypes={outboundFilterTypes}
            loadings={loadings}
            setDialogFilters={setDialogFilters}
          />
        ) : (
          <></>
        )
      ) : dialogFilters ? (
        <FiltersDialog
          type="inbound"
          filterTypes={inboundFilterTypes}
          loadings={loadings}
          setDialogFilters={setDialogFilters}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
