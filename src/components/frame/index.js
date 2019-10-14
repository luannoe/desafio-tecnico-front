import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './header';
import Content from './container';
import Search from './search';
import 'antd/dist/antd.css';
import 'assets/css/style.scss';

export default function App() {
  const dispatch = useDispatch();

  const setWidth = () => {
    dispatch({ type: 'SET_WIDTH', width: window.innerWidth });
  };

  useEffect(() => {
    // Set first width
    setWidth();

    // Listener for another widths
    const handleResize = () => {
      setWidth();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <Search />
      <Content />
    </div>
  );
}
