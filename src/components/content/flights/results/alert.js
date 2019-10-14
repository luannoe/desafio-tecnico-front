import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAirportCity } from 'config/functions';
import breakpoints from 'consts/breakpoints';
import colors from 'consts/colors';
import { Button, Modal, Input, Icon } from 'antd';
import { FiMapPin, FiBell } from 'react-icons/fi';

import './style.scss';

export default function CreateAlert() {
  const { width } = useSelector(state => state.responsive);
  const { from, to } = useSelector(state => state.flight);
  const [dialog, setDialog] = useState(false);

  const handleAlertDialog = () => {
    setDialog(!dialog);
  };

  return (
    <div className="card card--alert">
      <div
        className="card__header"
        onClick={() => {
          handleAlertDialog();
        }}
      >
        <h3 className="mb-0">
          {width > breakpoints.md
            ? 'Alerta de preço'
            : 'Crie um alerta de preço para essa busca'}
        </h3>
        <FiBell style={{ fontSize: 24 }} />
      </div>
      <div className="card__content text-center">
        <p>
          <strong>
            {`Crie um alerta de preço de ${getAirportCity(
              from
            )} para ${getAirportCity(to)}.`}
          </strong>{' '}
          Quando o voo estiver no preço cadastrado, enviaremos um alerta para
          seu e-mail e você economiza ainda mais.
        </p>
        <Button
          block
          type="primary"
          className="mt-5"
          icon="arrow-right"
          onClick={() => {
            handleAlertDialog();
          }}
        >
          <strong className="pl-3">Criar alerta agora</strong>
        </Button>
      </div>

      <Modal
        title="Vamos configurar o seu alerta!"
        centered
        visible={dialog}
        width="600"
        onCancel={() => handleAlertDialog()}
        transitionName="none"
        maskTransitionName="none"
        footer={[
          <Button key="back" onClick={() => handleAlertDialog()}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="btn--dialog"
            onClick={() => handleAlertDialog()}
          >
            Criar alerta
          </Button>,
        ]}
      >
        <div
          className="ant-alert ant-alert-info ant-alert-no-icon flex-center flex-column text-center"
          style={{
            backgroundColor: '#ececec',
            borderWidth: 1,
            borderColor: '#c7c7c7',
          }}
        >
          <span className="ant-alert-message block">
            Você irá receber alertas de preço com valores abaixo de R${' '}
            <strong>356,46</strong>
          </span>
          <span className="ant-alert-message block">
            Valor incluindo <strong>1</strong> passageiro e taxas.
          </span>
        </div>

        <div className="dialog-alert-flights flex-center">
          <span className="dialog-alert-flights__item flex-center">
            <FiMapPin style={{ color: colors.primary, marginRight: 8 }} /> {to}
          </span>
          <Icon type="arrow-right" />
          <span className="dialog-alert-flights__item flex-center">
            <FiMapPin style={{ color: colors.primary, marginRight: 8 }} />{' '}
            {from}
          </span>
        </div>

        <Input
          size="large"
          placeholder="Deixe aqui o e-mail que mais usa"
          suffix={<Icon type="mail" />}
        />
      </Modal>
    </div>
  );
}
