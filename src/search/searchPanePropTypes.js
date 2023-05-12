import PropTypes from 'prop-types';


const searchPanePropTypes = {
  // Passed as SASQ parameters
  searchValue: PropTypes.shape({
    query: PropTypes.string,
  }).isRequired,
  getSearchHandlers: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  searchField: PropTypes.any, // eslint-disable-line react/forbid-prop-types

  // Passed explicitly by caller
  defaultWidth: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  updateQuery:PropTypes.func.isRequired,
};


export default searchPanePropTypes;
