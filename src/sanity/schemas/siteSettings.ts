import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Titolo Sito Pubblico',
      type: 'string',
      initialValue: 'Vincenzo Gulluscio — Direction & Visual Storytelling',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Descrizione Globale SEO',
      type: 'text',
      rows: 3,
      initialValue: 'Regia, fotografia e direzione artistica con approccio cinematografico.',
    }),
    defineField({
      name: 'mainLogo',
      title: 'Logo Principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo Versione Scura (Sfondo Chiaro)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo Versione Chiara (Sfondo Scuro)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon Personalizzata (ICO / PNG / SVG)',
      type: 'image',
      description: 'Si aggiornerà automaticamente nel browser senza modificare il codice.',
    }),
    defineField({
      name: 'appleTouchIcon',
      title: 'Apple Touch Icon (180x180)',
      type: 'image',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Immagine Open Graph Predefinita (Social Share)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Email di Contatto Principale',
      type: 'string',
      initialValue: 'vincenzo@ilgullo.com',
    }),
    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
      initialValue: '+39 347 000 0000',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Link / Numero WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Sede / Citta',
      type: 'string',
      initialValue: 'Palermo / Milano, Italy',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Link Social',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Piattaforma', type: 'string' },
            { name: 'url', title: 'URL Profilo', type: 'url' },
            { name: 'handle', title: 'Handle (@usernames)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Testo del Footer',
      type: 'text',
      rows: 2,
      initialValue: 'Direzione artistica, regia e narrazione visiva.',
    }),
    defineField({
      name: 'copyright',
      title: 'Testo Copyright',
      type: 'string',
      initialValue: '© 2026 Vincenzo Gulluscio. Tutti i diritti riservati.',
    }),
    defineField({
      name: 'privacyText',
      title: 'Note Legali / Privacy',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
    prepare({ title }) {
      return {
        title: title || 'Impostazioni Sito',
        subtitle: 'Configurazione globale & Logo',
      };
    },
  },
});
