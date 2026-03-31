export type Job = {
  id?: number | string;
  title?: string;
  headline?: string;
  description?: string | { text?: string };
  employer?: { name?: string };
  workplace_address?: {
    street_address?: string;
    city?: string;
    postcode?: string;
    region?: string;
  };
  webpage_url?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
