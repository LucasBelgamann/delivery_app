// import { useState } from 'react';

import { useContext } from 'react';
import Context from '../../context/context';

export default function ButtonAddRem() {
  const { products } = useContext(Context);
  //   const [counter, setCounter] = useState(0);

  const handleAddToCart = (value) => {
    // setCounter(Number(counter + 1));
    console.log(value);
  };

  const handleDecrementCartItem = (value) => {
    // if (counter < 1) {
    //   setCounter(0);
    // } else {
    //   setCounter(Number(counter - 1));
    // }
    console.log(value);
  };

  return (
    <div>
      {products.map((e) => (
        <div className="btn-moreLess" key={ e.name }>
          <button
            type="button"
            onClick={ () => handleDecrementCartItem(e) }
          >
            -
          </button>
          <p>0</p>
          <button
            type="button"
            onClick={ () => handleAddToCart(e) }
          >
            +
          </button>
        </div>
      ))}
    </div>

  );
}
