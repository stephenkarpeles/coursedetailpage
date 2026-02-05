export interface Course {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  provider: {
    name: string;
    url?: string;
  };
  image?: string;
  duration?: string;
  level?: string;
}
