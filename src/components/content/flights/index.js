import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FlightsPresenter from 'presenter/flights-presenter';
import { Empty, Spin, Icon } from 'antd';
import colors from 'consts/colors';
import ErrorImg from 'assets/images/error.png';
import Results from './results';
import validation from './validators';
import './style.scss';

export default function Flight() {
  const airports = useSelector(state => state.airports.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState({});
  const {
    tripType,
    from,
    to,
    outboundDate,
    inboundDate,
    adults,
    children,
    infants,
    cabin,
  } = useParams();

  const flight = {
    tripType,
    from,
    to,
    outboundDate,
    inboundDate,
    adults: Number(adults),
    children: Number(children),
    infants: Number(infants),
    cabin,
  };

  useEffect(() => {
    if (airports.length > 0 && validation(flight, airports).isValid) {
      const data = {
        ...flight,
        from: airports.find(a => a.abbr === from),
        to: airports.find(a => a.abbr === to),
      };

      dispatch({
        type: 'SET_FLIGHT',
        flight: data,
      });
    }
    // eslint-disable-next-line
  }, [airports]);

  useEffect(() => {
    if (airports.length > 0 && validation(flight, airports).isValid) {
      setLoading(true);
      setIsValid(true);
      const getAirlines = () => {
        FlightsPresenter.getAirlines(flight)
          .then(response => {
            setResults(response);
          })
          .catch(() => {
            dispatch({
              type: 'SHOW_ALERT',
              content: 'Ocorreu um erro na busca. Por favor, tente novamente.',
              alertType: 'error',
            });
          })
          .finally(() => {
            setLoading(false);
          });
      };

      dispatch({ type: 'SET_SEARCH_DIALOG', searchDialog: false });
      getAirlines();
    } else {
      if (airports.length > 0) {
        setLoading(false);
        setErrors(validation(flight, airports).errors);
        dispatch({
          type: 'SHOW_ALERT',
          title: 'Alguns erros foram encontrados',
          content: 'Por favor utilize a busca novamente.',
          alertType: 'error',
        });
      }
      setIsValid(false);
    }
    // eslint-disable-next-line
  }, [airports, from, to, outboundDate, inboundDate, adults, children, infants, cabin]);

  return (
    <div className="flights-container">
      {loading ? (
        <div className="flights-container__loading min-height">
          <Loading />
        </div>
      ) : isValid ? (
        <Results airlineResults={results} />
      ) : (
        <div className="flights-container__error flex-center min-height">
          <Error errors={errors} />
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <Spin
      // eslint-disable-next-line
      indicator={(
        <Icon
          type="loading"
          style={{ fontSize: 64, color: colors.primary }}
          spin
        />
        // eslint-disable-next-line
      )}
    />
  );
}

function Error({ errors }) {
  return (
    <Empty
      image={ErrorImg}
      imageStyle={{
        height: 230,
        marginBottom: 40,
      }}
      // eslint-disable-next-line
      description={(
        <>
          <span className="mb-0 flights-container__error__title">
            Sua busca retornou alguns erros
          </span>
          <span>Veja os erros encontrados:</span>
        </>
        // eslint-disable-next-line
      )}
    >
      <ul className="text-left">
        {errors.map(error => (
          <li key={error.id}>{error.message}</li>
        ))}
      </ul>

      <h4 className="mt-4 info--text">Por favor, utilize a busca novamente!</h4>
    </Empty>
  );
}
