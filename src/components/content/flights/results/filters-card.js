import React from 'react';
import { Skeleton } from 'antd';
import Filters from './filters';
import './style.scss';

export default function FiltersCard({ type, filterTypes, loadings }) {
  return (
    <div className="card card--filter">
      <div className="card__header">
        <h3 className="mb-0">Filtre seus resultados por</h3>
      </div>
      <div className="card__content">
        {Object.values(loadings).some(load => load) ? (
          <Skeleton active />
        ) : (
          <Filters filterTypes={filterTypes} type={type} />
        )}
      </div>
    </div>
  );
}
