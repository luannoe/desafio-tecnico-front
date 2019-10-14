import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import { FiMapPin } from 'react-icons/fi';
import { clearQuery } from 'config/functions';
import breakpoints from 'consts/breakpoints';
import '../style.scss';
import colors from 'consts/colors';

const { Option } = AutoComplete;

export default function Autocomplete({ airports, airport, setAirport }) {
  const { width } = useSelector(state => state.responsive);
  const [options, setOptions] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    setText(airport);
    // eslint-disable-next-line
  }, []);

  const onSelect = value => {
    setAirport(value);
  };

  const onChange = value => {
    setText(value);
  };

  const handleSearch = value => {
    if (value && value.length > 2)
      setOptions(
        airports.map(opt => (
          <Option key={opt.abbr} value={`${opt.airport} (${opt.abbr})`}>
            {opt.airport} ({opt.abbr})
          </Option>
        ))
      );
    else setOptions(null);
  };

  const searchFilter = (inputValue, option) => {
    const _airports = option.props.children[0].concat(option.props.children[2]);
    return clearQuery(_airports).indexOf(clearQuery(inputValue)) !== -1;
  };

  return (
    <AutoComplete
      value={text}
      onChange={onChange}
      style={{ width: '100%', minWidth: 275 }}
      dataSource={options}
      dropdownMatchSelectWidth={false}
      size="large"
      placeholder="Cidade ou aeroporto"
      filterOption={(inputValue, option) => searchFilter(inputValue, option)}
      notFoundContent={
        options ? 'Nenhum aeroporto ou cidade encontrados' : null
      }
      optionLabelProp="value"
      onSelect={onSelect}
      onSearch={handleSearch}
      onFocus={() => {
        setText('');
        setOptions(null);
      }}
      onBlur={() => {
        setText(airport);
      }}
    >
      <Input
        suffix={
          width > breakpoints.md ? null : <FiMapPin color={colors.primary} />
        }
      />
    </AutoComplete>
  );
}
