
import NotificationsViewList from "@/feature/notification/views/NotificationViewList";

export default function Notifications() {
  return (
    <div className="container mx-auto mt-24 space-y-6">
      <div className="w-full py-2">
        <NotificationsViewList isOpen={true} />
      </div>
    </div>
  );
}
