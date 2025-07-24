import UserStatusGate from "@/components/permission-check/UserStatusGate";
import GuestHome from "@/app/home/guest";
import ConnectedHome from "@/app/home/connected";

export default function HomePage() {
  return (
    <>
      <UserStatusGate
        guestComponent={<GuestHome />}
        connectedComponent={<ConnectedHome />}
      />
    </>
  );
}