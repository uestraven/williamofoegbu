import { useRouter } from 'next/router';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  pageProps['origin'] = useRouter().query['origin'];
  return <Component {...pageProps} />
}