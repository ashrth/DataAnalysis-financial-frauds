/* eslint-disable react/prop-types */
import { Card } from "antd";

export default function Ticket({ticket}) {

  return (
    <Card className="border border-slate-500 shadow-md mr-10 min-w-[300px]">
        <span className={`${ticket.status==='open' && 'bg-secondary'} font-bold ${ticket.status==='closed' && 'bg-settingOrange'} text-black py-1 px-2 rounded-md mx-auto`}>{ticket.status}</span>
        <div className="mt-3">
            <p className="font-bold mb-1">{ticket.title}</p>
            <div className="flex">
              <p className="font-bold mr-2 mb-1">confirming station:</p>
              <p>{ticket.confirmingStation}</p>
            </div>
            <p className="">{ticket.description}</p>
        </div>
    </Card>
  )
}
