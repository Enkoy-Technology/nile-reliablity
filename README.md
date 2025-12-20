# Nile Reliability Solutions Website

A modern, professional website for Nile Reliability Solutions - a plant reliability and maintenance consulting company.

## Features

- 🎨 Modern, clean design with Tailwind CSS
- 📱 Fully responsive layout
- ⚡ Built with Next.js 14 and React
- 🎯 Smooth scrolling navigation
- 📧 Contact form with validation
- 🖼️ Optimized images with Next.js Image component

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles and Tailwind imports
├── components/
│   ├── Logo.tsx        # Company logo component
│   ├── Navbar.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── Services.tsx    # Services section
│   ├── Feature.tsx     # Feature card component
│   ├── AuditForm.tsx   # Contact/audit form
│   └── Footer.tsx      # Footer component
└── public/             # Static assets
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hook Form** - Form handling (ready for integration)

## Customization

- Update contact information in `components/AuditForm.tsx`
- Modify services in `components/Services.tsx`
- Adjust colors and styling in `tailwind.config.js` and component files

