import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/search/repositories";

interface GitHubRepository {
  html_url: string;
  name: string;
  description: string;
  language: string | null;
  owner: {
    login: string;
  };
}

interface Project {
  github_url: string;
  title: string;
  description: string;
  tech: string[];
}

interface Tool {
  github_username: string;
  Projects: Project[];
}

export const fetchOpenSourceTools = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<GitHubRepository[]> => {

  // Generate a random date within the last year
  const endDate = new Date();
  const startDate = new Date(
    endDate.getFullYear() - 1,
    endDate.getMonth(),
    endDate.getDate()
  );
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  const formattedDate = randomDate.toISOString().split("T")[0];

  
  const response = await axios.get(GITHUB_API_URL, {
    params: {
      q: `${query} created:>${formattedDate}`,
      per_page: perPage,
      page: page,
      sort: "stars",
      order: "desc",
    },
  });
  return response.data.items;
};

export const transformData = (repositories: GitHubRepository[]): Tool[] => {
  const transformed = repositories.map((repo) => ({
    github_username: repo.owner.login,
    Projects: [
      {
        github_url: repo.html_url,
        title: repo.name,
        description: repo.description,
        tech: repo.language ? [repo.language] : [],
      },
    ],
  }));
  return transformed;
};
