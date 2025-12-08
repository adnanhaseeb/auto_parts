import { useState } from "react";
import { X } from "lucide-react";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-banner text-banner-foreground py-2 px-4 relative">
      <div className="container mx-auto text-center text-sm">
        <span>Fast Shipping & Quality Guaranteed. Contact us at </span>
        <a href="mailto:abc@gmail.com" className="font-semibold underline hover:no-underline">
          abc@gmail.com
        </a>
        <span> or call </span>
        <br className="sm:hidden" />
        <span className="block sm:inline sm:ml-1">
          <a href="tel:1234567890" className="font-semibold">1234567890</a> for instant support.
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Close announcement"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;