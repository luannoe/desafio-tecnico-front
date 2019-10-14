import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { Select, Alert, Button, Radio } from 'antd';
import colors from 'consts/colors';

const { Option } = Select;

const numberChildren = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const numberAdult = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const inputs = [
  { title: 'Adultos', type: 'adults' },
  { title: 'Crianças', subtitle: '2 a 11 anos', type: 'children' },
  { title: 'Bebês', subtitle: '0 a 23 meses', type: 'infants' },
];

export default function Passengers({ passengers, setPassengers }) {
  const [dialogPassengers, setDialogPassengers] = useState(false);
  const [validationChildren, setValidationChildren] = useState(false);
  const [validationNumber, setValidationNumber] = useState(false);
  const { adults, children, infants, cabin } = passengers;

  const handlePassengers = () => {
    setDialogPassengers(!dialogPassengers);
  };

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

  const passengersInfo = (click = true) => (
    <div
      className={`search__mobile__passengers-input ${
        click ? 'pointer' : 'hover'
      } ${
        validationChildren || validationNumber
          ? 'search__mobile__passengers-input--error'
          : ''
      }`}
      onClick={click ? handlePassengers : null}
    >
      <div>
        <p className="mb-0">
          <strong>{adults + children + infants}</strong> {stringPassengers()}
        </p>
        <span className="search__mobile__passengers-input__subtitle">
          {cabin === 1 ? 'Classe econômica' : 'Classe executiva'}
        </span>
      </div>
      <FiUsers
        color={
          validationChildren || validationNumber ? colors.error : colors.primary
        }
      />
    </div>
  );

  const inputRow = input => (
    <div className="search__mobile__passengers-input__row" key={input.type}>
      <div>
        <p className="mb-0">{input.title}</p>
        {input.subtitle ? (
          <span className="search__mobile__passengers-input__row__span">
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
    <>
      {passengersInfo()}

      {dialogPassengers ? (
        <div className="search__mobile__passengers-input__dialog">
          {passengersInfo(false)}
          {inputs.map(input => inputRow(input))}

          <div className="search__mobile__passengers-input__row">
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

          <Button
            type="primary"
            size="large"
            icon="check-circle"
            disabled={validationChildren || validationNumber}
            block
            onClick={handlePassengers}
          >
            Confirmar
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
