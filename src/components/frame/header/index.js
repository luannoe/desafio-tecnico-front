import React, { useState, useEffect } from 'react';
import { Icon, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import breakpoint from 'consts/breakpoints';
import moment from 'moment';
import user from 'assets/images/icons/user.png';
import exchangeCoins from 'assets/images/icons/exchange-coins.png';
import messageQuestion from 'assets/images/icons/message-question.png';
import './style.css';

export default function Header() {
  const [appName, setAppName] = useState('');
  const [hour, setHour] = useState('');
  const { width } = useSelector(state => state.responsive);

  useEffect(() => {
    setAppName('Teste Front');
    setHour(moment().format('HH:mm'));
  }, []);

  return (
    <div className="header-container">
      <div className="flex-center">
        <div className="menu-button">
          <div className="menu-icon" />
        </div>
        <Link to="/">
          <h2 className="header-title">{appName}</h2>
        </Link>
      </div>

      <div className="header-container__row">
        <div className="header-container__row--desktop">
          <Tooltip
            placement="top"
            title={width > breakpoint.md ? '' : 'Venda suas milhas'}
          >
            {/* eslint-disable-next-line */}
            <a className="menu-link" href="#">
              <img src={exchangeCoins} alt="Exchange coins" />
              <span>Venda suas milhas</span>
            </a>
          </Tooltip>

          <Tooltip
            placement="top"
            title={width > breakpoint.md ? '' : 'Tire suas dúvidas'}
          >
            {/* eslint-disable-next-line */}
            <a className="menu-link" href="#">
              <img src={messageQuestion} alt="Message box fro question" />
              <span>Tire suas dúvidas</span>
            </a>
          </Tooltip>

          <Tooltip
            placement="top"
            title={width > breakpoint.md ? '' : 'Login ou cadastro'}
          >
            {/* eslint-disable-next-line */}
            <a className="menu-link" href="#">
              <div className="user-icon">
                <img src={user} alt="User" />
              </div>
              <span>Login ou cadastro</span>
            </a>
          </Tooltip>
        </div>

        <div className="header-container__row--mobile">
          <div className="header__hour-content">
            <Icon type="clock-circle" />
            {hour}
          </div>
        </div>
      </div>
    </div>
  );
}
