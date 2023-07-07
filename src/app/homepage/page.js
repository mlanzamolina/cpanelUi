"use client";
import { useNavigation } from "next/navigation";
import HomeBanner from "./../../components/homepage/HomeBanner";
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
import { Provider } from "react-redux";
import store from "../../store";

export default function Page() {
  const navigation = useNavigation;

  return (
    <>
      <Provider store={store}>
        <ChakraProvider>
          <HomeBanner navigation={navigation} />
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
