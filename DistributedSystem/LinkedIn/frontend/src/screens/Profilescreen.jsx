import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { FormContainer } from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authslice'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader'
import { useUpdateUserMutation } from '../slices/usersApiSlice'


export const Profilescreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.auth)
    const [updateUser, {isLoading}] = useUpdateUserMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo])
    
    const submitHandler = async (e) =>{
        e.preventDefault()
        if(password !== confirmpassword){
            toast.error('Passwords do not match')
        }
        else{
           try {
                const data = await updateUser({_id: userInfo._id, name, email, password}).unwrap()
                console.log(updateUser({_id: userInfo._id, name, email, password}))
                if(data){
                    dispatch(setCredentials(data))
                    toast.success('Profile Updated Successfully ' + userInfo.name)
                }
                else{
                    toast.error('Profile Update Failed')
                }
              }catch (error) {
                console.log(error)
              }
        }
    }

    return (
        <FormContainer>
            <h1>Update Profile</h1>
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
                {isLoading && <Loader/>}
                <Button type='submit' variant='primary' className='mt-3'>Update</Button>
            </Form>
        </FormContainer>
  )
}
