import { defineType, defineField } from 'sanity';

export const editorialBlock = defineType({
  name: 'editorialBlock',
  title: 'Blocco Editoriale',
  type: 'object',
  fields: [
    defineField({
      name: 'blockType',
      title: 'Tipo di Blocco',
      type: 'string',
      options: {
        list: [
          { title: 'Hero / Titolo Principale', value: 'hero' },
          { title: 'Testo di Corpo', value: 'text' },
          { title: 'Citazione Editoriale', value: 'quote' },
          { title: 'Immagine Full Width', value: 'imageFull' },
          { title: 'Doppia Immagine (Affiancate)', value: 'dualImage' },
          { title: 'Galleria / Collage', value: 'gallery' },
          { title: 'Video Full Width', value: 'videoFull' },
          { title: 'Video Verticale / Reel', value: 'videoVertical' },
          { title: 'Embed Video (Vimeo / YouTube)', value: 'videoEmbed' },
          { title: 'Crediti Progetto', value: 'credits' },
          { title: 'Processo / Step', value: 'process' },
          { title: 'Spazio / Divisore', value: 'spacer' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titolo / Intestazione Blocco',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Testo Principale',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'quote',
      title: 'Testo Citazione',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'author',
      title: 'Autore Citazione',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Immagine Singola',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'caption', title: 'Didascalia', type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Galleria Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', title: 'Didascalia', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL Video (MP4 / Vimeo / YouTube)',
      type: 'url',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Immagine Copertina Video',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'creditsList',
      title: 'Elenco Crediti',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Ruolo', type: 'string' },
            { name: 'name', title: 'Nome / Persona / Agenzia', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      blockType: 'blockType',
      media: 'image',
    },
    prepare({ title, blockType, media }) {
      return {
        title: title || `Blocco: ${blockType || 'Editoriale'}`,
        subtitle: `Tipo: ${blockType || 'generico'}`,
        media,
      };
    },
  },
});
