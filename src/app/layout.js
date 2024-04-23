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
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
         <title>Easy Som</title>
      </head>
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
