import React from 'react'
import RatingStar from './RatingStar'
import image from '../../../api/image'
import Moment from 'react-moment'


const CommentItem = ({comment}) => {
    return (
        <div className=' mb-4'>
            <article>
                <div class="flex items-center mb-4">
                    <img class="w-10 h-10 me-4 rounded-full" src={image.avatar+comment.customer.account.avatar_acc} alt="" />
                    <div class="font-medium dark:text-white">
                        <p>{comment.customer.name_cus} <time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400"></time></p>
                    </div>
                </div>
                <RatingStar starNum={comment.stars}/>
                <footer class="mb-5 text-sm text-gray-800 dark:text-gray-400"><p>{comment.title}</p></footer>
                <p class="mb-2 text-gray-500 dark:text-gray-400">{comment.content}</p>
                <a href="#" class="block mb-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                <aside>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                    <div class="flex items-center mt-3">
                        <a href="#" class="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                        <a href="#" class="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                    </div>
                </aside>
            </article>
            <div className=' w-full border border-solid mt-4 border-gray-400'></div>
        </div>
    )
}

export default CommentItem