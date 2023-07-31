import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Form, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from '../components/FormContainer'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authslice'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader'

export const Loginscreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector(state => state.auth)

    useEffect(() => {
        if(userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])
    

    const submitHandler = async (e) =>{
        e.preventDefault()
        try {
            // const data = axios.post('http://localhost:8000/api/users/auth', {email, password})
            // console.log(data.result)
            // if(data){
            //     dispatch(setCredentials(data))
            //     toast.success('Login Success')
            //     navigate('/')
            // }
            const result = await login({email, password}).unwrap()
            if(result){
                dispatch(setCredentials(result))
                toast.success('Login Success')
                navigate('/')
            }
            else{
                console.log(result)
                toast.error('Invalid Credentials')
            }
        }
        catch (error) {
            console.log(error)
            toast.error('Login Failed')
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                {isLoading && <Loader/>}
                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}
