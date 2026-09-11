import { read, write, remove } from './storage';
import { validCosmicProfile, type CosmicProfile } from './cosmicIdentity';
export const cosmicProfileKey = 'cosmic-profile:v1';
export function loadCosmicProfile() {
  const value = read<unknown>(cosmicProfileKey, null);
  return { profile: validCosmicProfile(value) ? value : null, invalid: value !== null && !validCosmicProfile(value) };
}
export function saveCosmicProfile(profile: CosmicProfile) { return validCosmicProfile(profile) && write(cosmicProfileKey, profile); }
export function resetCosmicProfile() { return remove(cosmicProfileKey); }
