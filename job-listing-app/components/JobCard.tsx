import Image from 'next/image';
import Link from 'next/link';
import { JobPosting } from '@/type/jobs';
import Tag from './tag';
import image1 from '@/assets/job1.png'
import image2 from '@/assets/job2.jpg'
import image3 from '@/assets/job3.jpg'
import image4 from '@/assets/job4.jpg'

export default function JobCard({ job, index }: { job: JobPosting; index: number }) {
  return (
    <Link href={`/jobs/${index}`}>
      <div className="flex p-6 border border-gray-300 rounded-xl shadow-sm gap-6 hover:shadow-md transition">
        <Image
          src={index === 0 ? image1 : index === 1 ? image2 : index === 2 ? image3 : image4}
          alt={job.title}
          className="rounded-full w-10 h-10 object-cover"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-xl">{job.title}</h2>
          <p className="text-base font-normal text-gray-500 mt-2">{job.company} • {job.about.location}</p>
          <p className="text-base mt-2">{job.description}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <div className='border-r-2 border-gray-200 pr-3'>

            <span
              className={`text-sm font-base px-3 py-1 rounded-full bg-blue-100 text-green-800 border border-gray-200`}
            >
            Inperson 
            </span> 
            </div>
            {job.about.categories.map(tag => (
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
