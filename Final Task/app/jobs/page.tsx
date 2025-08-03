'use client';
import React from 'react';
import JobCard from '@/components/JobCard';
import { Opportunity } from '@/type/jobs';
import { useGetOpportunitiesQuery } from '@/lib/service/opportunitiesApi';

const Jobs = () => {
  const { data: response, isLoading, error } = useGetOpportunitiesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;
  if (!response || response.data.length === 0) return <div>No jobs available</div>;

  const { data } = response;

  return (
    <div>
        <div className="max-w-3xl mx-auto py-10 px-4">
          <div className="flex justify-between items-center ">
            <div>
              <h1 className="text-3xl font-main font-bold">Opportunities</h1>
              <div className="text-gray-500 font-light text-sm mb-6">
              Showing {data.length} results
            </div>
          </div>
          <div className="text-gray-500 font-light text-base items-center">
            Sort by:
            <label htmlFor="sort"></label>
            <select name="sort" id="sort" className="text-gray-900">
              <option value="mostRelevant">Most Relevant</option>
              <option value="leastRelevant">Least Relevant</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          {data.map((job: Opportunity, idx: number) => (
            <JobCard key={idx} job={job} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
