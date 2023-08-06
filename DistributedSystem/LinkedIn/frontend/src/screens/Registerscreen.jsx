import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link ,  redirect} from 'react-router-dom'
import { FormContainer } from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authslice'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader'
import { useNavigate } from 'react-router-dom'


export const Registerscreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    useEffect(() => {
        if(userInfo){
            navigate('/dashboard')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) =>{
        e.preventDefault()
        if(password !== confirmpassword){
            toast.error('Passwords do not match')
        }
        else{
            try {
                const result = await register({name, email, password}).unwrap()
                if(result){
                    dispatch(setCredentials(result))
                    toast.success('Register Success')
                    navigate('/')
                }
                else{
                    toast.error('Invalid Credentials')
                }
            }
            catch (error) {
                toast.error('Register Failed')
            }
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                {isLoading && <Loader />}
                <Button type='submit' variant='primary' className='mt-3'>Register</Button>
                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
  )
}
