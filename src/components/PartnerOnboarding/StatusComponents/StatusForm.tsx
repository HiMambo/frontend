"use client";

import { useEffect, useState } from "react";
import { fetchOnboardingApplicationStatus, ApplicationStatus } from "@/lib/api";
import { StatusSuccess } from "./StatusSuccess";
import { StatusPending } from "./StatusPending";
import { StatusRejected } from "./StatusRejected";

export default function StatusForm() {
  const [status, setStatus] = useState<ApplicationStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const result = await fetchOnboardingApplicationStatus();
      setStatus(result);
    };
    fetchStatus();
  }, []);

  if (!status) {
    return (
      <main className="flex justify-center items-center h-full">
        <span className="body-xl-label text-secondary">Loading status...</span>
      </main>
    );
  }

  switch (status) {
    case "pending":
      return <StatusPending />;
    case "success":
      return <StatusSuccess />;
    case "rejected":
      return <StatusRejected />;
  }
}
