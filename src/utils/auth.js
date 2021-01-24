const auth = {}

auth.login = async ({email, password}) => {    
    let resp = await fetch('http://localhost:8000/userLogin', {
    method: 'post', // opcional 
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({email, password})
    })

    resp = await resp.json();
    return resp
}

export default auth
