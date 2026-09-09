
import React from "react";
import { notFound } from "next/navigation";
import {
  getTeamMemberDetailBySlug,
  getTeamDetailSlugs,
  getTeamDetailsVariant,
} from "@/data";
import TeamDetails from "@/app/components/layout/teamDetails/TeamDetails";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getTeamDetailSlugs().map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberDetailBySlug(slug);

  if (!member) {
    return {
      title: "Team Member Not Found",
    };
  }

  return {
    title: `${member.name.first} ${member.name.last} - ${member.role} | PawFect`,
    description: member.bio,
  };
}

export default async function TeamMemberDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const member = getTeamMemberDetailBySlug(slug);
  const teamDetails = getTeamDetailsVariant();

  if (!member || !teamDetails) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <TeamDetails
        data={member}
        variant={teamDetails}
      />
    </main>
  );
}
