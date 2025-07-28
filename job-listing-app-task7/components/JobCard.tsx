import Image from 'next/image';
import Link from 'next/link';
import { Opportunity } from '@/type/jobs';
import Tag from './tag';
import image1 from '@/public/assets/job1.png'


export default function JobCard({ job, index }: { job: Opportunity; index: number }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="flex p-6 border border-gray-300 rounded-xl shadow-sm gap-6 hover:shadow-md transition">
        <Image
          src={job.logoUrl || image1}
          width={40}
          height={40}
          alt={job.title}
          className="rounded-full w-10 h-10 object-cover"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-xl">{job.title}</h2>
          <p className="text-base font-normal text-gray-500 mt-2"> Company • {job.location}</p>
          <p className="text-base mt-2">{job.description}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <div className='border-r-2 border-gray-200 pr-3'>

            <span
              className={`text-sm font-base px-3 py-1 rounded-full bg-blue-100 text-green-800 border border-gray-200`}
            >
            {job.opType}
            </span>
            </div>
            {job.categories.map(tag => (
              <span key={tag}>
                <Tag category={tag} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
