import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>Next Event App</title>
        <meta name="description" content="Event Find App" />
        <meta name="keywords" content="event, next, nextEvent" />
        <meta name="author" content="Akhildev MJ" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
