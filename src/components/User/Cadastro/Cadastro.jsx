import React, { useState } from 'react';
import UIButton from 'components/UI/Button/Button';

import './Cadastro.css';

function initialState(){
  return {email: '', password: ''};
}

function cadastro({email, password, nome}){

  let data = {
    name: nome,
    email: email,
    password: password
   }
     return fetch('http://localhost:8000/createUser', {
       method: 'post', // opcional 
       headers: {
         'Content-type': 'application/json; charset=UTF-8'
       },
       body: JSON.stringify(data)
     })
       .then(function (response) {
         return response.json()
       }).then(function (resp) {
         console.log('resp json ', resp)         
         return resp     
       })
       .catch(function (err) {
         console.error('erro:',err);
       }); 
  
}

const UserCadastro = () => {
  const [values, setValues] = useState(initialState);
  const [mensagem, setMensagem] = useState('')

  function onChange(event){
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  function onSubmit(event){
    event.preventDefault();
    cadastro(values).then((resp) => {
      if(resp.cadastro){
        setMensagem('Usuário cadastrado com sucesso!')
        console.log('cadastradooo: ', resp)
      }
      
    }
    )

  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Cadastro</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
      <div className="user-login__form-control">
          <label htmlFor="nome">Nome</label>
          <input 
            id="nome" 
            type="text" 
            name="nome" 
            autoComplete="off" 
            onChange={onChange} 
            value={values.name}/>
        </div>
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
          Cadastrar
        </UIButton>
      </form>
      <h1>{mensagem}</h1>
      <a href="/login">Login</a>
    </div>
  );
};

export default UserCadastro;
