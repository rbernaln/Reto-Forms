import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener este archivo en tu proyecto

const App = () => {
  // Estado del formulario y estado de validación
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    favClass: '1',
  });

  const [validationStates, setValidationStates] = useState({
    emailState: true,
    passwordState: true,
  });

  // Manejo de cambios en los inputs
  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormValues({ ...formValues, password: newPassword });

    // Validación en tiempo real de la contraseña
    if (newPassword.length >= 9 && /\d/.test(newPassword) && /[a-zA-Z]/.test(newPassword)) {
      setValidationStates({ ...validationStates, passwordState: true });
    } else {
      setValidationStates({ ...validationStates, passwordState: false });
    }
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  // Validación del email solo en el submit
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para verificar formato de email
    return emailRegex.test(email);
  };

  const clickSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const isEmailValid = validateEmail(formValues.email);
    const isPasswordValid = validationStates.passwordState;

    // Validar email al hacer clic en submit
    setValidationStates({
      emailState: isEmailValid,
      passwordState: isPasswordValid,
    });

    // Solo alertar los valores si no hay errores de validación
    if (isEmailValid && isPasswordValid) {
      alert(JSON.stringify(formValues));
    } else {
      alert("Hay errores en el formulario, por favor corrígelos.");
    }
  };

  return (
    <div className="app-container">
      <h1>¡Formulario!</h1>

      <form>
        {/* Campo de Email */}
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={formValues.email}
            className={!validationStates.emailState ? 'error-input' : ''}
          />
          {!validationStates.emailState && (
            <p className="error-text">Por favor, introduce un email válido.</p>
          )}
        </div>

        {/* Campo de Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
            className={!validationStates.passwordState ? 'error-input' : ''}
          />
          {!validationStates.passwordState && (
            <p className="error-text">
              Tu contraseña debe tener al menos 9 caracteres, incluir números y letras.
            </p>
          )}
        </div>

        {/* Campo de Clase Favorita */}
        <div className="form-group">
          <label>Favorite Class</label>
          <select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con Tecnologías Web</option>
            <option value="3">Artes Ninja</option>
            <option value="4">Spinjitsu</option>
          </select>
        </div>

        {/* Botón de Submit */}
        <button className="submit-button" onClick={clickSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
