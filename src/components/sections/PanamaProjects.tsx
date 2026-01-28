'use client';

import Image from 'next/image';
import { useState } from 'react';
import { GlowCard } from '@/components/ui/aceternity/glow-card';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { BadgeCheck, MapPin, Building } from 'lucide-react';

interface Project {
  name: string;
  brand: string;
  description: string;
  features: string[];
  image: string;
}

interface PanamaProjectsProps {
  projects: Project[];
}

export function PanamaProjects({ projects }: PanamaProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <p className="text-center text-sm text-[#94A3B8] mb-8">Click a project to explore details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((project) => (
          <GlowCard key={project.name}>
            <button
              type="button"
              onClick={() => setSelectedProject(project)}
              className="w-full text-left cursor-pointer group transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10]">
                <Image src={project.image} alt={project.name} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-[#C9A84C] mb-1">{project.brand}</p>
                <h3 className="text-lg font-semibold text-[#0A1628] mb-2">{project.name}</h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-xs bg-[#FAFAF5] text-[#475569] px-2.5 py-1 rounded">{f}</span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="text-xs text-[#C9A84C] font-medium">+{project.features.length - 3} more</span>
                  )}
                </div>
              </div>
            </button>
          </GlowCard>
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        image={selectedProject?.image ?? ''}
        imageAlt={selectedProject?.name ?? ''}
      >
        {selectedProject && (
          <>
            <p className="text-xs font-medium text-[#C9A84C] mb-1">{selectedProject.brand}</p>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-2">{selectedProject.name}</h2>

            <div className="flex items-center gap-4 text-sm text-[#475569] mb-5">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#C9A84C]" />
                Panama City, Panama
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="h-4 w-4 text-[#C9A84C]" />
                Hospitality Investment
              </span>
            </div>

            <p className="text-[#475569] text-sm leading-relaxed mb-6">{selectedProject.description}</p>

            <div className="border-t border-[#F1F5F9] pt-5">
              <h3 className="text-sm font-semibold text-[#0A1628] mb-3">Project Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedProject.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                    <BadgeCheck className="h-4 w-4 text-[#C9A84C] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-[#FAFAF5] rounded-xl p-4">
              <p className="text-sm text-[#475569]">
                Mercan is the <span className="font-semibold text-[#0A1628]">official strategic partner</span> of the Government of Panama for the Qualified Investor Program. Minimum investment of $300,000 with a 5-year holding period.
              </p>
            </div>
          </>
        )}
      </ProjectModal>
    </>
  );
}
