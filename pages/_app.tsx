// === Styles === //
import 'react-quill/dist/quill.snow.css';

// === Types === //
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
