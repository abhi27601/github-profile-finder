import React, { createContext, useState, useEffect } from "react";

export const GithubContext = createContext();

export const GithubState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [overview, setOverview] = useState(null);
  const [search, setSearch] = useState("abhi27601");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getData();
    setSearch("");
  };

  const getData = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${search}`);
      const data = await res.json();
      setIsLoading(false);
      if (data.message) {
        setUser(null);
        setRepos(null);
        setFollowers(null);
        setOverview(null);
        setError("User not found ...");
      } else {
        setUser(data);
        getOverview();
        getRepos();
        getFollowers();
        setError("");
      }
    } catch (error) {
      setUser(null);
      setRepos(null);
      setFollowers(null);
      setOverview(null);
      setError("Error fetching users...");
    }
  };

  const getRepos = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${search}/repos`);
      const data = await res.json();
      setRepos(data);
    } catch (error) {
      setError("Error fetching Repos");
    }
  };

  const getOverview = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${search}/repos?per_page=8&sort=asc`
      );
      const data = await res.json();
      setOverview(data);
    } catch (error) {
      setError("Error fetching Overviews");
    }
  };

  const getFollowers = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${search}/followers`
      );
      const data = await res.json();
      setFollowers(data);
    } catch (error) {
      setError("Error fetching Followers");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
    setSearch("");
  }, []);

  return (
    <GithubContext.Provider
      value={{
        getSearch,
        user,
        repos,
        followers,
        overview,
        search,
        setSearch,
        error,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
