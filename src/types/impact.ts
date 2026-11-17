
export interface ImpactSection {
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imageCaption?: string;
}

export interface ImpactProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  date: string;
  organizer: string;
  role: string;
  format: "Online" | "In-person" | "Hybrid";
  shortDescription: string;
  introduction: string;
  coverImage: string;
  coverImageAlt: string;
  sections: ImpactSection[];
  closingStatement: string;
  tags: string[];
  featured?: boolean;
}
