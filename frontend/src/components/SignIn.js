import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'


function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const logged_screen_path = "/app"

  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin


  useEffect(() => {
    if (userInfo) {
        navigate(logged_screen_path)
    }
  }, [navigate, userInfo, logged_screen_path])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))

    // limpa os campos após o envio
    setEmail('')
    setPassword('')

  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Login</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <input
          type="email"
          placeholder="Email"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button type="submit" >Logar</button>
      </form>
    </div>
  );
}

export default SignInForm;
