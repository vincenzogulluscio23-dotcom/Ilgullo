import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Progetti Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo del Progetto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Codice / Numero Progetto (es. #01)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria Principale',
      type: 'string',
      options: {
        list: [
          { title: 'Direction & Film', value: 'Direction & Film' },
          { title: 'Brand Storytelling', value: 'Brand Storytelling' },
          { title: 'Documentary', value: 'Documentary' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Fashion & Visual', value: 'Fashion & Visual' },
        ],
      },
    }),
    defineField({
      name: 'client',
      title: 'Cliente / Brand',
      type: 'string',
    }),
    defineField({
      name: 'agency',
      title: 'Agenzia / Produzione',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Anno di Realizzazione',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'location',
      title: 'Luogo / Location',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Ruolo Ricoperto',
      type: 'string',
      initialValue: 'Director & Creative Lead',
    }),
    defineField({
      name: 'excerpt',
      title: 'Descrizione Breve / Sinossi',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine Copertina',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'URL Video Hero (MP4 / Vimeo / YouTube)',
      type: 'url',
    }),
    defineField({
      name: 'heroVideoPoster',
      title: 'Poster Video Hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'In Evidenza in Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordinamento manuale (numero)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'layoutTemplate',
      title: 'Template Layout Editoriale',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial Story', value: 'Editorial' },
          { title: 'Visual Story', value: 'Visual Story' },
          { title: 'Case Study', value: 'Case Study' },
          { title: 'Film / Cinematic', value: 'Film' },
        ],
      },
      initialValue: 'Editorial',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocchi Editoriali Contenuto Modulare',
      type: 'array',
      of: [{ type: 'editorialBlock' }],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galleria Fotografica Aggiuntiva',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'creditsText',
      title: 'Crediti e Collaboratori',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'seoTitle',
      title: 'Titolo SEO Personalizzato',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrizione SEO Personalizzata',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
    },
  },
});
