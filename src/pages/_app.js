import { useDispatch, Provider, useSelector } from "react-redux";
import { wrapper } from "../store";
import { getUserData } from "../slices/userSlice";
import { useEffect } from "react";
import Header from "../components/Header";
import "../assets/styles/global.scss";
import ChatBox from "../components/ChatBox";


function InnerApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.currentUser.type);

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
      {userRole === 'student' && <ChatBox/>}
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
