import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit'
import './App.css'
import SuccessModal from './SuccessView';

export default function App(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit =async (e) => {
    const data = {username, password};
    console.log(data);
    await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setShowModal(!showModal);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='body'>
     <MDBContainer className="my-5 gradient-form ">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <h4 className="mt-1 mb-5 pb-1">MVC Project</h4>
            </div>

            <p>Please Sign Up</p>


            <MDBInput wrapperClass='mb-4' label='Name' id='form1' value={username} type='text'
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput wrapperClass='mb-4' label='Password' value={password} id='form2' type='password'
              onChange={(e) => setPassword(e.target.value)}
            />


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn onClick={handleSubmit} className="btn btn-outline-dark btn-block mb-4" type='submit'>Sign Up</MDBBtn>
            </div>
          </div>

        </MDBCol>

      </MDBRow>

      </MDBContainer>
      {showModal && <SuccessModal show={showModal} onClose={() => setShowModal(!showModal)} username={username}/>}
    </div>
    
  )
}