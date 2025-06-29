
import { useSessionBuddy } from '@/hooks/useSessionBuddy';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SaveSessionDialogProps {
  onSave: (name: string, description?: string) => void;
  currentTabCount: number;
}

export function SaveSessionDialog({ onSave, currentTabCount }: SaveSessionDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const { saveCurrentTabs } = useSessionBuddy(); // Add this line

  const handleSave = async () => {
      if (name.trim()) {
        try {
          await saveCurrentTabs(name.trim(), description.trim() || undefined); // <-- Save current tabs to Chrome storage
          onSave(name.trim(), description.trim() || undefined); // Still call your prop to update local app state
          setName('');
          setDescription('');
          setOpen(false);
        } catch (err) {
          alert("Failed to save tabs: " + err);
        }
      }
    };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Save Current Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Current Session</DialogTitle>
          <DialogDescription>
            Save your current {currentTabCount} open tabs as a session for later restoration.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Session Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter session name..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for this session..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
