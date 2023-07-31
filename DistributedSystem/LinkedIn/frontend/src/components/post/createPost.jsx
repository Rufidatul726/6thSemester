import React from 'react'
import { FormContainer } from '../FormContainer'

export const createPost = () => {
  return (
    <>
        <FormContainer>
            <h1>Create Post</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Update</Button>
            </Form>
        </FormContainer>
    </>
  )
}
