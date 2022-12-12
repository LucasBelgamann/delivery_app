import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function ThisProvider({ children }) {
  const [products, setProducts] = useState([]);
  const contextValue = useMemo(() => ({ products, setProducts }), [products]);

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

ThisProvider.propTypes = { children: PropTypes.node.isRequired };

export default ThisProvider;
