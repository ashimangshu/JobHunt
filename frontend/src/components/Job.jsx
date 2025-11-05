import { Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import React  from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


function Job({job}) {
  const navigate = useNavigate();
  // const jobId = "643a3b8f3b3f3a5f6c8e4d2a";
  const daysAgoFunction = (mongodbTime) =>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();

    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000 * 24 * 60 * 60))
  }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between' >
        <p>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>



      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600 '>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
      </div>

      <div className='flex items-center gap-3 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">save for later</Button>
      </div>
      

    </div>


  )
}

export default Job