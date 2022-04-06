import React, { useContext } from "react";
import { GithubContext } from "../context/GithubContext";
export const Overview = () => {
  const { overview } = useContext(GithubContext);
  let id = 0;

  return (
    <div className="overviewContainer">
      {overview &&
        overview.map((item, index) => (
          <a
            href={item.html_url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={"overview overview-" + ++id}>
              {item.name && <h2>{item.name}</h2>}
              {item.language && (
                <p>
                  <span></span>
                  {item.language}
                </p>
              )}
            </div>
          </a>
        ))}
    </div>
  );
};
export default Overview;
