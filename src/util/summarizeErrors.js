import React from 'react';
import css from '../views/Styles.css';

function summarizeErrors(errors) {
  return (
    <ul className={css.noDot}>
      {
        errors.map(error => (
          error.error?.message?.errors.map(x => (
            <li>
              {x.message}
            </li>
          ))
        ))
      }
    </ul>
  );
}

export default summarizeErrors;
