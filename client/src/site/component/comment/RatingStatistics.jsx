import React from 'react'
import RatingStar from './RatingStar'

const RatingStatistics = ({ comments }) => {

    const getPercentRating = (star) => {
        let count = 0
        comments.forEach(element => {
            if (element.stars === star) {
                count++
            }
        })
        if (count === 0)
            return 0
        return ((count / (comments.length)) * 100).toFixed()
    }

    const getAverage = () => {
        let total = 0
        comments.forEach(element => {
            total += element.stars
        })
        if (total === 0)
            return 0
        return (total / (comments.length)).toFixed(1)
    }

    return (
        <div className=' w-3/4 mx-auto'>
            <div className='block'>
                <div className="flex items-center mb-2 gap-2">
                    <RatingStar starNum={Number(getAverage())} />
                    <div>
                        <span className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-400">{getAverage()}</span>
                        <span className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-400">out of</span>
                        <span className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-400">5</span>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{comments.length} global ratings</p>
                <div className="flex items-center mt-4">
                    <a href="#" className="text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline">5 star</a>
                    <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div class="h-5 bg-yellow-500 rounded" style={{ width: getPercentRating(5) + '%' }}></div>
                    </div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{(getPercentRating(5))}%</span>
                </div>
                <div class="flex items-center mt-4">
                    <a href="#" class="text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline">4 star</a>
                    <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div class="h-5 bg-yellow-500 rounded" style={{ width: getPercentRating(4) + '%' }}></div>
                    </div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{(getPercentRating(4))}%</span>
                </div>
                <div class="flex items-center mt-4">
                    <a href="#" class="text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline">3 star</a>
                    <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div class="h-5 bg-yellow-500 rounded" style={{ width: getPercentRating(3) + '%' }}></div>
                    </div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{(getPercentRating(3))}%</span>
                </div>
                <div class="flex items-center mt-4">
                    <a href="#" class="text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline">2 star</a>
                    <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div class="h-5 bg-yellow-500 rounded" style={{ width: getPercentRating(2) + '%' }}></div>
                    </div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{(getPercentRating(2))}%</span>
                </div>
                <div class="flex items-center mt-4">
                    <a href="#" class="text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline">1 star</a>
                    <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div class="h-5 bg-yellow-500 rounded" style={{ width: getPercentRating(1) + '%' }}></div>
                    </div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{(getPercentRating(1))}%</span>
                </div>

            </div>

        </div>
    )
}

export default RatingStatistics