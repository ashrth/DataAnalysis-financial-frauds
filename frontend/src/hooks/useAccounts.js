import constate from 'constate'
import { useState } from 'react';
import face1 from '../assets/images/face-1.jpg';
import face2 from '../assets/images/face-2.jpg';
import face3 from '../assets/images/face-3.jpg';
import face4 from '../assets/images/face-4.jpg';
import face5 from '../assets/images/face-5.jpeg';
import face6 from '../assets/images/face-6.jpeg';

export function useAccounts() {
  const [accounts, setAccounts] = useState([
    {
        id: '21984',
        img: face1,
        name: 'Abdul'
    },
    {
        id: '32484',
        img: face2,
        name: 'Shavez'
    },
    {
        id: '40295',
        img: face3,
        name: 'Arif'
    },
    {
        id: '12951',
        img: face4,
        name: 'Shehbaz'
    },
    {
        id: '12049',
        img: face5,
        name: 'Azhar'
    },
    {
        id: '20948',
        img: face6,
        name: 'Sahil'
    },
  ]); 

  return {
    accounts
  }
}

export const [AccountsProvider, useAccountsContext] = constate(useAccounts)
