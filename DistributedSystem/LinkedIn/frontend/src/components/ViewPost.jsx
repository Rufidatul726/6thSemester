import { Container, Col, Row } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'

const ViewPost = () => {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        const res = await axios.get('http://localhost:8000/api/posts/createdby/'+user._id)

        setPosts(res.data)
    }

    useEffect(() => {   
        fetchPosts()
    }, [])

  return (
    <Container>
        <Row className='justify-content-md-center mt-5'>
            <Col xs={12} md={6} className='card mt-5'>
                {posts.length === 0 && 
                    <div className='text-center'>
                        <h1>No Posts has been created yet</h1>
                    </div>
                }
                {posts.map((post) => (
                    <Card key={post._id} post={post} className='my-3 p-3 rounded'>
                        <Card.Body>
                            <Card.Title className='text-primary fs-3 text-bold'>{post.authorName}<span className='text-muted fs-5'> {post.createdAt}</span></Card.Title>
                            {post.content && <Card.Text className='text-dark fs-5'>{post.content}</Card.Text>}
                            {post.image && <Card.Img variant="top" src={`http://localhost:9000/linkedin/${post.image}`} style={{ maxWidth: '300px' }} className='mb-3' />}
                        </Card.Body>
                    </Card>
                ))}
            </Col>
        </Row>
    </Container>
  )
}

export default ViewPost