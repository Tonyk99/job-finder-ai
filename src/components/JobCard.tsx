import React from 'react';
import { JobMatch } from '@/types';

interface JobCardProps {
  job: JobMatch;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="bg-brand-card rounded-xl p-8">
      <p className="text-brand-text-subtle">{job.salary}</p>
      <h3 className="text-xl font-bold text-white mt-1 font-extrabold">{job.title}</h3>
      <p className="text-brand-text-subtle mt-1">
        {job.company}, {job.location}
      </p>
      <p className="text-sm mt-3">
        <span className="text-brand-text-subtle">Why this matches you: </span>
        <span className="text-green-400">{job.matchReasons.join(', ')}</span>
      </p>
      <div className="flex items-center gap-3 mt-4">
        <button className="text-white font-semibold px-6 py-2 rounded-lg hover-effect hover:bg-purple-800 bg-gradient-to-r from-violet-500 to-indigo-500">
          Apply Now
        </button>
        <button className="h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center transition-colors border border-gray-700 hover:border-gray-500">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
