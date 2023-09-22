import { useSelector } from 'react-redux'
import '../styles/index.css'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === '') {
    return null
  }

  return <div className={notification.style}>{notification.message}</div>
}

export default Notification
