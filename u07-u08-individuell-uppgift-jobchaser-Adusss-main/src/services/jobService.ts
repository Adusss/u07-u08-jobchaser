export const searchJobsAPI = async (query: string) => {
  const res = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(query)}&limit=10`);

  if (!res.ok) throw new Error("Failed to fetch jobs");

  const data = await res.json();

  return data.hits.map((hit: any) => ({
    id: hit.id,
    headline: hit.headline,
    description: hit.description,
    employer: hit.employer,
    workplace_address: hit.workplace_address,
    webpage_url: hit.webpage_url,
  }));
};
