"use client";
import { useRouter } from "next/navigation";
import LoginHelper from "./../../components/login/loginHelper";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  CSSReset,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../../store";

export default function Page() {
  const navigation = useRouter();

  return (
    <>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <ChakraProvider>
          <CSSReset />
          <LoginHelper navigation={navigation} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

Page.getInitialProps = async (context) => {
  const { client } = context;
  const isClient = client.isClient;

  if (isClient) {
    // Do something on the client side
  }

  return {};
};
