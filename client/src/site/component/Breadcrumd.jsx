import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const Breadcrumd = () => {
    const breadcrumbs = useBreadcrumbs()
    const location = useLocation()
    return (
        <div class="max-w-7xl ml-4 px-4 sm:px-6 lg:px-8">
            <div class="flex items-center space-x-2 text-gray-500 text-md">
                {breadcrumbs.map(({ match, breadcrumb }) => {
                    if (match.pathname === location.pathname)
                        return (<span className=''>{breadcrumb}</span>)
                    else
                        return (<>
                            <Link key={match.url} to={match.pathname} className="hover:underline text-black hover:text-gray-600">{breadcrumb}</Link>
                            <span>
                                <svg className="h-5 w-5 leading-none text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </>
                        )
                })}
            </div>
        </div>
    )
}

export default Breadcrumd