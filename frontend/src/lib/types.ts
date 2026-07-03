export interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubSearchCount {
  total_count: number;
  incomplete_results: boolean;
}

export interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
}

export interface CVData {
  id: string;
  filename: string;
  file_path: string;
  original_name: string;
  uploaded_at: string;
}
