import type { Job } from "../../types/types";
import JobItem from "./JobItem";

import "../../css/JobList.css";

type Props = { jobs: Job[] };

function JobList({ jobs }: Props) {
  if (!jobs || jobs.length === 0) return <p>Inga jobb or Search for Job</p>;

  return (
    <div className="joblist-main">
      <ul className="joblist-ul">
        {jobs.map((job) => {
          if (!job) return null;
          return <JobItem key={job.id} job={job} />;
        })}
      </ul>
    </div>
  );
}

export default JobList;
