import { defineType, defineField } from 'sanity';

export const frame = defineType({
  name: 'frame',
  title: 'Frames & Scraps',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Numero / Codice Frame (es. 01, 02)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Titolo / Luogo Frame',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'File Immagine / Foto',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL Video se Frame in movimento',
      type: 'url',
    }),
    defineField({
      name: 'category',
      title: 'Categoria / Tag',
      type: 'string',
      options: {
        list: [
          { title: 'PLACES', value: 'PLACES' },
          { title: 'PEOPLE', value: 'PEOPLE' },
          { title: 'LIGHT', value: 'LIGHT' },
          { title: 'TEXTURES', value: 'TEXTURES' },
          { title: 'DETAILS', value: 'DETAILS' },
          { title: 'ATMOSPHERE', value: 'ATMOSPHERE' },
        ],
      },
      initialValue: 'PLACES',
    }),
    defineField({
      name: 'orientation',
      title: 'Orientamento Visivo',
      type: 'string',
      options: {
        list: [
          { title: 'Verticale (Portrait 3/4)', value: 'vertical' },
          { title: 'Orizzontale (Landscape 16/9)', value: 'horizontal' },
          { title: 'Quadrato (Square 1/1)', value: 'square' },
          { title: 'Panoramico (Cinematic)', value: 'panoramic' },
        ],
      },
      initialValue: 'vertical',
    }),
    defineField({
      name: 'year',
      title: 'Anno',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'location',
      title: 'Luogo / Citta',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Didascalia / Nota d’autore',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'altText',
      title: 'Testo Alternativo Alt (Accessibilità)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Ordinamento Manuale',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'featuredInHomepage',
      title: 'Mostra nella composizione Tabletop della Homepage',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Frame',
        subtitle: subtitle ? `Categoria: ${subtitle}` : '',
        media,
      };
    },
  },
});
