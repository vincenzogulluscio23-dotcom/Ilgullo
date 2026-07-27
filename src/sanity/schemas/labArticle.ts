import { defineType, defineField } from 'sanity';

export const labArticle = defineType({
  name: 'labArticle',
  title: 'Lab & Sperimentazioni',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo Articolo / Esperimento',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Estratto / Sommario',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine Copertina',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'RESEARCH', value: 'RESEARCH' },
          { title: 'EXPERIMENT', value: 'EXPERIMENT' },
          { title: 'NOTE', value: 'NOTE' },
          { title: 'ESSAY', value: 'ESSAY' },
        ],
      },
      initialValue: 'RESEARCH',
    }),
    defineField({
      name: 'date',
      title: 'Data di Pubblicazione',
      type: 'date',
    }),
    defineField({
      name: 'readTime',
      title: 'Tempo di Lettura (es. 4 min read)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Contenuto Testuale Esteso',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'blocks',
      title: 'Blocchi Editoriali',
      type: 'array',
      of: [{ type: 'editorialBlock' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});
