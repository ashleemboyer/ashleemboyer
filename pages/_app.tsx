import type { AppProps } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'stylesheets/global.scss';
import 'stylesheets/typography.scss';

library.add(fab, fas);

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
