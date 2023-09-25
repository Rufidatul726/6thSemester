import { useEffect,useState } from "react"
import { useSelector } from "react-redux" 
import axios from "axios"
import { Card } from "react-bootstrap"


const Notification = () => {
  const [notifications, setNotifications] = useState([])

  const userInfo = useSelector(state => state.auth.userInfo)

  const gotoPost = () => {
    window.location.href = '/posts'
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
            <Card.Text className="my-3" style={{ maxHeight: '200px', overflowY: 'scroll', backgroundColor: 'beige' }}>
              {notifications.map(notification => (
                <p key={notification._id} className="my-3" style={{ backgroundColor: 'lightblue' }}
                onClick={gotoPost}
                >{notification.message}</p>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
  )
}

export default Notification
