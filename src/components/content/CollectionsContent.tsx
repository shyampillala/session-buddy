import React, { useEffect, useState } from "react";
import { Plus, MoreHorizontal, Edit, Eye, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cnUtil } from "@/utils/className";

// TypeScript interfaces
interface Collection {
  id: string;
  name: string;
  description?: string;
  sessionIds: string[];
  createdAt: number;
}
interface Session {
  id: string;
  name: string;
  description?: string;
  tabs: any[];
  createdAt: number;
}

export function CollectionsContent() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // For modal and form state
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [selected, setSelected] = useState<Collection | null>(null);

  const [editCol, setEditCol] = useState<Collection | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");


  // Fetch collections & sessions on mount
  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getCollections" }, (res) => {
      if (res?.status === "success") setCollections(res.collections);
      setLoading(false);
    });
    chrome.runtime.sendMessage({ action: "getSessions" }, (res) => {
      if (Array.isArray(res)) setSessions(res);
    });
  }, []);

  // Create collection
  function handleCreateCollection(e: React.FormEvent) {
    e.preventDefault();
    chrome.runtime.sendMessage(
      { action: "addCollection", name: newName, description: newDesc },
      (res) => {
        if (res?.status === "success") {
          setCollections((c) => [...c, res.collection]);
          setShowCreate(false);
          setNewName("");
          setNewDesc("");
        }
      }
    );
  }

  // Delete collection
  function handleDeleteCollection(id: string) {
    if (!window.confirm("Delete this collection?")) return;
    chrome.runtime.sendMessage(
      { action: "deleteCollection", collectionId: id },
      (res) => {
        if (res?.status === "success")
          setCollections((c) => c.filter((col) => col.id !== id));
      }
    );
  }

  // Sessions for a collection
  function sessionsForCollection(col: Collection) {
    return sessions.filter((s) => col.sessionIds.includes(s.id));
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
          <p className="text-gray-600">
            Organize your sessions into themed collections
          </p>
        </div>
        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Collection
        </Button>
      </div>

      {loading ? (
        <p>Loading collections...</p>
      ) : collections.length === 0 ? (
        <div className="text-center text-gray-500">No collections found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="border-gray-200 bg-white hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div
                    className={cnUtil(
                      "w-4 h-4 rounded-full",
                      "bg-blue-500"
                    )}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setEditCol(collection);
                        setEditName(collection.name);
                        setEditDesc(collection.description || "");
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSelected(collection)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Sessions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteCollection(collection.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-gray-900">{collection.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {collection.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {collection.sessionIds?.length ?? 0} sessions
                  </span>
                  <span className="text-gray-500">
                    Created{" "}
                    {new Date(collection.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create New Collection Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleCreateCollection}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-3 w-full max-w-sm relative"
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowCreate(false)}
              tabIndex={-1}
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold mb-1">Create New Collection</h2>
            <input
              className="border p-2 rounded"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Collection Name"
              required
            />
            <input
              className="border p-2 rounded"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)"
            />
            <div className="flex gap-2 justify-end mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      )}


      {editCol && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <form
      onSubmit={e => {
        e.preventDefault();
        chrome.runtime.sendMessage({
          action: "updateCollection",
          collectionId: editCol.id,
          name: editName,
          description: editDesc,
        }, res => {
          if (res?.status === "success") {
            setCollections(cs => cs.map(c => c.id === editCol.id ? { ...c, name: editName, description: editDesc } : c));
            setEditCol(null);
          }
        });
      }}
      className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-3 w-full max-w-sm relative"
    >
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
        onClick={() => setEditCol(null)}
        tabIndex={-1}
      >
        <X className="h-5 w-5" />
      </button>
      <h2 className="text-lg font-bold mb-1">Edit Collection</h2>
      <input
        className="border p-2 rounded"
        value={editName}
        onChange={e => setEditName(e.target.value)}
        placeholder="Collection Name"
        required
      />
      <input
        className="border p-2 rounded"
        value={editDesc}
        onChange={e => setEditDesc(e.target.value)}
        placeholder="Description (optional)"
      />
      <div className="flex gap-2 justify-end mt-2">
        <Button type="button" variant="ghost" onClick={() => setEditCol(null)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
          Save
        </Button>
      </div>
    </form>
  </div>
)}


      {/* View Sessions in Collection Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setSelected(null)}
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h4 className="text-xl font-bold mb-2">
              {selected.name} Sessions
            </h4>
            {sessionsForCollection(selected).length === 0 ? (
              <p className="text-gray-500">No sessions in this collection.</p>
            ) : (
              <ul>
                {sessionsForCollection(selected).map((s) => (
                  <li key={s.id} className="border-b py-2">
                    <strong>{s.name}</strong>
                    <span className="text-xs text-gray-500 ml-2">
                      {s.tabs.length} tabs
                    </span>
                    <div className="text-xs text-gray-500">
                      {s.description}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
