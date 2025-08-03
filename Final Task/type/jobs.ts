export type Opportunity = {
  id: string;
  title: string;
  description: string;
  responsibilities: string; // multiline string with \n
  requirements: string; // string description
  idealCandidate: string; // string description

  categories: string[]; // array of category names
  opType: string; // e.g. 'inPerson' or 'virtual'

  startDate: string; // ISO date string
  endDate: string;
  deadline: string;

  location: string[]; // array of locations

  requiredSkills: string[]; // array of skill names

  whenAndWhere: string; // string description

  orgID: string;

  datePosted: string;
  status: string;

  applicantsCount: number;
  viewsCount: number;

  orgName: string;
  logoUrl: string;

  isBookmarked: boolean;
  isRolling: boolean;

  questions: any | null;
  perksAndBenefits: any | null;

  createdAt: string;
  updatedAt: string;

  orgPrimaryPhone: string;
  orgEmail: string;
  orgWebsite: string;

  average_rating: number;
  total_reviews: number;
};

