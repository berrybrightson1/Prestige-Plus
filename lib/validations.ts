import { z } from 'zod'

export const applicationSchema = z.object({
    candidate_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().optional(),
    cv_url: z.string().url('Invalid CV URL'),
})

export const opportunitySchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(50, 'Description must be at least 50 characters'),
    requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
    benefits: z.string().min(20, 'Benefits must be at least 20 characters'),
    location: z.string().min(2, 'Location is required'),
    salary: z.string().min(1, 'Salary is required'),
    company_logo: z.string().url('Invalid logo URL'),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    status: z.enum(['DRAFT', 'PUBLISHED', 'FILLED']).default('PUBLISHED'),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
export type OpportunityFormData = z.infer<typeof opportunitySchema>
