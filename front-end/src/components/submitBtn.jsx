import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postData } from '../utils/requests';

function SubmitBtn({
  routeSuffix, sendObject, navigation, btnName,
  setter = undefined, dataTestid, disabledBtn }) {
  const [errorRequisiton, setErrorRequisition] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useHistory();

  function handleSubmit() {
    postData(routeSuffix, sendObject)
      .then((data) => {
        if (routeSuffix === 'register') {
          localStorage.setItem('token', data.token);
          // localStorage.setItem('role', data.dataValues.role);
          localStorage.setItem('user', JSON.stringify({
            name: data.dataValues.name,
            role: data.dataValues.role,
            token: data.token,
            email: data.dataValues.email }));
          if (setter) setter(false);
        } else {
          localStorage.setItem('token', data.token);
          // localStorage.setItem('role', data.role);
          localStorage.setItem('user', JSON.stringify({
            name: data.name, role: data.role, token: data.token, email: data.email }));
          if (setter) setter(true);
        }
        navigate.push(navigation);
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
        setErrorRequisition(true);
      });
  }

  function renderMessage() {
    return (
      <span
        data-testid="common_login__element-invalid-email"
      >
        { errorMessage }
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={ () => handleSubmit() }
        data-testid={ dataTestid }
        disabled={ disabledBtn }
      >
        { btnName }
      </button>
      { errorRequisiton && renderMessage() }
    </>
  );
}

export default SubmitBtn;

SubmitBtn.propTypes = {
  routeSuffix: PropTypes.string,
  sendObject: PropTypes.shape({}),
  navigation: PropTypes.string,
  btnName: PropTypes.string,
}.isRequired;
