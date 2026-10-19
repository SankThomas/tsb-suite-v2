import { ChefHat, HelpingHand, House, Receipt, Store, type LucideIcon } from "lucide-react";

export interface AppDefinition {
  name: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  icon: LucideIcon;
  liveUrl: string;
  github: string;
  featured: boolean;
}

export const apps: AppDefinition[] = [
  {
    name: "Invoicer",
    description: "Create and manage invoices with ease.",
    longDescription:
      "A full-stack invoicing application for creating, managing and tracking invoices, clients and business finances.",
    category: "Finance",
    technologies: ["Next.js", "Convex", "JavaScript", "Tailwind CSS"],
    icon: Receipt,
    liveUrl: "https://invoicerv3-course.vercel.app",
    github: "https://github.com/SankThomas/invoicerv3-course",
    featured: true,
  },
  {
    name: "Instagram Clone",
    description: "A clone of the popular photo sharing website",
    longDescription:
      "A full stack clone of Instagram built using NextJS, Convex, Clerk and TailwindCSS",
    category: "Web App Clones",
    technologies: ["Next.js", "Convex", "JavaScript", "TailwindCSS", "ShadCN"],
    icon: Receipt,
    liveUrl: "https://instagram-clone-bay-one.vercel.app",
    github: "https://github.com/sankthomas/instagram-clone",
    featured: true,
  },
  {
    name: "Rent.io",
    description: "Find your next home on RubyRent.io",
    longDescription:
      "Find your next home on RubyRent.io. Take control of your search at the comfort of your current house. Only leave when you want to check out a listing.",
    category: "Apps",
    technologies: [
      "React",
      "Vite",
      "Convex",
      "JavaScript",
      "TailwindCSS",
      "ShadCN",
    ],
    icon: House,
    liveUrl: "https://rubyrent.vercel.app",
    github: "https://github.com/sankthomas/rentio",
    featured: true,
  },
  {
    name: "Storific",
    description: "A storage system similar to Google Drive",
    longDescription:
      "A smaller rendition of Google Drive, because I don't have the storage space that Google does. It's built using NextJs and Convex.",
    category: "Web App Clones",
    technologies: ["NextJs", "Convex", "JavaScript", "TailwindCSS", "ShadCN"],
    icon: Store,
    liveUrl: "https://storific.vercel.app",
    github: "https://github.com/sankthomas/storific",
    featured: false,
  },
  {
    name: "RecipeHub",
    description: "Create and share recipes",
    longDescription: "Create and share your favorite recipes",
    category: "Apps",
    technologies: ["NextJs", "Convex", "JavaScript", "TailwindCSS", "ShadCN"],
    icon: ChefHat,
    liveUrl: "https://recipehub-one.vercel.app",
    github: "https://github.com/sankthomas/recipehub",
    featured: false,
  },
  {
    name: "Helpdesk",
    description:
      "A knowledge center for your business. Create, share, assign and close tickets",
    longDescription:
      "A knowledge center for your business. Create, share, assign and close tickets",
    category: "Apps",
    technologies: ["React", "Vite", "JavaScript", "TailwindCSS", "ShadCN"],
    icon: HelpingHand,
    liveUrl: "https://tsbhelpdesk.vercel.app/",
    github: "https://github.com/sankthomas/helpdesk",
    featured: false,
  },
];
