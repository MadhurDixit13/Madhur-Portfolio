export interface Experience {
  name: string;
  logo: string;
  position: string;
  duration: string;
  achievements: string[];
  isCurrent: boolean;
  url?: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  gpa: string;
  location: string;
  logo: string;
}

export interface Coursework {
  course: string;
  institution: string;
  category: string;
  description: string;
}

export interface Research {
  title: string;
  institution: string;
  description: string;
  focus: string;
  conferenceId?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  year: number;
  type: 'Personal Project' | 'Portfolio Project' | 'Coursework' | 'Group Project';
  url?: string;
}

export interface Skill {
  category: string;
  skills: string[];
  icon: string;
}

export interface Blog {
  title: string;
  description: string;
  url: string;
  platform: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface PlayerStats {
  technical: number;
  leadership: number;
  innovation: number;
  communication: number;
  problemSolving: number;
  overall: number;
}

export interface PlayerData {
  personalInfo: {
    name: string;
    position: string;
    nationality: string;
    age: number;
    photo: string;
    kitNumber: number;
  };
  experiences: Experience[];
  education: Education[];
  coursework: Coursework[];
  research: Research[];
  projects: Project[];
  skills: Skill[];
  blogs: Blog[];
  stats: PlayerStats;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    phone: string;
    location: string;
  };
}
