import Head from "next/head";
import { TutorsContainer } from "../components/TutorsContainer";
import Header from "../components/Header";
import styles from "../assets/styles/pages/HomePage.module.scss";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Agora</title>
      </Head>
      <>
        <Header />
        <main className={styles.homepageContainer}>
          <div className={styles.homepageContent}>
            <TutorsContainer title="Find a tutorship" />
          </div>
        </main>
      </>
    </>
  );
}
