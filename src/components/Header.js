import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/images/Logo.png";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import styles from "../assets/styles/components/Header.module.scss";

import { useDispatch, useSelector } from "react-redux";
import logout from "../actions/logout";
import toggleProfileTooltip from "../actions/toggleProfileTooltip";

function Header() {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    searchInput: "",
    isSearchCollapsed: true,
    isMenuCollapsed: true,
  });
  const desktopInput = useRef();
  const mobileInput = useRef();
  const signingOut = useRef(false);
  const router = useRouter();

  const { currentUser } = globalState;

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
      !signingOut.current && dispatch(toggleProfileTooltip());
    }, 100);
  };

  const SignOut = () => {
    signingOut.current = true;
    setState((prevState) => ({
      ...prevState,
      isMenuCollapsed: true,
    }));
  };
  useEffect(() => {
    if (signingOut.current) {
      dispatch(toggleProfileTooltip());
      setTimeout(() => {
        signingOut.current = false;
        dispatch(logout());
        router.push("/");
      }, 200);
    }
  }, [state, dispatch]);

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
      return "/home";
    } else if (user.type === "tutor") {
      return "/profile/tutorships";
    }
    return "/";
  };

  const defaultLinkPath = "/";

  return (
    <header className="header headerComponent">
      {currentUser ? (
        <Link
          data-testid="logo-image"
          href={getLinkPath(currentUser) || defaultLinkPath}
        >
          <img className="header__logo" src={Logo} alt="Logo" />
        </Link>
      ) : (
        <Link data-testid="logo-image" href={defaultLinkPath}>
          <img className="header__logo" src={Logo} alt="Logo" />
        </Link>
      )}

      {currentUser && currentUser?.type === "student" && (
        <div className="header__search-container">
          <input
            onChange={handleChange}
            className="search-container__input"
            type="text"
            placeholder="Search"
            onKeyDown={(e) => e.code === "Enter" && search()}
            ref={desktopInput}
          />

          <div className="search-container__icon-container" onClick={search}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      )}

      <div className="mobile-nav-buttons-container">
        {currentUser?.type === "student" && (
          <FontAwesomeIcon onClick={toggleSearchCollapse} icon={faSearch} />
        )}
        <FontAwesomeIcon onClick={toggleMenuCollapse} icon={faBars} />
      </div>

      <div
        className={`mobile-search-input ${
          !state.isSearchCollapsed && "active"
        }`}
      >
        <input
          onChange={handleChange}
          className="search-container__input"
          type="text"
          placeholder="Search"
          onKeyDown={(e) => e.code === "Enter" && search()}
          ref={mobileInput}
        />
        <div className="search-container__icon-container" onClick={search}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      <div className={`mobile-menu ${!state.isMenuCollapsed && "active"}`}>
        {!!globalState.token ? (
          <>
            <div className="mobile-menu__profile-photo-container">
              <img
                className="header__profile-photo"
                src={currentUser.profile_photo}
                alt="Profile"
              />
              <span className="header__profile-name">{currentUser.name}</span>
            </div>
            <div className="mobile-menu__buttons">
              <Link href="/profile/edit" className="profile-tooltip__profile">
                Profile
              </Link>
              <div onClick={SignOut} className="mobile-menu__signout-button">
                Sign out
              </div>
            </div>
          </>
        ) : (
          <div className="mobile__buttons-container">
            <Link href="/profile/edit">
              <button
                onClick={toggleMenuCollapse}
                className="button-container__signin-button"
                type="button"
              >
                Sign in
              </button>
            </Link>
            <Link href="/register">
              <button
                className="button-container__register-button"
                type="button"
                data-testid="register-button"
              >
                Register
              </button>
            </Link>
          </div>
        )}
      </div>

      {!!globalState.token ? (
        <div className="header__profile-photo-container">
          <img
            onClick={profileTooltipCollapse}
            onBlur={() => {
              setTimeout(() => {
                !globalState.isProfileTooltipCollapsed &&
                  profileTooltipCollapse();
              }, 100);
            }}
            className="header__profile-photo"
            src={currentUser.profile_photo}
            alt="Profile"
            tabIndex="1"
          />
          <div
            className={`header__profile-tooltip ${
              !globalState.isProfileTooltipCollapsed && "active"
            }`}
          >
            <h3 className="profile-tooltip__name">{currentUser.name}</h3>
            <Link href="/profile/edit" className="profile-tooltip__profile">
              Profile
            </Link>
            <div
              data-testid="sign-out-button"
              onClick={SignOut}
              className="profile-tooltip__signout"
            >
              Sign out
            </div>
          </div>
        </div>
      ) : (
        <div className="header__buttons-container">
          <Link data-testid="logo-image" href={getLinkPath(currentUser)}>
            <img className="header__logo" src={Logo} alt="Logo" />
          </Link>
          <Link
            to="/register"
            className="button-container__register-button"
            type="button"
            data-testid="register-button"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
