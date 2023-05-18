import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/images/Logo.png";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../assets/styles/components/Header.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { logout, toggleProfileTooltip } from "../slices/userSlice";

function Header() {
  const globalState = useSelector((state) => state);
  const isProfileTooltipCollapsed = useSelector(
    (state) => state.user.isProfileTooltipCollapsed
  );

  const dispatch = useDispatch();
  const [state, setState] = useState({
    searchInput: "",
    isSearchCollapsed: true,
    isMenuCollapsed: true,
  });
  const desktopInput = useRef();
  const mobileInput = useRef();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const { currentUser } = globalState.user;

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, searchInput: e.target.value }));
  };

  const toggleSearchCollapse = async () => {
    if (!state.isMenuCollapsed)
      setState((prevState) => ({
        ...prevState,
        isMenuCollapsed: !state.isMenuCollapsed,
      }));
    setState((prevState) => ({
      ...prevState,
      isSearchCollapsed: !state.isSearchCollapsed,
    }));
    setTimeout(() => {
      state.isSearchCollapsed && mobileInput.current.focus();
    }, 100);
  };

  const toggleMenuCollapse = () => {
    if (!state.isSearchCollapsed)
      setState((prevState) => ({
        ...prevState,
        isSearchCollapsed: !prevState.isSearchCollapsed,
      }));
    setState((prevState) => ({
      ...prevState,
      isMenuCollapsed: !prevState.isMenuCollapsed,
    }));
  };

  const profileTooltipCollapse = () => {
    setTimeout(() => {
      !isSigningOut && dispatch(toggleProfileTooltip());
    }, 100);
  };

  const signOut = () => {
    setIsSigningOut(true);
    setState((prevState) => ({
      ...prevState,
      searchInput: "",
      isMenuCollapsed: true,
    }));
  };

  useEffect(() => {
    if (isSigningOut) {
      dispatch(toggleProfileTooltip());
      setTimeout(() => {
        setIsSigningOut(false);
        dispatch(logout());
        router.push("/");
      }, 200);
    }
  }, [isSigningOut, dispatch, router]);

  const search = (e) => {
    if (state.searchInput.length > 0) {
      desktopInput.current.value = "";
      mobileInput.current.value = "";
      !state.isSearchCollapsed &&
        setState((prevState) => ({ ...prevState, isSearchCollapsed: true }));

      router.push({
        pathname: `/search/?query=${state.searchInput}&page=1`,
        state: state.searchInput,
      });
    }
  };

  const getLinkPath = (user) => {
    if (!user) return "/";

    if (user.type === "student") {
      return "/homePage";
    } else if (user.type === "tutor") {
      return "/profile/tutorships";
    }
    return "/";
  };

  const defaultLinkPath = "/";

  return (
    <>
      <Head>
        <title>Agora</title>
      </Head>
      <header className={`${styles.header} ${styles.headerComponent}`}>
        {currentUser ? (
          <Link
            data-testid="logo-image"
            href={getLinkPath(currentUser) || defaultLinkPath}
          >
            <Image
              className={`${styles.headerLogo}`}
              src={Logo}
              alt="Logo"
              width={100}
              height={75}
            />
          </Link>
        ) : (
          <Link data-testid="logo-image" href={defaultLinkPath}>
            <Image
              className={`${styles.headerLogo}`}
              src={Logo}
              alt="Logo"
              width={100}
              height={75}
            />
          </Link>
        )}
        {currentUser && currentUser.type === "student" && (
          <div className={`${styles.headerSearchContainer}`}>
            <input
              onChange={handleChange}
              className={`${styles.searchContainerInput}`}
              type="text"
              placeholder="Search"
              onKeyDown={(e) => e.code === "Enter" && search()}
              ref={desktopInput}
            />

            <div
              className={`${styles.searchContainerIconContainer}`}
              onClick={search}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        )}

        <div className={`${styles.mobileNavButtonsContainer}`}>
          {global.type === "student" && (
            <FontAwesomeIcon onClick={toggleSearchCollapse} icon={faSearch} />
          )}
          <FontAwesomeIcon onClick={toggleMenuCollapse} icon={faBars} />
        </div>

        <div
          className={`${styles.mobileSearchInput} ${
            !state.isSearchCollapsed && `${styles.active}`
          }`}
        >
          <input
            onChange={handleChange}
            className={`${styles.searchContainerInput}`}
            type="text"
            placeholder="Search"
            onKeyDown={(e) => e.code === "Enter" && search()}
            ref={mobileInput}
          />
          <div
            className={`${styles.searchContainerIconContainer}`}
            onClick={search}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <div>
        {!!globalState.user.token ? (
          <div className={`${styles.headerProfilePhotoContainer}`}>
            <Image
              width={100}
              height={75}
              onClick={profileTooltipCollapse}
              onBlur={() => {
                setTimeout(() => {
                  !isProfileTooltipCollapsed && profileTooltipCollapse();
                }, 100);
              }}
              className={`${styles.headerProfilePhoto}`}
              src={
                currentUser.profile_photo || "/assets/images/defaultProfile.jpg"
              }
              alt="Profile"
              tabIndex="1"
            />
            <div
              className={`${styles.headerProfileTooltip} ${
                !isProfileTooltipCollapsed
                  ? styles.headerProfileTooltipActive
                  : ""
              }`}
            >
              <h3 className={`${styles.profileTooltipName}`}>
                {currentUser.name}
              </h3>
              <Link
                href="/profile/edit"
                className={`${styles.profileTooltipProfile}`}
              >
                Profile
              </Link>
              <div
                data-testid="sign-out-button"
                onClick={signOut}
                className={`${styles.profileTooltipSignout}`}
              >
                Sign out
              </div>
            </div>
          </div>
        ) : (
          <div className={`${styles.headerButtonsContainer}`}>
            <Link href="/loginPage">
              <button
                className={`${styles.buttonContainerSigninButton}`}
                type="button"
                data-testid="register-button"
              >
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button
                className={`${styles.buttonContainerRegisterButton}`}
                type="button"
                data-testid="register-button"
              >
                Register
              </button>
            </Link>
          </div>
        )}
        </div>
      </header>
    </>
  );
}

export default Header;
