import React, { useEffect, useState } from "react";
import { AddToCollectionButton } from "../content/AddToCollectionButton";
// ^ Adjust the path if needed (this is correct if session/ and content/ are siblings inside components/)

import { useSessionBuddy } from "@/hooks/useSessionBuddy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SessionList() {
  const { getSessions, deleteSession, restoreSession } = useSessionBuddy();
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    getSessions().then(setSessions);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteSession(id);
    setSessions(await getSessions());
  };

  const handleRestore = async (tabs: any[]) => {
    await restoreSession(tabs);
  };

  return (
    <div className="space-y-4">
      {sessions.map(session => (
        <Card key={session.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold">{session.name}</div>
              <div className="text-sm text-gray-500">{session.description}</div>
              <div className="text-xs text-gray-400">
                {new Date(session.createdAt).toLocaleString()} • {session.tabs.length} tabs
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <AddToCollectionButton sessionId={session.id} /> <button>Test</button>
              <Button size="sm" onClick={() => handleRestore(session.tabs)}>
                Restore
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(session.id)}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {sessions.length === 0 && (
        <div className="text-center text-gray-400 py-8">No sessions saved yet.</div>
      )}
    </div>
  );
}
