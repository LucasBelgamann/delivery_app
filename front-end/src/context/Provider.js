import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function ThisProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [counter, setCounter] = useState([]);
  const [qty, setQty] = useState(0);

  const contextValue = useMemo(
    () => ({ products, setProducts, counter, setCounter, qty, setQty }),
    [counter, products, qty],
  );

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

ThisProvider.propTypes = { children: PropTypes.node.isRequired };

export default ThisProvider;
