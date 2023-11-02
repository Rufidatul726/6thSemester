import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import ViewPostByID from '../components/ViewPostByID'

export const Postscreen = () => {
  const {id} = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('http://localhost:8002/api/posts/'+id)
      console.log(res.data)
      setPost(res.data)
    }
    fetchPost()
  }, [id])

  return (
    <ViewPostByID post={post} />
  )
}
