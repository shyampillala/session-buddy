import React, { useEffect, useState } from "react";
import { useSessionBuddy } from "@/hooks/useSessionBuddy";
import { SessionTabsView } from "@/components/session/SessionTabsView";
import { Tab } from "@/types/tab";

export function ShowSavedTabsContainer() {
  const { getSessions } = useSessionBuddy();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [sessionName, setSessionName] = useState("Latest Session");

  useEffect(() => {
    getSessions()
      .then((sessions: any[]) => {
        if (sessions && sessions.length > 0) {
          // Sort by createdAt DESC, use the most recent session
          const latest = sessions.sort((a, b) => b.createdAt - a.createdAt)[0];
          setTabs(latest.tabs || []);
          setSessionName(latest.name || "Latest Session");
        } else {
          setTabs([]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <SessionTabsView
      tabs={tabs}
      sessionName={sessionName}
      readonly={true}
    />
  );
}
