import jobsData from '@/lib/data/jobs.json';
import { notFound } from 'next/navigation';
import { JobPosting } from '@/type/jobs';
import Tag from '@/components/tag';

export default function JobDetail({ params: { id } }: { params: { id: number } }) {
  const jobs = jobsData.job_postings;
  const job = jobs[parseInt(id)];
  if (!job) return notFound();

  return (
    <div className="grid grid-cols-5 py-10 px-4 gap-6">    
        <div className='col-span-4 ml-8 my-8 mr-16'>
      <section>
        <h2 className="text-2xl font-extrabold pb-4">Description</h2>
        <p className="text-base font-normal text-gray-700 pb-14">{job.description}</p>
      </section>

      <section>
        <h2 className="text-2xl font-extrabold pb-4">Responsibilities</h2>
        <ul className="list-disc text-base font-normal text-gray-700 pb-14">
          {job.responsibilities.map((res, idx) => <li key={idx}>{res}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-extrabold pb-4">Ideal Candidate</h2>
        <ul className="list-disc text-base font-normal text-gray-700 pb-14">
          {job.ideal_candidate.traits.map((trait, idx) => <li key={idx}>{trait}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-extrabold pb-4">When & Where</h2>
        <p className="text-base font-normal text-gray-700">{job.when_where}</p>
      </section>
        </div>

      <aside className="mt-6">
        <h2 className="font-semibold my-4">Categories:</h2>
        <div className="flex gap-2 flex-wrap my-2 mb-8 border-b pb-6 border-gray-300">
          {job.about.categories.map(category => (
            <Tag key={category} category={category} />
          ))}
        </div>
        <h2 className="font-semibold mb-4">Required Skills:</h2>
        <div className="flex gap-2 flex-wrap my-2 ">
          {job.about.required_skills.map(skill => (
            <span key={skill} className="bg-gray-200 text-xs px-2 py-1 rounded">{skill}</span>
          ))}
        </div>
      </aside>
    </div>
  );
}
