import React, { useEffect } from "react";
import { LandingPageDescription } from "../components/LandingPageDescription";
import { TutorsContainer } from "../components/TutorsContainer";
import "../assets/styles/pages/landingPage.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function LandingPage() {
  const state = useSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (state.user.token !== null) {
      router.push("/homePage");
    }
  }, [state.user.token, router]);

  return (
    <div className="page">
      <main className="page__inner">
        <LandingPageDescription />
        <TutorsContainer title="Meet some of our best tutors" />
      </main>
    </div>
  );
}

export default LandingPage;
