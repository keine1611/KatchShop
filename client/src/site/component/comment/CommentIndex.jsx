import React,{useEffect, useState} from 'react'
import RatingStatistics from './RatingStatistics'
import CommentBox from './CommentBox'
import CommentList from './CommentList'
import * as CommentApi from '../../../api/comment'

const CommentIndex = ({ idProduct }) => {

    const [comments, setComments] = useState([])
    
    useEffect(()=>{
        CommentApi.getCommentProduct(idProduct)
        .then((result) => {
            setComments(result.data)
        })
    },[])

    return (
        <div className=' w-full flex flex-col gap-4 p-20'>
            <RatingStatistics comments={comments} />
            <CommentBox idProduct={idProduct} />
            <CommentList comments={comments} />
        </div>
    )
}

export default CommentIndex