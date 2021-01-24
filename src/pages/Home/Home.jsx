import React from 'react';
import { useAuth }from '../../components/Store/provider'
import './Home.css';

const PagesHome = () => {
  const { user, signOut } = useAuth()
  
  return (
    <div className="pages-home">
      Bem-vindo {user}
      <br />
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>
    </div>
  );
};

export default PagesHome;
