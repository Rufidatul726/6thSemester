import {Nav, Navbar, Container, NavDropdown, Badge} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FaBorderAll, FaSignInAlt, FaSignOutAlt, FaUserPlus} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import {logout} from "../slices/authslice";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import Notification from "./Notification";

const Header = () => {
    const userInfo = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutMutation] = useLogoutMutation()

    const profileHandler = () => {
        navigate('/profile')
    }
    
    const logoutHandler = async () => {
        try {
            await logoutMutation()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            toast.error('Logout Failed')
        }
    }


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"
                    width="30" height="30" className="d-inline-block align-top mx-2" alt="LinkedIn logo"/>
                    LinkedIn
                </Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll ">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <LinkContainer to="/"><Nav.Link><FaBorderAll/> Home</Nav.Link></LinkContainer>
                <LinkContainer to="/about"><Nav.Link><FaBorderAll/> About</Nav.Link></LinkContainer>
                <LinkContainer to="/contact"><Nav.Link><FaBorderAll/> Contact</Nav.Link></LinkContainer>
            </Nav>
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                {userInfo ? (
                    <>
                    <NavDropdown title="Notifications" id="notifications">
                        <NavDropdown.Item><Notification/></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={userInfo.name} id="username">
                        <NavDropdown.Item onClick={profileHandler}><Badge bg="success">{userInfo.name}</Badge></NavDropdown.Item>
                        <NavDropdown.Item onClick = {logoutHandler}><FaSignOutAlt/> Logout</NavDropdown.Item>
                    </NavDropdown>
                    </>
                ) : (
                <>
                <LinkContainer to="/login"><Nav.Link><FaSignInAlt/> Login</Nav.Link></LinkContainer>
                <LinkContainer to="/register"><Nav.Link><FaUserPlus/> Register</Nav.Link></LinkContainer>
                </>
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;
