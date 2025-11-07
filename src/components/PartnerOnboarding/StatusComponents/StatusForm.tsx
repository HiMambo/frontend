"use client";

import { useEffect, useState } from "react";
import { fetchOnboardingApplicationStatus, ApplicationStatus } from "@/lib/api";
import { StatusSuccess } from "./StatusSuccess";
import { StatusPending } from "./StatusPending";
import { StatusRejected } from "./StatusRejected";
import LoadingMessage from "@/components/shared/LoadingMessage";

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
    return <LoadingMessage message="Loading application status..." />
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
