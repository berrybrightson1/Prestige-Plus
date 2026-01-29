# Prestige Plus Recruitment UK Platform

A modern work-travel recruitment platform built with Next.js 15, featuring a "Soft Tech" design aesthetic with cream backgrounds (#F9F8F6), floating UI elements, and mobile-first responsive design.

## 🚀 Features

### Public Features
- **Hero Slider**: Engaging homepage with Swiper.js carousel
- **Job Browse**: Search and filter jobs by category
- **Job Details**: Image galleries with lightbox, detailed descriptions
- **Application System**: Submit applications with CV upload
- **Contact Page**: Company information and social media links
- **Command Pill Notifications**: Floating bottom-center notifications for all user actions

### Admin Features
- **Dashboard**: Overview of jobs and applications with stats
- **Job Management**: Create, edit, and manage job listings
- **Multi-Image Upload**: Upload multiple images per job listing
- **Application Tracker**: View and download candidate CVs
- **Status Management**: Draft, Published, and Filled job statuses

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom Soft Tech theme
- **Database**: Supabase + Prisma ORM
- **Authentication**: Simple admin auth (ready for Supabase Auth)
- **File Storage**: Supabase Storage (configured)
- **Animations**: Framer Motion
- **Carousel**: Swiper.js
- **Form Validation**: Zod

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (for database and storage)

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project-url.supabase.co:5432/postgres
```

### 3. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase (when ready)
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Background**: `#F9F8F6` (Cream/Off-white)
- **Accent Navy**: `#1E3A5F`
- **Accent Gold**: `#C9A961`
- **Accent Green**: `#2D5F3F`

### Mobile No-Zoom Protocol
All inputs, textareas, and selects use `16px` base font size to prevent mobile browser zoom on focus.

### Responsive Breakpoints
- Mobile: Default
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

## 🔐 Admin Access

**Demo Credentials:**
- Email: `admin@prestigeplus.com`
- Password: `admin123`

Access admin portal at: `/admin/login`

## 📁 Project Structure

```
├── app/
│   ├── (public pages)
│   │   ├── page.tsx              # Home
│   │   ├── jobs/
│   │   │   ├── page.tsx          # Browse jobs
│   │   │   └── [id]/page.tsx     # Job details
│   │   └── contact/page.tsx      # Contact
│   ├── admin/
│   │   ├── page.tsx              # Dashboard
│   │   ├── login/page.tsx        # Admin login
│   │   ├── jobs/create/page.tsx  # Create job
│   │   └── applications/page.tsx # Applications
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── home/                     # Home page components
│   ├── jobs/                     # Job-related components
│   ├── admin/                    # Admin components
│   └── layout/                   # Header & Footer
├── lib/
│   ├── utils.ts                  # Utility functions
│   ├── validations.ts            # Zod schemas
│   ├── prisma.ts                 # Prisma client
│   └── supabase/                 # Supabase clients
└── prisma/
    └── schema.prisma             # Database schema
```

## 🎯 Key Features Implementation

### Command Pill Notifications
Global notification system using Framer Motion:
```typescript
const { showNotification } = useCommandPill()
showNotification('Success message', 'success')
showNotification('Error message', 'error')
```

### Image Gallery
Multi-image display with lightbox and navigation:
- Thumbnail grid
- Full-screen lightbox
- Keyboard navigation support

### Application Form
- Name, email, message fields
- CV file upload (PDF, DOC, DOCX)
- Form validation with Zod
- Command Pill feedback

## 🚧 Next Steps

1. **Connect Supabase**: Update environment variables with real credentials
2. **Database Migration**: Run `npx prisma db push` to create tables
3. **Storage Buckets**: Create `job-images` and `cvs` buckets in Supabase
4. **Implement File Upload**: Connect ImageUploader to Supabase Storage
5. **API Routes**: Implement actual API endpoints for CRUD operations
6. **Authentication**: Integrate Supabase Auth for admin users
7. **Add Images**: Replace placeholder image paths with actual images
8. **Deploy**: Deploy to Vercel or your preferred platform

## 📞 Contact Information

- **Phone/WhatsApp**: +44 7496 255692 | +44 7424 958971
- **Email**: Info@prestigeplusrecruits.com
- **Social**: @PrestigePlusRecruitment (Instagram, Twitter, Facebook)

## 📄 License

Private project for Prestige Plus Recruitment UK

---

Built with ❤️ using Next.js and Tailwind CSS
