"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projects } from "@/lib/projects";
import { projectSlugs } from "@/lib/project-pages";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="/#home" aria-label="Gaode Gao home">
        Gaode Gao
        <span className="brand-mark" aria-hidden="true">
          ✳
        </span>
      </a>
      <nav aria-label="Main navigation">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="nav-dropdown">
            Projects <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="nav-menu" align="end" sideOffset={12}>
            <DropdownMenuItem asChild>
              <a href="/#work">All Projects</a>
            </DropdownMenuItem>
            {projects.map((p) => (
              <DropdownMenuItem key={p.id} asChild>
                <a href={`/projects/${projectSlugs[p.id]}`}>{p.title}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="nav-dropdown">
            Experience <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="nav-menu" align="end" sideOffset={12}>
            <DropdownMenuItem asChild>
              <a href="/experience">Work Experience</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/education">Education</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <a className="contact-link" href="mailto:gaodegao35@gmail.com">
          Contact
        </a>
      </nav>
    </header>
  );
}
