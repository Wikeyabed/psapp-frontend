import styles from "./layout.module.css";
import Head from "next/head";

export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div>From layout</div>
      <div>{children}</div>
    </div>
  );
}
