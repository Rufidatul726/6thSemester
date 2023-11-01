import { useEffect,useState } from "react"
import axios from "axios"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"


const Notification = () => {
  const [notifications, setNotifications] = useState([])


  const gotoPost = () => {
    
  }

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
            {
              notifications.map(notification => (
                <Card.Text key={notification._id}>
                  <Link to={`/post/${notification.postId}`} onClick={gotoPost}>{notification.senderName} {notification.message}</Link>
                </Card.Text>
              ))
            }
          </Card.Body>
        </Card>
      </>
  )
}

export default Notification
