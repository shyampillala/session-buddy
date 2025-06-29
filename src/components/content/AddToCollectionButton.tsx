import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

// Optionally, add a toast for feedback (see comment below)
export function AddToCollectionButton({
  sessionId,
  onAdd,
}: {
  sessionId: string;
  onAdd?: () => void;
}) {
  const [collections, setCollections] = useState<{ id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getCollections" }, (res) => {
      if (res?.status === "success") setCollections(res.collections);
      setLoading(false);
    });
  }, []);

  const handleAdd = (collectionId: string) => {
    chrome.runtime.sendMessage(
      { action: "addSessionToCollection", sessionId, collectionId },
      (res) => {
        if (res?.status === "success") {
          if (onAdd) onAdd();
          // Optional: Show a toast here to confirm addition
        }
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded hover:bg-gray-100 flex items-center text-sm">
          <Plus className="h-4 w-4 mr-1" />
          Add to Collection
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {loading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : collections.length === 0 ? (
          <DropdownMenuItem disabled>No collections</DropdownMenuItem>
        ) : (
          collections.map((col) => (
            <DropdownMenuItem key={col.id} onClick={() => handleAdd(col.id)}>
              {col.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
