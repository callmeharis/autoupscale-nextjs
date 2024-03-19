import NextNProgress from "nextjs-progressbar";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <NextNProgress
        color="#5236ff"
        startPosition={0.3}
        stopDelayMs={200}
        height={10}
        showOnShallow={true}
		
      />
      <AuthProvider Component={Component} pageProps={pageProps} />
    </div>
  );
}
