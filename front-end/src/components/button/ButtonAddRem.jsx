import { useState } from 'react';

export default function ButtonAddRem() {
  const [counter, setCounter] = useState(0);

  const handleAddToCart = () => {
    setCounter(Number(counter + 1));
  };

  const handleDecrementCartItem = () => {
    if (counter < 1) {
      setCounter(0);
    } else {
      setCounter(Number(counter - 1));
    }
  };

  return (
    <div>

      <div className="btn-moreLess">
        <button
          type="button"
          onClick={ handleDecrementCartItem }
        >
          -
        </button>
        <p>{counter}</p>
        <button
          type="button"
          onClick={ handleAddToCart }
        >
          +
        </button>
      </div>
    </div>

  );
}
