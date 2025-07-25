import jobsData from "@/lib/data/jobs.json";
import { notFound } from "next/navigation";
import { JobPosting } from "@/type/jobs";
import Tag from "@/components/tag";
import About from "@/components/about";

export default function JobDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const jobs = jobsData.job_postings;
  const job = jobs[parseInt(id)];
  if (!job) return notFound();

  return (
    <div className="grid grid-cols-4 py-10 px-4 gap-6">
      <div className="col-span-3 ml-8 my-8 mr-16">
        <section>
          <h2 className="text-2xl font-extrabold pb-4">Description</h2>
          <p className="text-base font-normal text-gray-700 pb-14 leading-7">
            {job.description}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold pb-4">Responsibilities</h2>
          <ul className="text-base font-normal text-gray-700 pb-14">
            {job.responsibilities.map((res, idx) => (
              <li key={idx} className="leading-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 inline-block mr-2 text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                {res}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold pb-4">Ideal Candidate</h2>
          <ul className="list-disc text-base font-normal text-gray-800 pb-14 pl-6 leading-7">
            {job.ideal_candidate.traits.map((trait, idx) => {
              const [title, ...rest] = trait.split(":");
              const description = rest.join(":");
              return (
                <li key={idx}>
                  <strong>{title}:</strong>
                  {description}
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold pb-4">When & Where</h2>
          <div className="flex items-center gap-2">
            <div className="p-1 border border-gray-400 rounded-full inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <p className="text-base font-normal text-gray-700 inline-block">
              {job.when_where}
            </p>
          </div>
        </section>
      </div>

      <aside className="mt-6 mr-6">
        <h2 className="text-2xl font-extrabold  my-4">About</h2>
        <div className="flex gap-2 flex-wrap my-2 mb-8 border-b pb-6 border-gray-300">
          <About
            posted_on={job.about.posted_on}
            deadline={job.about.deadline}
            location={job.about.location}
            start_date={job.about.start_date}
            end_date={job.about.end_date}
          />
        </div>
        <h2 className="text-2xl font-extrabold  my-4">Categories:</h2>
        <div className="flex gap-2 flex-wrap my-2 mb-8 border-b pb-6 border-gray-300">
          {job.about.categories.map((category) => (
            <Tag key={category} category={category} />
          ))}
        </div>
        <h2 className="text-2xl font-extrabold  mb-4">Required Skills:</h2>
        <div className="flex gap-2 flex-wrap my-2 ">
          {job.about.required_skills.map((skill) => (
            <span key={skill} className="bg-gray-200 text-sm px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}
