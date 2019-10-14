import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Popover } from 'antd';
import moment from 'moment';
import Calendar from 'assets/images/icons/calendar.png';
import '../style.scss';
import Datepicker from '../components/datepicker';

export default function Airport({
  label,
  placeholder,
  date,
  setDate,
  disabledDate,
}) {
  const dispatch = useDispatch();
  const [dateObj, setDateObj] = useState({});

  useEffect(() => {
    setDateObj({
      year: moment(date, 'DD/MM/YYYY').format('YYYY'),
      month: moment(date, 'DD/MM/YYYY')
        .locale('pt-BR')
        .format('MMMM'),
      day: moment(date, 'DD/MM/YYYY').format('DD'),
    });
  }, [date]);

  const onlyOutbound = () => {
    dispatch({ type: 'SET_INBOUND_FLIGHT', inboundDate: '' });
  };

  return (
    <Popover
      // eslint-disable-next-line
      content={(
        <Datepicker
          date={date}
          setDate={setDate}
          disabledDate={disabledDate}
          placeholder={placeholder}
        />
        // eslint-disable-next-line
      )}
      placement="bottom"
    >
      <div className="search__desktop__column">
        <div className="search__desktop__column__info">
          <span className="search__desktop__column__label">{label}</span>
          {date ? (
            <>
              <span className="search__desktop__column__title">
                {dateObj.day}

                <span className="search__desktop__column__title__subtitle">
                  {dateObj.month}

                  <span className="search__desktop__column__title__subtitle--sub">
                    {dateObj.year}
                  </span>
                </span>
              </span>
            </>
          ) : (
            <span className="search__desktop__column__select--label">
              {placeholder}
            </span>
          )}
        </div>
        {label === 'Volta' ? (
          <span
            className="search__desktop__only-outbound pointer"
            onClick={onlyOutbound}
          >
            SOMENTE IDA
          </span>
        ) : (
          <></>
        )}
        <img src={Calendar} alt="Calendar" className="search__desktop__icon" />
      </div>
    </Popover>
  );
}
