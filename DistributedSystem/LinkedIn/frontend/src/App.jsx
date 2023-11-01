//.\minio.exe server "F:\\minio" --address :9000
//run minio server
//F:\MongoDB\Server\6.0\bin mongod.exe --dbpath="F:\MongoDB\data\db"
//connect mongodb compass
//npm run dev
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header/>
      <ToastContainer/>
      <Container className='my-5'>
        <Outlet/>
      </Container>
    </>
  )
}

export default App;