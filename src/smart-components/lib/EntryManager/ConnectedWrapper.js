import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';

function ConnectedWrapper({ resourcePath, initialValues, underlyingComponent, clonedRecordId, editCount, ...rest }) {
  const okapiKy = useOkapiKy();
  const [record, setRecord] = useState();
  const Component = underlyingComponent;
  const idToLoad = clonedRecordId || initialValues?.id;

  useEffect(() => {
    if (idToLoad) {
      okapiKy(`${resourcePath}/${idToLoad}`)
        .then(res => res.json().then(rec => {
          if (clonedRecordId) delete rec.id;
          setRecord(rec);
        }));
    }
    // If `okpaiKy` is included in the dependency list, the effect fires on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToLoad, resourcePath, editCount]);

  if (!idToLoad) {
    // Creating a new record: pass through
    return <Component initialValues={initialValues} {...rest} />;
  }

  if (!record) {
    return <Loading />;
  }

  return <Component initialValues={record} {...rest} />;
}

ConnectedWrapper.propTypes = {
  resourcePath: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }), // This is .isRequired really, but React sometimes complains that it's undefined when this component isn't even rendered
  underlyingComponent: PropTypes.func, // React component
  clonedRecordId: PropTypes.string,
  editCount: PropTypes.number, // Caller may change this to force a re-fetch
};

export default ConnectedWrapper;
