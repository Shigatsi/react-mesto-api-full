import React from 'react';
import PopupWithForm from './PopupWithForm';

function Login ({onLogin, ...props}) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    if(data) {
      onLogin(data);
    }
    return
  }

  return (
    <PopupWithForm
      name="login"
      title="Вход"
      submited = "Войти"
      isAuth = {true}
      isOpen={true}
      isRegister={false}
      onSubmit = {handleSubmit}
    >
      <input
        type="text"
        id="login_email"
        name="email"
        minLength="2"
        maxLength="40"
        // pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
        required
        placeholder="Email"
        className="popup__input_theme_auth popup__input"
        value={data.email}
        onChange={handleChange}
      />

      <span
        className='popup__input-error popup__input-error_hidden'
        id='login_email-input-error'></span>
      <input
        type="password"
        id="login_pass"
        name="password"
        minLength="6"
        maxLength="200"
        required
        value = {data.password}
        onChange={handleChange}
        placeholder="Пароль"
        className="popup__input_theme_auth popup__input"
      />
      <span
        className='popup__input-error popup__input-error_hidden'
        id='login_pass-input-error'></span>
    </PopupWithForm>
  )
}

export default Login;
