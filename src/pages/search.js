import { React, useState, useEffect } from "react";
import SearchResult from "../components/searchResult.js";
import SelectPage from "../components/selectPage.js";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../components/Loader.js";
import axios from "../utils/axios.js";
import styles from "../assets/styles/components/searchPage.module.scss";
import { useRouter } from "next/router";

const SearchPage = () => {
  const router = useRouter();
  const { query: { query, page } } = router;
  const [Tutors, setTutors] = useState([]);
  const [Page, setPage] = useState(parseInt(page));
  const [Pages, setPages] = useState(parseInt(page));
  const [notFound, setNotFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      try {
        const responseTut = await axios.get(`/tutorsearch/${query}/${Page}`);
        setTutors(responseTut.data.data);
        const count = responseTut.data.count;
        setPages(parseInt(count / 9));
        router.push({
          pathname: `/search/`,
          query: { query, page: Page }
        }, undefined, { shallow: true });
        if (responseTut.data.data.length > 0) {
          setNotFound(false);
        } else {
          setNotFound(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    search();
  }, [Page, query]);

  useEffect(() => {
    if (parseInt(page) === 1) setPage(parseInt(page));
  }, [page]);

  return (
    <div className={styles.searchPage}>
      {isLoading ? (
        <Loader />
      ) : notFound ? (
        <div className={styles.searchPageNothingFound}>
          <p>Nothing found, please try again</p>
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_buhby0ug.json"
            className={styles.searchPageIllustration}
          ></Player>
        </div>
      ) : (
        <>
          <SearchResult Tutors={Tutors} />
          <SelectPage Page={Page} setPage={setPage} Pages={Pages} />
        </>
      )}
    </div>
  );
};

export default SearchPage;
