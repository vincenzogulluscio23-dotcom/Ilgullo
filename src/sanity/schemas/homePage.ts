import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Titolo Hero Principale',
      type: 'string',
      initialValue: 'Vincenzo Gulluscio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sottotitolo Hero',
      type: 'string',
      initialValue: 'Direction & Visual Storytelling',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Tagline / Etichetta Ruolo',
      type: 'string',
      initialValue: 'FILMMAKER & CREATIVE DIRECTOR',
    }),
    defineField({
      name: 'heroBgImage',
      title: 'Immagine di Sfondo Hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'URL Video Sfondo Hero',
      type: 'url',
    }),
    defineField({
      name: 'manifestoTitle',
      title: 'Titolo Manifesto / Dichiarazione',
      type: 'string',
      initialValue: 'La Visione',
    }),
    defineField({
      name: 'manifestoText',
      title: 'Testo del Manifesto Editoriale',
      type: 'text',
      rows: 5,
      initialValue: 'Costruisco immagini che respirano prima di raccontare. Un lavoro di sottrazione per far emergere la tensione autentica dei luoghi e delle persone.',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Progetti Selezionati in Homepage',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'selectedFrames',
      title: 'Frames Selezionati per il Tabletop della Homepage',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'frame' }] }],
    }),
    defineField({
      name: 'showFramesSection',
      title: 'Mostra Sezione Frames in Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showLabSection',
      title: 'Mostra Sezione Lab in Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaText',
      title: 'Testo Call to Action Finale',
      type: 'string',
      initialValue: 'Inizia una conversazione',
    }),
  ],
  preview: {
    select: { title: 'heroHeadline' },
    prepare({ title }) {
      return {
        title: title || 'Homepage',
        subtitle: 'Gestione contenuti ed elementi in evidenza',
      };
    },
  },
});
