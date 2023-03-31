import React from 'react';
import { Select } from '@folio/stripes/components';
import { MultiSelectionFilter, deparseFilters } from '@folio/stripes/smart-components';


const NO_VALUE = 'NO';


function renderFilter(intl, filterStruct, updateQuery, field, optionTags, isMulti) {
  const dataOptions = optionTags.map(tag => ({
    value: tag,
    label: intl.formatMessage({ id: `ui-harvester-admin.harvestables.column.${field}.${tag}` }),
  }));

  if (isMulti) {
    return (
      <MultiSelectionFilter
        name={`multifilter-${field}`}
        label={intl.formatMessage({ id: `ui-harvester-admin.harvestables.column.${field}` })}
        dataOptions={dataOptions}
        selectedValues={filterStruct[field]}
        onChange={(group) => {
          const fs2 = { ...filterStruct, [field]: group.values };
          updateQuery({ filters: deparseFilters(fs2) });
        }}
      />
    );
  }

  return (
    <Select
      label={intl.formatMessage({ id: `ui-harvester-admin.harvestables.column.${field}` })}
      dataOptions={[
        { value: NO_VALUE, label: intl.formatMessage({ id: 'ui-harvester-admin.no-value' }) },
        ...dataOptions
      ]}
      value={filterStruct[field] && filterStruct[field][0]}
      onChange={(e) => {
        const val = e.target.value;
        const fs2 = { ...filterStruct };
        delete fs2[field];
        if (val !== NO_VALUE) fs2[field] = [val];
        updateQuery({ filters: deparseFilters(fs2) });
      }}
    />
  );
}


export default renderFilter;
