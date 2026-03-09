import * as z from 'zod';

export const createGroupSchema = z.object({
    name: z.string().min(2, 'Group name must be at least 2 characters'),
    users: z.array(z.string()).min(2, 'Please select at least 2 members'),
});
