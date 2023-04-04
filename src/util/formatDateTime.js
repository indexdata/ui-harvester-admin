import { FormattedTime, FormattedDate } from 'react-intl';

function formatDateTime(dt) {
  return (
    <>
      <FormattedTime value={dt} hour="numeric" minute="numeric" second="numeric" />
      {', '}
      <FormattedDate value={dt} year="numeric" month="long" day="numeric" />
    </>
  );
}

export default formatDateTime;
