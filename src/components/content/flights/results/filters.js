import React from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import './style.scss';

export default function Filters({ type, filterTypes }) {
  const dispatch = useDispatch();

  const changeFilter = (filterType, filter) => {
    dispatch({
      type: `SET_FILTER`,
      flightType: type,
      filterType,
      filter,
    });
  };

  return (
    <div className="filter-type">
      {Object.keys(filterTypes).map(key => (
        <div key={filterTypes[key].label}>
          {filterTypes[key].filters ? (
            <div className="mb-4">
              <h4>{filterTypes[key].label}</h4>
              {Object.keys(filterTypes[key].filters).map(filterKey => (
                <Checkbox
                  checked={filterTypes[key].filters[filterKey]}
                  onChange={() => {
                    changeFilter(key, filterKey);
                  }}
                  key={filterKey}
                >
                  {filterKey}
                </Checkbox>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}
