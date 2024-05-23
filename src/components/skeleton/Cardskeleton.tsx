import React from 'react'

const Cardskeleton = () => {
    return (
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="animate-pulse">
               
                <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div> 
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="flex items-center mt-2">
                        <div className="h-10 w-10 bg-gray-300 rounded-full mr-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cardskeleton
