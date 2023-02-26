import "@/styles/reset.css";
import "@/styles/globals.css";
import Layout from "@/components/admin/layout";
export default function App({ Component, pageProps }) {
  return (
    <Layout title="hello1">
      <Component {...pageProps} />
    </Layout>
  );
}
