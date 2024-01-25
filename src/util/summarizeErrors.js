import React from 'react';
import css from '../views/Styles.css';

function summarizeErrors(errors) {
  return (
    <ul className={css.noDot}>
      {
        errors.map(error => {
          const message = error.error?.message;
          const errorList = message?.errors;
          const mm = message.message;

          if (errorList) {
            return errorList.map((x, i) => <li key={i}>{x.message}</li>);
          } else if (mm) {
            return mm;
          } else {
            return error.error?.label;
          }
        })
      }
    </ul>
  );
}

export default summarizeErrors;
