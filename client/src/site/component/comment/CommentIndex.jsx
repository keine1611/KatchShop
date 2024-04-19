import React,{useEffect, useState} from 'react'
import RatingStatistics from './RatingStatistics'
import CommentBox from './CommentBox'
import CommentList from './CommentList'
import * as CommentApi from '../../../api/comment'

const CommentIndex = ({ idProduct }) => {

    const [comments, setComments] = useState([])
    const [sortedComments, setSortedComments] = useState([])
    
    useEffect(()=>{
        CommentApi.getCommentProduct(idProduct)
        .then((result) => {
            setComments(result.data)
        })
    },[])

    useEffect(() => {

        const arr = [...comments].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
        setSortedComments(arr)
      }, [comments])

    return (
        <div className=' w-full flex flex-col gap-4 p-20'>
            <RatingStatistics comments={sortedComments} />
            <CommentBox idProduct={idProduct} setComments={setComments} />
            <CommentList comments={sortedComments} />
        </div>
    )
}

export default CommentIndex