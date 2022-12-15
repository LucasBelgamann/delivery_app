import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postData } from '../utils/requestsAdmin';

function SubmitBtnAdmin({
  routeSuffix, sendObject, navigation, btnName,
  setter = undefined, dataTestid, disabledBtn }) {
  const [errorRequisiton, setErrorRequisition] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useHistory();

  function handleSubmit() {
    const TIME = 1000;
    try {
      postData(routeSuffix, sendObject)
        .then(({ data }) => {
          if (setter) setter(data);
          navigate.push(navigation);
          setErrorMessage('Usuário cadastrado com sucesso!');
          setErrorRequisition(true);
          setInterval(() => {
            window.location.reload();
          }, TIME);
        });
    } catch ({ response }) {
      setErrorMessage(response.data.message);
      setErrorRequisition(true);
    }
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

export default SubmitBtnAdmin;

SubmitBtnAdmin.propTypes = {
  routeSuffix: PropTypes.string,
  sendObject: PropTypes.shape({}),
  navigation: PropTypes.string,
  btnName: PropTypes.string,
}.isRequired;
