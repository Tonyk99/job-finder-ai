'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import CVInput from '@/components/CVInput';
import ProfileCard from '@/components/ProfileCard';
import JobCard from '@/components/JobCard';
import { UserProfile, JobMatch } from '@/types';

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCVSubmit = async (cvText: string) => {
    setIsLoading(true);
    setError(null);  // Clear previous errors

    // Scroll to results section
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);

    try {
      const response = await fetch('/api/process-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process resume');
      }

      const data = await response.json();
      setProfile(data.profile);
      setJobs(data.jobMatches);
    } catch (error) {
      console.error('Error processing resume:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <Header />

      <main className="py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Find jobs that <span className="italic font-extrabold text-[#E2E8F0]">ACTUALLY</span> fit your CV
          </h1>
          <p className="mt-4 text-lg text-brand-text-subtle">
            Upload your resume and let AI scan the internet for your best job matches.
          </p>

          <CVInput onSubmit={handleCVSubmit} />
        </section>

        {/* Results Section */}
        {isLoading && (
          <div ref={resultsRef} className="mt-16 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
            <p className="mt-4 text-brand-text-subtle">Analyzing your resume and finding matches...</p>
          </div>
        )}

        {error && (
          <div ref={resultsRef} className="mt-16 max-w-2xl mx-auto">
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6">
              <h3 className="text-red-400 font-semibold mb-2">Error Processing Resume</h3>
              <p className="text-red-300">{error}</p>
              <p className="text-brand-text-subtle text-sm mt-4">
                Please check that your Gemini API key is correctly configured in .env.local
              </p>
            </div>
          </div>
        )}

        {profile && jobs.length > 0 && !isLoading && (
          <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProfileCard profile={profile} />

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-white mb-6">Your Best Job Matches</h2>
              <div className="space-y-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
