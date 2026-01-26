import { Button } from "@/components/ui/button";
import { TPayment } from "@/types/payment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Props {
  bookings: TPayment[] | undefined;
}

const BookingTable = ({ bookings }: Props) => {
  console.log(bookings);
  return (
    <div className="rounded-xl border border-slate-900 bg-black p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">My Bookings</h2>
      <Table>
        {/* <TableCaption>My Bookings.</TableCaption> */}
        <TableHeader>
          <TableRow className="text-whiter">
            <TableHead className="text-whiter">Booking ID</TableHead>
            <TableHead className="text-whiter">Event ID</TableHead>
            <TableHead className="text-whiter">Amount</TableHead>
            <TableHead className="text-right text-whiter">Status</TableHead>
            <TableHead className="text-right text-whiter">Date</TableHead>
            <TableHead className="text-right text-whiter">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings &&
            bookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="border-b border-slate-800 transition hover:bg-slate-800/50"
              >
                <TableCell
                  className="py-3 pr-4 font-mono text-xs"
                  title={booking.id}
                >
                  {booking.id.slice(0, 8)}...
                </TableCell>
                <TableCell
                  className="py-3 pr-4 font-mono text-xs"
                  title={booking.event_id}
                >
                  {booking.event_id.slice(0, 8)}...
                </TableCell>
                <TableCell className="py-3 pr-4 font-semibold text-white">
                  ${booking.amount}
                </TableCell>
                <TableCell className="py-3 pr-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${booking.status === "PAID" ? "bg-green-700" : "bg-yellow-700"}`}
                  >
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell className="py-3 text-slate-400 text-center">
                  {new Date(booking.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-3 pr-4 text-center">
                  {booking.status === "PAID" ? (
                    <span> {booking.status}</span>
                  ) : (
                    <Button className="bg-red-600 hover:bg-red-700">
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
