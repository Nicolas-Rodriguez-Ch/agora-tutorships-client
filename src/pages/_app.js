import { useDispatch, Provider } from "react-redux";
import { wrapper } from "../store";
import { getUserData } from "../slices/userSlice";
import { useEffect } from "react";
import Header from "../components/Header";
import "../assets/styles/global.scss";


function InnerApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserData(token));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <InnerApp Component={Component} {...props} />
    </Provider>
  );
}

export default MyApp;
