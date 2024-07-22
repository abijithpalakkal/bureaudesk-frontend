
const EmployeeCardSkeleton = () => {
  return (
    <div className='w-[800px] p-3'>
      <div className='flex justify-around items-center bg-white p-3 px-1 rounded-xl mb-2 border-2 shadow-lg'>
        <div className='w-32'>
          <div className='bg-gray-300 h-4 w-3/4 mb-2 rounded animate-pulse'></div>
          <div className='bg-gray-300 h-4 w-1/2 rounded animate-pulse'></div>
        </div>
        <div className='w-14'>
          <div className='bg-gray-300 h-4 w-full mb-2 rounded animate-pulse'></div>
          <div className='bg-gray-300 h-4 w-3/4 rounded animate-pulse'></div>
        </div>
        <div className='w-24'>
          <div className='bg-gray-300 h-4 w-full mb-2 rounded animate-pulse'></div>
          <div className='bg-gray-300 h-4 w-3/4 rounded animate-pulse'></div>
        </div>
        <div className='w-36'>
          <div className='bg-gray-300 h-4 w-full mb-2 rounded animate-pulse'></div>
          <div className='flex justify-start gap-2 items-center'>
            <div className='bg-gray-300 h-6 w-6 rounded-full animate-pulse'></div>
            <div className='bg-gray-300 h-4 w-3/4 rounded animate-pulse'></div>
          </div>
        </div>
        <div className='w-36'>
          <div className='bg-gray-300 h-4 w-full mb-2 rounded animate-pulse'></div>
          <div className='flex justify-start gap-2 items-center'>
            <div className='bg-gray-300 h-6 w-6 rounded-full animate-pulse'></div>
            <div className='bg-gray-300 h-4 w-3/4 rounded animate-pulse'></div>
          </div>
        </div>
        <div className='w-20 text-sm'>
          <div className='bg-gray-300 h-4 w-3/4 mb-2 rounded animate-pulse'></div>
          <div className='bg-gray-300 h-4 w-1/2 rounded animate-pulse'></div>
        </div>
        <div className='w-28 flex justify-center items-center'>
          <div className='bg-gray-300 h-4 w-full rounded animate-pulse'></div>
        </div>
        <div className='w-20'>
          <div className='bg-gray-300 h-4 w-full mb-2 rounded animate-pulse'></div>
          <div className='bg-gray-300 h-4 w-3/4 rounded animate-pulse'></div>
        </div>
        <div className=''>
          <div className='bg-gray-300 h-4 w-16 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCardSkeleton
