'use client';
import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import Cookies from 'js-cookie'
import { authenticateWithToken } from './api/services/apiFunctions';

export default function Home() {
  const [name, setName] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

 //useEffect(() => {
 //  const userId = Cookies.get('userId')
 //  console.log("O user ID do fulano é: ", userId)
 //  if (userId && userId != undefined) {
 //    console.log("Tem user Id, entrou na chamada da função para autenticar: ", userId)
 //    authenticate(userId)
 //  }
 //  //const savedData = localStorage.getItem('name');
 //  //setName(savedData || '');
 //  //setDataLoaded(true);
 //}, []);

 //const authenticate = async (token) => {
 //  try {
 //    const userData = await authenticateWithToken(token)
 //    console.log(userData)
 //  } catch (error) {
 //    console.log("Deu erro na tentativa de autenticação: ", error)
 //  }
 //}

  //const check

  return (
    <main>
      
    </main>
  );
}
