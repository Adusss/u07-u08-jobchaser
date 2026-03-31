import { useState, useEffect } from "react";
import type { Job } from "../../types/types";
import { searchJobsAPI } from "../../services/jobService";
import JobList from "../ui/JobList";
import { authFetch } from "../../api";
import { useFilterStore } from "../../store/filterStore";
import FilterPanel from "../ui/FilterPanel";
import "../../css/JobsPage.css";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const text = useFilterStore((s) => s.text);
  const location = useFilterStore((s) => s.location);

  useEffect(() => {
    if (!query) return;

    const fetchJobs = async () => {
      setLoading(true);
      setError("");

      try {
        const apiResults = await searchJobsAPI(query);

        const localRes = await authFetch(`/jobs/search?title=${encodeURIComponent(query)}`);

        if (!localRes.ok) throw new Error("Local fetch failed");

        const localJobs = await localRes.json();

        const formattedLocalJobs = localJobs.map((job: any) => ({
          ...job,
          headline: job.title,
        }));

        setJobs([...formattedLocalJobs, ...apiResults]);
      } catch (err) {
        console.error(err);
        setError("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [query]);

  const handleSearch = () => {
    setQuery(inputValue);
  };

  const filteredJobs = jobs.filter((job) => {
    const textMatch = !text || job.headline?.toLowerCase().includes(text.toLowerCase());

    const locationMatch = !location || job.workplace_address?.city?.toLowerCase().includes(location.toLowerCase());

    return textMatch && locationMatch;
  });

  return (
    <div className="jobs-page-main">
      <h1 className="jobs-search-title-main">Job Search</h1>

      <div className="inputBox_container">
        <button type="button" className="button-search" onClick={handleSearch}>
          <svg className="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-label="search icon">
            <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z" />
          </svg>
        </button>
        <input className="inputBox" type="text" placeholder="Search For Jobs" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </div>
      <FilterPanel />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <JobList jobs={filteredJobs} />
    </div>
  );
}
