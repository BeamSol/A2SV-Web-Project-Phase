import React from 'react'
import jobsData from '@/lib/data/jobs.json'
import JobCard from '@/components/JobCard';
import { JobPosting } from '@/type/jobs';

const page = () => {
const data = jobsData.job_postings;
  return (
    <div>
    <div className="max-w-3xl mx-auto py-20 px-4">
        <div className="flex justify-between items-center ">
            <div>
                <h1 className="text-3xl font-extrabold font-">Opportunities</h1>
                <div className="text-gray-500 font-light text-sm mb-6"> Showing {data.length} results</div>
            </div>
            <div className='text-gray-500 font-light text-base items-center'>
                Sort by: 
                <label htmlFor="sort"></label>
                <select name="sort" id="sort" className='text-gray-900'>
                    <option value="mostRelevant">Most Relevant</option>
                    <option value="leastRelevant">Least Relevant</option>
                </select>
            </div>
        </div>
      <div className="flex flex-col gap-9">
        {data.map((job, idx) => (
          <JobCard key={idx} job={job} index={idx} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default page