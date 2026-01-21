export type Link = {
  label: string;
  url: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  status: "active" | "alumni";
  photo_url?: string;
  bio?: string;
  links?: Link[];
  research_interests?: string[];
  order_index?: number;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags?: string[];
  links?: Link[];
  people_ids?: string[];
};

export type Course = {
  slug: string;
  title: string;
  term: string;
  summary: string;
  location?: string;
  instructors?: string[];
  links?: Link[];
};

export type CourseWithContent = Course & {
  content?: string;
};

export type CourseSchedulePart = {
  title: string;
  tag?: string;
  body?: string;
  kind?: "hero" | "section";
  week?: string;
  partSummary?: string;
  lectures?: CourseLecture[];
};

export type CourseSections = {
  about?: string;
  description?: string;
  questions?: string;
  problems?: string;
  objectives?: string;
  materials?: string;
  materialsList?: {
    recommended_textbooks?: {
      authors?: string;
      title?: string;
      edition?: string | null;
      publisher?: string | null;
      year?: string | null;
      url?: string | null;
    }[];
    weekly_materials_note?: string;
    weekly_materials?: { week?: number | string; items?: { label: string; url?: string | null }[] }[];
  };
  evaluation?: string;
  evaluationData?: {
    grades?: {
      class_participation?: { weight?: string; policy?: string };
      in_class_discussions?: { weight?: string; policy?: string };
      homework_assignments?: {
        count?: number;
        weight?: string;
        submission?: string;
        late_policy?: string;
      };
      midterm_exam?: { weight?: string; coverage?: string };
      project?: {
        total_weight?: string;
        components?: { proposal?: string; final_report?: string; final_presentation?: string };
        notes?: string[];
      };
    };
    deadlines?: { item?: string; due?: string }[];
  };
  evaluationCriteria?: { title: string; detail?: string }[];
  schedule?: string;
  scheduleParts: CourseSchedulePart[];
  finalProject?: string;
  presentations?: string;
};

export type CourseLecture = {
  title: string;
  date?: string;
  body?: string;
};

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  venue?: string;
  year?: number;
  tags?: string[];
  links?: Link[];
  summary?: string;
};

export type HomeContent = {
  tagline?: string;
  headline?: string;
  lede?: string;
  cta_label?: string;
  cta_href?: string;
  secondary_label?: string;
  secondary_href?: string;
  featured_projects?: string[];
  highlights?: { label: string; value: string }[];
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type NewsPost = {
  slug: string;
  preview_text?: string;
  image_url?: string;
  title: string;
  body: string;
  date: string;
  source_url?: string;
  tags?: string[];
  published: boolean;
};
