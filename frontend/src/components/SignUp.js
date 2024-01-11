import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'


function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister


  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem')
    }else{
      setMessage('')
      dispatch(register(name, email, password))
    }


  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Criar Conta</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <input
          required
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <input
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a Senha"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
