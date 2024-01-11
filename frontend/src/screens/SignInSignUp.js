import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import SignInForm from '../components/SignIn';
import SignUpForm from '../components/SignUp';
import './SignUpSignIn.css';

export default function SignInSignUp()  {
  const [type, setType] = useState('signIn');

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass = 'container ' + (type === 'signUp' ? 'right-panel-active' : '');

  return (
    <Row>
        <Link to="/" className="back-button">
            <i className="fas fa-chevron-left"></i>
        </Link>
        <Col>
            <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />

                <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                    <h1>Bem vindo de volta!</h1>
                    <p>Já possui conta? Clique aqui para logar</p>
                    <button className="ghost" id="signIn" onClick={() => handleOnClick('signIn')}>
                        Login
                    </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                    <h1>Olá, amigo!</h1>
                    <p>Clique aqui para criar seu cadastro!</p>
                    <button className="ghost " id="signUp" onClick={() => handleOnClick('signUp')}>
                        Sign Up
                    </button>
                    </div>
                </div>
                </div>

            </div>
        </Col>
    </Row>
  );
}
