import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Pagina About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo Pagina',
      type: 'string',
      initialValue: 'Chi Sono & Filosofia',
    }),
    defineField({
      name: 'portraitImage',
      title: 'Foto Ritratto d’Autore',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headline',
      title: 'Headline Principale About',
      type: 'string',
      initialValue: 'Regia cinematografica e narrazione visiva ad alta sensibilità estetica.',
    }),
    defineField({
      name: 'biography',
      title: 'Biografia Completa',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'shortBio',
      title: 'Biografia Breve / Abstract',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'servicesList',
      title: 'Elenco Servizi Offerati',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Nome Servizio', type: 'string' },
            { name: 'description', title: 'Descrizione', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'clientsList',
      title: 'Elenco Clienti & Collaborazioni',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'resumePdfUrl',
      title: 'URL o File Curriculum Vitae (PDF)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Pagina About',
        subtitle: 'Biografia, servizi e ritratto',
      };
    },
  },
});
