import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '@/store/app.store';
import { useConversations } from '@/hooks/useConversations';
import { useUsers } from '@/hooks/useUsers';
import { createGroupSchema } from '@/schemas/conversation.schema';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CreateGroupModal = () => {
    const isOpen = useAppStore((state) => state.isGroupModalOpen);
    const toggleModal = useAppStore((state) => state.toggleGroupModal);
    const { createConversation, isCreating } = useConversations();

    const [searchTerm, setSearchTerm] = useState('');
    const { users: searchResults } = useUsers(searchTerm);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(createGroupSchema),
        defaultValues: {
            name: '',
            users: [],
        }
    });

    const toggleUser = (user) => {
        const isSelected = selectedUsers.some(u => u.id === user.id);
        let newSelection;
        if (isSelected) {
            newSelection = selectedUsers.filter(u => u.id !== user.id);
        } else {
            newSelection = [...selectedUsers, user];
        }
        setSelectedUsers(newSelection);
        setValue('users', newSelection.map(u => u.id));
    };

    const onSubmit = (data) => {
        createConversation({
            ...data,
            type: 'group'
        });
        handleClose();
    };

    const handleClose = () => {
        toggleModal(false);
        reset();
        setSelectedUsers([]);
        setSearchTerm('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Group Chat</DialogTitle>
                    <DialogDescription>
                        Enter a group name and select members to start a group conversation.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Group Name</Label>
                        <Input id="name" placeholder="Team Awesome" {...register('name')} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Selected Members ({selectedUsers.length})</Label>
                        <div className="flex flex-wrap gap-2 min-h-[32px] p-2 border rounded-md bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                            {selectedUsers.map(u => (
                                <Badge key={u.id} variant="secondary" className="gap-1 pr-1 font-medium">
                                    {u.name}
                                    <button type="button" onClick={() => toggleUser(u)} className="hover:text-red-500 cursor-pointer">
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            {selectedUsers.length === 0 && <span className="text-xs text-zinc-400">No members selected</span>}
                        </div>
                        {errors.users && <p className="text-xs text-red-500">{errors.users.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="search">Add Members</Label>
                        <Input
                            id="search"
                            placeholder="Search by email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <ScrollArea className="h-[150px] border rounded-md p-2">
                            {searchResults.map(u => {
                                const isSelected = selectedUsers.some(sel => sel.id === u.id);
                                return (
                                    <button
                                        key={u.id}
                                        type="button"
                                        onClick={() => toggleUser(u)}
                                        className="w-full flex items-center justify-between p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} />
                                                <AvatarFallback>{u.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col text-left">
                                                <span className="text-sm font-medium">{u.name}</span>
                                                <span className="text-xs text-zinc-500">{u.email}</span>
                                            </div>
                                        </div>
                                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                                    </button>
                                );
                            })}
                            {searchTerm.length > 2 && searchResults.length === 0 && (
                                <p className="text-center text-xs text-zinc-500 py-4">No users found</p>
                            )}
                            {searchTerm.length <= 2 && (
                                <p className="text-center text-xs text-zinc-400 py-4">Type to search users</p>
                            )}
                        </ScrollArea>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={isCreating}>Create Group</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupModal;
