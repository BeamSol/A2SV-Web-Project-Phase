// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Opportunity } from '@/type/jobs';
// import Tag from './tag';
// import image1 from '@/public/assets/job1.png';
// import { useSession } from "next-auth/react";
// import { redirect } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { CiBookmarkCheck, CiBookmark } from 'react-icons/ci';
// import {
//   useGetBookmarksQuery,
//   useAddBookmarkMutation,
//   useRemoveBookmarkMutation,
// } from '@/lib/service/bookmarkService';
// import toast from 'react-hot-toast';

// export default function JobCard({ job, index }: { job: Opportunity; index: number }) {
//   const { data: session } = useSession();
//   const token = session?.accessToken;

//   const { data } = useGetBookmarksQuery(token, {
//     skip: !token,
//   });

//   const bookmarks = data?.data || []; 

//   const [addBookmark] = useAddBookmarkMutation();
//   const [removeBookmark] = useRemoveBookmarkMutation();

//   // Derive initial isBookmarked state from fetched bookmarks
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   useEffect(() => {
//     if (bookmarks && job?.id) {
//       const bookmarked = bookmarks.some((b) => b.eventID === job.id);
//       setIsBookmarked(bookmarked);
//     }
//   }, [bookmarks, job?.id]);



//   const handleBookmarkToggle = async (e: React.MouseEvent) => {
//     e.preventDefault(); 

//     if (!token) {
//       // alert('You need to be logged in to bookmark a job.');
//       toast.error('You need to be logged in to bookmark a job.');
//       redirect('/login');
//       return;
//     }

//     try {
//       if (isBookmarked) {
//         await removeBookmark({ jobId: job.id, token });
//         toast.success('Removed from bookmarks');
//       } else {
//         await addBookmark({ jobId: job.id, token });
//         toast.success('Added to bookmarks');
//       }
//       setIsBookmarked(!isBookmarked);
//     } catch (error) {
//       toast.error('Something went wrong while toggling bookmark.');
//       console.error('Bookmark toggle failed:', error);
//     }
//   };

//   return (
//     <Link href={`/jobs/${job.id}`}>
//       <div className="relative flex p-6 border border-gray-300 rounded-xl shadow-sm gap-6 hover:shadow-md transition">
//         {/* Bookmark icon top-right */}
//         <button
//           onClick={handleBookmarkToggle}
//           className="absolute top-4 right-4 text-2xl text-blue-600 hover:text-blue-800"
//         >
//           {isBookmarked ? <CiBookmarkCheck /> : <CiBookmark />}
//         </button>

//         <Image
//           src={job.logoUrl || image1}
//           width={40}
//           height={40}
//           alt={job.title}
//           className="rounded-full w-10 h-10 object-cover"
//         />
//         <div className="flex-1">
//           <h2 className="font-semibold text-xl">{job.title}</h2>
//           <p className="text-base font-normal text-gray-500 mt-2">Company • {job.location}</p>
//           <p className="text-base mt-2">{job.description}</p>
//           <div className="flex gap-2 mt-2 flex-wrap">
//             <div className="border-r-2 border-gray-200 pr-3">
//               <span className="text-sm font-base px-3 py-1 rounded-full bg-blue-100 text-green-800 border border-gray-200">
//                 {job.opType}
//               </span>
//             </div>
//             {job.categories.map((tag) => (
//               <span key={tag}>
//                 <Tag category={tag} />
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Opportunity } from '@/type/jobs';
import Tag from './tag';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CiBookmarkCheck, CiBookmark } from 'react-icons/ci';
import {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@/lib/service/bookmarkService';
import toast from 'react-hot-toast';

export default function JobCard({ job, index }: { job: Opportunity; index: number }) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const { data } = useGetBookmarksQuery(token, {
    skip: !token,
  });

  const bookmarks = data?.data || [];
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (bookmarks && job?.id) {
      const bookmarked = bookmarks.some((b) => b.eventID === job.id);
      setIsBookmarked(bookmarked);
    }
  }, [bookmarks, job?.id]);

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('You need to be logged in to bookmark a job.');
      redirect('/login');
      return;
    }

    try {
      if (isBookmarked) {
        const response = await removeBookmark({ jobId: job.id, token }).unwrap();
        toast.success('Removed from bookmarks');
        console.log('Remove bookmark response:', response);
      } else {
        const response = await addBookmark({ jobId: job.id, token }).unwrap();
        toast.success('Added to bookmarks');
        console.log('Add bookmark response:', response);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || 'Something went wrong while toggling bookmark.';
      toast.error(errorMessage);
      console.error('Bookmark toggle failed:', {
        error,
        jobId: job.id,
        token,
        isBookmarked,
      });
    }
  };

  return (
    <Link href={`/jobs/${job.id}`}>
      <div
        data-testid="job-card"
        className="relative flex p-6 border border-gray-300 rounded-xl shadow-sm gap-6 hover:shadow-md transition"
      >
        <button
          onClick={handleBookmarkToggle}
          className="absolute top-4 right-4 text-2xl text-blue-600 hover:text-blue-800"
          data-testid="bookmark-button"
        >
          {isBookmarked ? (
            <CiBookmarkCheck data-testid="bookmark-check" />
          ) : (
            <CiBookmark data-testid="bookmark" />
          )}
        </button>

        {job.logoUrl ? (
          <Image
            src={job.logoUrl}
            width={40}
            height={40}
            alt={job.title}
            className="rounded-full w-10 h-10 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Logo</span>
          </div>
        )}

        <div className="flex-1">
          <h2 className="font-semibold text-xl">{job.title}</h2>
          <p className="text-base font-normal text-gray-500 mt-2">Company • {job.location}</p>
          <p className="text-base mt-2">{job.description}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <div className="border-r-2 border-gray-200 pr-3">
              <span className="text-sm font-base px-3 py-1 rounded-full bg-blue-100 text-green-800 border border-gray-200">
                {job.opType}
              </span>
            </div>
            {job.categories.map((tag) => (
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

