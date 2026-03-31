import type { Job } from "../../types/types";

import "../../css/JobItem.css";

export default function JobItem({ job }: { job: Job }) {
  return (
    <li className="job-card">
      <h3 className="job-card-headline">{job.headline}</h3>

      <div className="job-card-body">
        <p>{typeof job.description === "string" ? job.description : job.description?.text}</p>
        <p>{job.employer?.name}</p>

        <div className="job-card-adress">
          <p>Adress: {job.workplace_address?.street_address}</p>
          <p>City :{job.workplace_address?.city}</p>
          <p>Post: {job.workplace_address?.postcode}</p>
          <p>Region: {job.workplace_address?.region}</p>
        </div>
      </div>
      <div className="job-card-id">
        <a href={job.webpage_url}>🔗</a>
        <p>ID:{job.id}</p>
      </div>
    </li>
  );
}
