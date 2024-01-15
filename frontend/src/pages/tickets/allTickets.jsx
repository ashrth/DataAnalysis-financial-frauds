import { List, Select } from "antd";
import { useEffect, useState } from "react";
import Ticket from "./ticket";

export default function AllTickets() {
  const [status, setStatus] = useState('All');
  const [tickets, setTickets] = useState([
    {
      title: 'title',
      description: 'afsjogwhsdih oihsglijs ',
      confirmingStation: 'kota',
      status: 'open'
    },
    {
      title: 'title',
      description: 'afsjogwhsdih oihsglijs ',
      confirmingStation: 'kota',
      status: 'closed'
    },
    {
      title: 'title',
      description: 'afsjogwhsdih oihsglijs ',
      confirmingStation: 'kota',
      status: 'open'
    },
  ]);

  useEffect(()=>{

    let fetchURL = '/tickets?status=';

    switch(status){
      case 'All':
        fetchURL += 'all';
        break;
      case 'Closed':
        fetchURL += 'closed';
        break;
      case 'Open':
        fetchURL += 'open';
        break;
      default:
        return;
    }

    console.log(fetchURL);
  },[status]);

  return (
    <div className="flex flex-col gap-y-6">

      {/* selecting status to filter tickets */}
      <div className="flex">
        <p className="font-semibold text-lg mr-5 my-auto">status:</p>
        <Select
          defaultValue='All'
          style={{
            width: 120,
          }}
          options={[
            {
              label: 'All',
              value: 'All'
            },
            {
              label: 'Open',
              value: 'Open'
            },
            {
              label: 'Closed',
              value: 'Closed'
            },
          ]}
        />
      </div>
      
      <div>
        <List 
          dataSource={tickets}
          grid={{xs:1, sm:2, md:3}}
          renderItem={(ticket) => (
            <Ticket ticket={ticket} />
          )}
        />
      </div>
    </div>
  )
}
