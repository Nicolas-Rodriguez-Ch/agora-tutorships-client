import Head from "next/head";
import { TutorsContainer } from "../components/TutorsContainer";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <>
      <Head>
        <title> Agora </title>
      </Head>
      <>
        <Header />
        <main className="homepage-container">
          <div className="homepage-content">
            <TutorsContainer title="Find a tutorship" />
          </div>
        </main>
      </>
    </>
  );
}
