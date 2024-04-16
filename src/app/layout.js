"use client";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";
import styles from "./styles/Layout.module.css";
import Navbar from "./components/Navbar";
import AccountPreferences from "./components/AccountPreferences";

import { Montserrat } from "next/font/google";
import { MyContextProvider } from './contexts/UseContext';
const montSerrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      <MyContextProvider>
        {/* <AnotherContextProvider> */}
        <div className={styles.mainContainer}>
          <Navbar />
          <AccountPreferences/>
          <div>{children}</div>
          <BootstrapClient/>
        </div>
        {/* </AnotherContextProvider> */}
      </MyContextProvider>
      </body>
    </html>
    
  );
}
