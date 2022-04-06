import React, { useContext } from "react";
import Container from "./Container";
import Nav from "./Nav";
import User from "./User";
import ReposNav from "./ReposNav";
import ReposContainer from "./ReposContainer";
import { GithubContext } from "../context/GithubContext";

const Hero = () => {
  const { user, error } = useContext(GithubContext);

  return (
    <section className="hero">
      <Nav />
      <Container>
        {user ? (
          <>
            <User />
            <div className="wrapper">
              <ReposNav />
              <ReposContainer />
            </div>{" "}
          </>
        ) : (
          <p className="noUser"> {error} </p>
        )}
      </Container>
    </section>
  );
};

export default Hero;
