import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import UIButton from 'components/UI/Button/Button';
import './Login.css';
import { useAuth } from '../../Store/provider'

function initialState(){
  return {email: '', password: ''};
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState('')
  const history = useHistory();
  const { signIn, isLogged } = useAuth()

  useEffect(() => {
    if(isLogged()) {      
      history.push('/')
    }
},[])

  function onChange(event){
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    })
    setError("")
  }  

  async function onSubmit(event){
    event.preventDefault();   
    await signIn(values)
    history.push('/')    
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">E-mail</label>
          <input 
            id="email" 
            type="text" 
            name="email" 
            autoComplete="off" 
            onChange={onChange} 
            value={values.email}/>
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            onChange={onChange} 
            value={values.password}/>
            
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded          
        >
          Entrar
        </UIButton>      
      </form>
      <h1>{error}</h1>      
      <a href="/cadastro">cadastro</a>
    </div>
  );
};

export default UserLogin;
