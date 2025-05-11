import React from 'react'

type Props = {}

const ShimmerUI = (props: Props) => {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="animate-pulse bg-white shadow-md rounded-lg p-8">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="mt-4 h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="mt-4 h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
            </div>
        </div>
    )
}

export default ShimmerUI