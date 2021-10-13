import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import '../styles/Admin.css'
import Admin_Panel from './Admin_Panel'
import { Button, TextField } from '@material-ui/core'

function Admin() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [{user}] = useStateValue();

  const admin_email = process.env.REACT_APP_ADMIN_EMAIL;
  const admin_password = process.env.REACT_APP_ADMIN_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault()
    if(email.trim().length > 0 && password.trim().length > 0){
      if(email === admin_email && password === admin_password) {
        setValid(true)
      }
      setErrorMessage('Invalid email or password')
      return true
    }
    setErrorMessage('All Fields are Required')
  }

  return (
    <>
      { !user ? (<Redirect to="/" />) : (
        <div className="container">
          {
            valid ? (<Admin_Panel />) : (
              <div className="admin_login">
                <div className="login__info">
                  <form onSubmit={handleSubmit}>
                    <h4 className="text-center">Admin</h4>
                    <div className="input-group">
                      
                      <TextField name="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" required={false} />
                    </div>
                    <div className="input-group">
                      
                      <TextField name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </div>
                    <Button onClick={handleSubmit} variant="outlined" color="secondary" className="btn btn--lg">Log In As Admin</Button>

                    <p id='errorMessage' className="text-center text-danger pt-1">{errorMessage}</p>
                  </form>
                </div>
              </div>
            )
          }
        </div>
      )}
    </>
  )
}

export default Admin