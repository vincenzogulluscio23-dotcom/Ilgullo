import { defineType, defineField } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Pagina Contatti',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo Pagina',
      type: 'string',
      initialValue: 'Contatti & Inquiries',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo / Invito al dialogo',
      type: 'text',
      rows: 2,
      initialValue: 'Disponibile per nuove regie, produzioni documentaristiche, campagne brand e consulenze visive.',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Stato Disponibilita (es. Available for Q3/Q4 2026)',
      type: 'string',
      initialValue: 'Available for new projects',
    }),
    defineField({
      name: 'email',
      title: 'Email diretta',
      type: 'string',
      initialValue: 'vincenzo@ilgullo.com',
    }),
    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Link WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'locationText',
      title: 'Città e Disponibilità Trasferte',
      type: 'string',
      initialValue: 'Palermo / Milano — WW Travel',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Pagina Contatti',
        subtitle: 'Email, telefono e disponibilità',
      };
    },
  },
});
