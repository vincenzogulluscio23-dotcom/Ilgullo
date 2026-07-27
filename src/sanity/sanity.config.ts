import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Superman CMS — IlGullo.com',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'va4dfcn6',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  basePath: '/superman',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Superman CMS — IlGullo.com')
          .items([
            // Singleton: Impostazioni Sito & Logo
            S.listItem()
              .title('⚙️ Impostazioni Sito & Logo')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Impostazioni Sito, Logo & Favicon')
              ),

            // Singleton: Homepage
            S.listItem()
              .title('🏠 Homepage')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Homepage Configurazione')
              ),

            // Singleton: About Page
            S.listItem()
              .title('👤 Pagina About')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
                  .title('Biografia & Servizi')
              ),

            // Singleton: Contatti
            S.listItem()
              .title('✉️ Pagina Contatti')
              .id('contactPage')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
                  .title('Contatti & Info')
              ),

            S.divider(),

            // Collections
            S.documentTypeListItem('project').title('🎬 Progetti Portfolio'),
            S.documentTypeListItem('frame').title('🖼️ Frames & Scraps (Tabletop)'),
            S.documentTypeListItem('labArticle').title('🧪 Lab & Sperimentazioni'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
