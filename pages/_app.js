import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from '../redux/store/store'
import { Poppins } from 'next/font/google'; // Import the font

const poppins = Poppins({
  subsets: ['latin'], // Define the subset you want to load
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Optional, specify the font weights you need
  style: ['normal', 'italic'], // Optional, specify normal or italic styles
  display: 'swap', // Optional, improves font load performance by swapping the font in once loaded
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main className={poppins.className}> {/* Apply the font globally */}
       <Component {...pageProps} />
    </main>
    </Provider>
    
  );
}
