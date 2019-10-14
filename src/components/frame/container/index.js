import React, { useEffect } from 'react';
import AirportsPresenter from 'presenter/airports-presenter';
import { useDispatch, useSelector } from 'react-redux';
import { message, notification } from 'antd';
import './style.scss';
import Routes from 'config/routes';

export default function Container() {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);

  const setAirports = airports => {
    dispatch({ type: 'SET_AIRPORTS', airports });
  };

  useEffect(() => {
    const { alertType, content } = alert;
    if (alert.show && alert.title) {
      notification[alertType]({
        placement: 'bottomRight',
        message: alert.title,
        description: content,
      });
    } else if (alert.show) message[alertType](content);
  }, [alert]);

  useEffect(() => {
    AirportsPresenter.getAirports().then(airports => {
      setAirports(airports);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Routes />
    </div>
  );
}
