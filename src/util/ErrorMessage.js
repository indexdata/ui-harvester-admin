import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import css from './ErrorMessage.css';

const ErrorMessage = ({ message }) => (
  <div className={css.error}>
    <div className={css.errorHeading}>
      <FormattedMessage id="ui-harvester-admin.error" />
    </div>
    <div className={css.errorBody}>
      {message}
    </div>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default ErrorMessage;
