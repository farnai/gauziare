import React from 'react';
import { INITIAL_MATCHES } from '@/lib/initialData';
import MatchDetailContent from './MatchDetailContent';

export function generateStaticParams() {
  return INITIAL_MATCHES.map((m) => ({
    id: m.id,
  }));
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MatchDetailContent id={id} />;
}
