import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { DatePicker } from 'antd';
import '../style.scss';
import colors from 'consts/colors';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';

export default function Datepicker({
  date,
  setDate,
  disabledDate,
  placeholder,
}) {
  const onChange = value => {
    setDate(value ? value.format('DD/MM/YYYY') : '');
  };

  return (
    <DatePicker
      value={date ? moment(date, 'DD/MM/YYYY') : null}
      disabledDate={disabledDate}
      format="DD/MM/YYYY"
      style={{ width: '100%' }}
      placeholder={placeholder}
      size="large"
      suffixIcon={<FiCalendar color={colors.primary} />}
      locale={locale}
      onChange={onChange}
    />
  );
}
