import { Button } from "@/components/ui/button";
import { useState } from "react";
import NotificationDialogView from "../views/NotificationDialogView";

export default function NotificationShowMore() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="link"
        className="text-sm text-primary"
        onClick={() => setIsOpen(true)}
      >
        Xem tất cả
      </Button>

      <NotificationDialogView
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

