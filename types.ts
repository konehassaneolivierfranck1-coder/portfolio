import { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  year?: string;
  context?: string;
  solution?: string;
  result?: string;
  github?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: LucideIcon;
}

export interface Skill {
  name: string;
  level: string; 
  percentage: number;
  category: 'web' | 'mobile' | 'ia' | 'data';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface Certification {
  id: string;
  title: string;
  institution: string;
  year: string;
  description: string;
  type?: 'degree' | 'certification';
  score?: string;
  mention?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  tasks: string[];
  tech: string[];
  isCurrent?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

export interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}