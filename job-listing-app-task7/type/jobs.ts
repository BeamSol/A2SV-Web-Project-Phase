// export type Opportunity = {
//   title: string;
//   description: string;
//   responsibilities: string[];
//   ideal_candidate: {
//     age: string;
//     gender: string;
//     traits: string[];
//   };
//   when_where: string;
//   about: {
//     posted_on: string;
//     deadline: string;
//     location: string;
//     start_date: string;
//     end_date: string;
//     categories: string[]; 
//     required_skills: string[];
//   };
//   company: string;
//   image: string;
// }

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

