"use client";
import { useCallback, useEffect, useRef, useState } from "react";

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

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/tools?page=${page}`);
      const data = await response.json();
      setTools((prevTools) => [...prevTools, ...data]);
      setHasMore(data.length > 0);
    };

    fetchData();
  }, [page]);

  const lastToolElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, observer]
  );

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center my-8">
        Open-Source Tools for Developers
      </h1>
      <div className="max-w-4xl mx-auto px-4">
        {tools.map((user, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold">{user.github_username}</h2>
            {user.Projects.map((project, idx) => {
              if (index === tools.length - 1) {
                return (
                  <div
                    ref={lastToolElementRef}
                    key={idx}
                    className="mt-4 border-b pb-4"
                  >
                    <a
                      href={project.github_url}
                      target="_blank"
                      className="text-xl text-blue-600 hover:underline"
                    >
                      {project.title}
                    </a>
                    <p>{project.description}</p>
                    <p>Tech: {project.tech.join(", ")}</p>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="mt-4 border-b pb-4">
                    <a
                      href={project.github_url}
                      target="_blank"
                      className="text-xl text-blue-600 hover:underline"
                    >
                      {project.title}
                    </a>
                    <p>{project.description}</p>
                    <p>Tech: {project.tech.join(", ")}</p>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
