import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPaw } from 'react-icons/fa'; 

// Type Interfaces as provided in the prompt
export interface PetTeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface PetTeamData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  members: PetTeamMember[];
}

interface TeamSectionProps {
  data: PetTeamData;
}

// The TeamSection Component
export default function TeamSection({ data }: TeamSectionProps) {
  const { badge, title, desc, members = [] } = data || {};

  return (
    <section className="w-full bg-[#F3E8FF] py-8 md:py-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        
        {/* HEADER AREA */}
        <div className="mb-14 flex flex-col items-center text-center">
          {badge && (
            <div className="mb-2 inline-flex items-center gap-2">
              <FaPaw className="h-4 w-4 text-[#3B1264]" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#3B1264]">
                {badge}
              </span>
            </div>
          )}

          {title && (
            <h2 className="max-w-[700px] text-[36px] font-extrabold leading-[1.1] tracking-tighter text-[#1C0D3F] sm:text-[46px] lg:text-[56px]">
              {title.normal}{' '}
              <span className="inline-block bg-gradient-to-r from-[#8B3BC8] to-[#6A0DAD] bg-clip-text text-transparent">
                {title.highlighted}
              </span>
            </h2>
          )}

          {/* Paw icon separator line like in image_13.png */}
          <div className="my-2 flex items-center justify-center">
             <div className="h-px w-[145px] bg-[#3B1264]" />
             <FaPaw className="mx-2 h-4 w-4 fill-[#3B1264] text-[#3B1264]" />
             <div className="h-px w-[145px] bg-[#3B1264]/30" />
          </div>

          {/* Description Text */}
          {desc && (
            <p className="max-w-[600px] text-[15px] font-medium leading-relaxed text-gray-500 sm:text-[16px]">
              {desc}
            </p>
          )}
        </div>

        {/* TEAM MEMBERS GRID */}
        {members.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {members.map((member) => (
              <div 
                key={member.id}
                className="flex flex-col items-center rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] group"
              >
                <div className="relative mb-6 flex h-[140px] w-[140px] items-center justify-center rounded-full border border-[#3B1264]/10 p-1 transition-transform duration-300 group-hover:scale-105 sm:h-[160px] sm:w-[160px] lg:h-[175px] lg:w-[175px]">
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                        <Link href={member.slug}>
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 175px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={true} 
                        />
                        </Link>
                    </div>
                </div>

                {/* Member Text Content */}
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-[18px] font-bold tracking-tight text-[#1C0D3F] transition-colors group-hover:text-[#3B1264] sm:text-[20px]">
                     <Link href={member.slug}>{member.name}</Link> 
                    </h3>
                    
                    <p className="mt-1 text-[13px] font-bold text-[#8B3BC8]">
                      {member.role}
                    </p>

                    <div className="my-4 flex items-center">
                         <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                         <FaPaw className="mx-1 h-3 w-3 fill-[#3B1264] text-[#3B1264]" />
                         <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                    </div>

                    <p className="text-[13px] font-medium leading-relaxed text-gray-500 max-w-[220px]">
                      {member.description}
                    </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
             No team members found.
          </div>
        )}
      </div>
    </section>
  );
}