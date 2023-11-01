import { Container, Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

const ViewPostByID = (post) => {

  return (
    <Container>
        <Row className='justify-content-md-center mt-5'>
            <Col xs={12} md={6} className='card mt-5'>
                {!post &&
                    <div className='text-center'>
                        <h1>No Posts has been created yet</h1>
                    </div>
                }
                <Card key={post.post._id} post={post} className='my-3 p-3 rounded'>
                    <Card.Body>
                        <Card.Title className='text-primary fs-3 text-bold'>{post.post.authorName}<span className='text-muted fs-5'> {post.createdAt}</span></Card.Title>
                        {post.post.content && <Card.Text className='text-dark fs-5'>{post.post.content}</Card.Text>}
                        {post.post.image && <Card.Img variant="top" src={`http://localhost:9000/linkedin/${post.post.image}`} style={{ maxWidth: '300px' }} className='mb-3' />}
                    </Card.Body>
                </Card>
                
            </Col>
        </Row>
    </Container>
  )
}

export default ViewPostByID
