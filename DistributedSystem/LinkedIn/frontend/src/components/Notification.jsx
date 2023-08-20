import { useEffect } from "react"
import { useSelector } from "react-redux" 
import axios from "axios"
import { Card } from "react-bootstrap"


const Notification = () => {
  const [notifications, setNotifications] = useState([])

  const userInfo = useSelector(state => state.auth.userInfo)
  const getNotifications = async () => {
    try {
      const { data } = await axios.get('/api/notifications')
      console.log(data)
      setNotifications(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getNotifications()
  }, [])

  return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Notifications</Card.Title>
            <Card.Text>
              {notifications.map(notification => (
                <p>{notification}</p>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
  )
}

export default Notification
