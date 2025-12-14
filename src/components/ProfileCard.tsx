import React from 'react';
import { UserProfile } from '@/types';

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-brand-card rounded-xl h-full p-8">
        <h2 className="text-xl font-semibold text-white">Your Profile (AI Extracted)</h2>

        {/* Skills Section */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-brand-text-subtle">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="bg-brand-teal/20 text-brand-teal text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-brand-text-subtle">Location</h3>
          <p className="text-white mt-1">{profile.location}</p>
        </div>

        {/* Experience Level Section */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-brand-text-subtle">Experience Level</h3>
          <p className="text-white mt-1">{profile.experienceLevel}</p>
        </div>

        {/* Summary Section */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-brand-text-subtle">Summary</h3>
          <p className="text-white mt-1 leading-relaxed">{profile.summary}</p>
        </div>
      </div>
    </aside>
  );
}
