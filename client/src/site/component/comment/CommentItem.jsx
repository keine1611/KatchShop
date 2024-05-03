import React from 'react'
import RatingStar from './RatingStar'
import * as imageApi from '../../../api/image'
import Moment from 'react-moment'


const CommentItem = ({ comment }) => {
    return (
        <div className='mb-4'>
            <article>
                <div class="flex items-center mb-4">
                    <img className="w-12 h-12 me-4 rounded-full border border-gray-400" src={imageApi.avatar + comment.customer.account.avatar_acc} alt="" />
                    <div className="font-medium dark:text-white">
                        <p>{comment.customer.name_cus} </p>
                        <Moment className=' text-gray-400  text-sm mr-3' fromNow>{comment.date.toString()}</Moment>
                        <RatingStar starNum={comment.stars} />
                    </div>
                </div>
                <footer className=" mb-1 ml-14 text-base text-gray-800 dark:text-gray-400"><p>{comment.title}</p></footer>
                <div className='ml-14'>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">{comment.content}</p>
                    <aside>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">0 people found this helpful</p>
                        <div class="flex items-center mt-3">
                            <a href="#" class="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                            <a href="#" class="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                        </div>
                    </aside>
                </div>

            </article>
            <div className=' w-full border border-solid mt-4 border-gray-400'></div>
        </div>
    )
}

export default CommentItem