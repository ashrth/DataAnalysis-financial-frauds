import AddTicketForm from './addTicketForm';
import AllTickets from './allTickets';

export default function chat() {
  return (
    <div className="w-full h-full my-10 ml-5 flex flex-col gap-y-10">
      <AddTicketForm />

      <AllTickets />
    </div>
  )
}
