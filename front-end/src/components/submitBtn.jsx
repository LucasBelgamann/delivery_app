import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postData } from '../utils/requests';

function SubmitBtn({
  routeSuffix,
  sendObject,
  btnName,
  setter = undefined,
  dataTestid,
  disabledBtn,
}) {
  const [errorRequisiton, setErrorRequisition] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useHistory();

  const vaipraonde = () => {
    const login = localStorage.getItem('user');
    const role = JSON.parse(login)?.role;
    const roles = localStorage.getItem('role');
    if (!login || login === null) return navigate.replace('/login');

    if (
      login
      && window.location.pathname === '/login'
      && role === 'customer'
      && roles === 'customer'
    ) {
      navigate.replace('/customer/products');
    }
    if (
      login
      && window.location.pathname === '/login'
      && role === 'administrator'
      && roles === 'administrator'
    ) {
      return navigate.replace('/admin/manage');
    }
    if (
      login
      && window.location.pathname === '/login'
      && role === 'seller'
      && role === 'seller'
    ) {
      return navigate.replace('/seller/orders');
    }
  };

  function handleSubmit() {
    postData(routeSuffix, sendObject)
      .then((data) => {
        if (routeSuffix === 'register') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.dataValues.role);
          localStorage.setItem('name', data.dataValues.name);
          localStorage.setItem(
            'user',
            JSON.stringify({
              name: data.dataValues.name,
              role: data.dataValues.role,
              token: data.token,
              email: data.dataValues.email,
            }),
            navigate.push('/customer/products'),
          );
          if (setter) setter(false);
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          localStorage.setItem('name', data.name);
          localStorage.setItem(
            'user',
            JSON.stringify({
              name: data.name,
              role: data.role,
              token: data.token,
              email: data.email,
            }),
          );
          if (setter) setter(true);
        }
        vaipraonde();
      })
      .catch(({ response }) => {
        console.log(response);
        setErrorMessage(response.data.message);
        setErrorRequisition(true);
      });
  }

  function renderMessage() {
    return (
      <span data-testid="common_login__element-invalid-email">
        {errorMessage}
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
        className="btn-login"
      >
        {btnName}
      </button>
      {errorRequisiton && renderMessage()}
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
