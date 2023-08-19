import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FormContainer } from '../components/FormContainer'
import { useCreatePostMutation } from '../slices/postsApislice'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader'

export const CreatePost = () => {
    const [content, setContent] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate()

    const [createPost, {isLoading}] = useCreatePostMutation()
    const {userInfo} = useSelector(state => state.auth)


    const handleImage = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const submitHandler =async (e) => {
        e.preventDefault()
        try{
            const formData = new FormData()
            formData.append('content', content)
            formData.append('image', selectedFile)
            const config = {
                headers: {  
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.post('/api/posts', formData, config)
            console.log(data)
            if(!data.error){
                toast.success('Post Success')
                navigate('/dashboard')
            }
            else{
                toast.error('Post Failed')
            }
        }catch(error){
            toast.error('Post creation failed')
            console.log(error)
        }
    }

  return (
    <div>
        <FormContainer>
            <h1 >Create a post</h1>
            <Form onSubmit={submitHandler} encType='multipart/form-data'>
                <Form.Group className='my-2' controlId='content'>
                    <Form.Control type='text' placeholder='Start to post' value={content} onChange={(e) => setContent(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='image'>
                    <Form.Control type='file' onChange={handleImage}></Form.Control>
                    <>{selectedFile? <img src={URL.createObjectURL(selectedFile)} alt='image' style={{width: '100px', height: '100px'}}/> : null}
                    </>
                </Form.Group>
                {isLoading && <Loader/>}
                <Button type='submit' variant='primary' className='mt-3'>Post</Button>
            </Form>
        </FormContainer>
    </div>
  )
}
