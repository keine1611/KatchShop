import React, { useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import * as CommentApi from '../../../api/comment'

const CommentList = ({comments}) => {
   

    return (
        <div className=' w-full border border-solid p-4 rounded-lg border-gray-300'>
            {comments.length > 0 && comments.map(comment=>
                <CommentItem comment={comment} />
            )}
            
        </div>
    )
}

export default CommentList