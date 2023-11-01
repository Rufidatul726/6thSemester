import { Card, Container } from 'react-bootstrap'

export const Hero = () => {
  return (
    <div>
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight: '100vh'}}>
            <Card className='p-5 d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-center'>Welcome to LinkedIn</h1>
                <h3 className='text-center'>The Lotus Team</h3>
            </Card>
        </Container>
        
    </div>
  )
}
