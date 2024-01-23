'use client';
import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';

export default function Home() {
  const [name, setName] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('name');
    setName(savedData || '');
    setDataLoaded(true);
  }, []);



  return (
    <main>
      
    </main>
  );
}
