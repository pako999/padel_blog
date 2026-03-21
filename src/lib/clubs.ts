/**
 * lib/clubs.ts
 * Data access layer for club data
 */

import { CLUBS } from '@/data/clubs';
import type { Club } from '@/data/clubs';
export type { Club };

export function getAllClubs(): Club[] {
  return CLUBS;
}

export function getClub(slug: string): Club | undefined {
  return CLUBS.find(c => c.slug === slug);
}

export function getClubSlugs(): string[] {
  return CLUBS.map(c => c.slug);
}

export function getRelatedClubs(slug: string, count = 3): Club[] {
  return CLUBS.filter(c => c.slug !== slug).slice(0, count);
}
