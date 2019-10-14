import React, { useEffect, useState } from 'react';
import { Select, Alert, Radio, Popover, Divider } from 'antd';
import Users from 'assets/images/icons/users.png';

const { Option } = Select;

const numberChildren = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const numberAdult = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const inputs = [
  { title: 'Adultos', type: 'adults' },
  { title: 'Crianças', subtitle: '2 a 11 anos', type: 'children' },
  { title: 'Bebês', subtitle: '0 a 23 meses', type: 'infants' },
];

export default function Passengers({ passengers, setPassengers }) {
  const [validationChildren, setValidationChildren] = useState(false);
  const [validationNumber, setValidationNumber] = useState(false);
  const { adults, children, infants, cabin } = passengers;

  const onChange = (input, value) => {
    setPassengers({ ...passengers, [input.type]: value });
  };

  const radioChange = e => {
    setPassengers({ ...passengers, cabin: e.target.value });
  };

  useEffect(() => {
    if (children + infants > adults) setValidationChildren(true);
    else setValidationChildren(false);

    if (children + infants + adults > 9) setValidationNumber(true);
    else setValidationNumber(false);
  }, [adults, children, infants]);

  const stringPassengers = () => {
    if (children || infants) return 'passageiros';
    if (adults > 1) return 'adultos';
    return 'adulto';
  };

  const passengersInfo = () => (
    <div
      className={`search__desktop__column ${
        validationChildren || validationNumber
          ? 'search__desktop__column--error'
          : ''
      }`}
    >
      <div className="search__desktop__column__info">
        <span className="search__desktop__column__label">Passageiros</span>

        <span className="search__desktop__column__title">
          {adults + children + infants}

          <span className="search__desktop__column__title__subtitle">
            {stringPassengers()}

            <span className="search__desktop__column__title__subtitle--sub">
              {cabin === 1 ? 'Classe econômica' : 'Classe executiva'}
            </span>
          </span>
        </span>
      </div>
      <img src={Users} alt="Passengers" className="search__desktop__icon" />
    </div>
  );

  const inputRow = input => (
    <div className="search__desktop__passenger-row" key={input.type}>
      <div>
        <p className="mb-0">{input.title}</p>
        {input.subtitle ? (
          <span className="search__desktop__passenger-row__span">
            {input.subtitle}
          </span>
        ) : null}
      </div>

      <Select
        defaultValue={passengers[input.type]}
        style={{ width: 120 }}
        onChange={value => onChange(input, value)}
      >
        {(input.title === 'Adultos' ? numberAdult : numberChildren).map(i => (
          <Option value={i} key={i}>
            {i}
          </Option>
        ))}
      </Select>
    </div>
  );

  return (
    <Popover
      // eslint-disable-next-line
      content={(
        <>
          {inputs.map(input => inputRow(input))}

          <Divider className="ma-0 mt-2" />

          <div className="search__desktop__passenger-row">
            <Radio.Group onChange={radioChange} value={cabin}>
              <Radio value={1}>Classe econômica</Radio>
              <Radio value={2}>Classe executiva</Radio>
            </Radio.Group>
          </div>

          {validationChildren || validationNumber ? (
            <Alert
              className="mb-3"
              message="Oops!"
              description={
                validationNumber
                  ? 'Você pode escolher no máximo 9 passageiros.'
                  : 'Você deve selecionar mais adultos do que crianças e bebês.'
              }
              type="error"
            />
          ) : (
            <></>
          )}
        </>
        // eslint-disable-next-line
      )}
      placement="bottom"
    >
      {passengersInfo()}
    </Popover>
  );
}
