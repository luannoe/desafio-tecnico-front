import React from 'react';
import { Icon, Button } from 'antd';
import Filters from './filters';
import './style.scss';

export default function FiltersDialog({
  type,
  filterTypes,
  loadings,
  setDialogFilters,
}) {
  return (
    <div className="results-container__tabs__content">
      <div className="results-container__footer-mobile__dialog">
        {Object.values(loadings).some(load => load) ? (
          <div className="min-height flex-center">
            <Icon type="loading" style={{ fontSize: 24 }} spin />
          </div>
        ) : (
          <Filters filterTypes={filterTypes} type={type} />
        )}

        <Button
          block
          size="small"
          type="primary"
          class="mt-5"
          onClick={() => {
            setDialogFilters(false);
          }}
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
}
