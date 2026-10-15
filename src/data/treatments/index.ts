import type { TreatmentContent } from './types';

// Every file in this folder that exports `content` becomes a treatment page.
const modules = import.meta.glob<{ content?: TreatmentContent }>('./*.ts', { eager: true });

export const treatmentPages: TreatmentContent[] = Object.values(modules)
  .map((m) => m.content)
  .filter((c): c is TreatmentContent => Boolean(c));
