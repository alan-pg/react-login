import React from 'react';

const h1Error = ({error}) =>{    
    if(error){
        return(
        <>
            <h1>Senha ou usuario invalido</h1>
        </>
        )
    }
    
}

export default h1Error