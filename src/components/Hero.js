import React, { useContext } from "react";
import Container from "./Container";
import Nav from "./Nav";
import User from "./User";
import ReposNav from "./ReposNav";
import ReposContainer from "./ReposContainer";
import { GithubContext } from "../context/GithubContext";
import Spinner from "./Spinner";

const Hero = () => {
  const { user, error, isLoading } = useContext(GithubContext);

  if (!isLoading && !user) {
    return (
      <section className="hero">
        <Nav />
        <Container>
          <p className="noUser"> {error} </p>
        </Container>
      </section>
    );
  }
  return (
    <section className="hero">
      <Nav />
      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <User />
            <div className="wrapper">
              <ReposNav />
              <ReposContainer />
            </div>{" "}
          </>
        )}
      </Container>
    </section>
  );
};

export default Hero;
