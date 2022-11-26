import { GetStaticProps } from "next";
import PayIn from "../src/main/containers/PayIn";

export default function PayInPage() {
  return <PayIn />;
}

export const getStaticProps: GetStaticProps = async (context) => ({
  props: {
    sidebar: true,
  },
});
