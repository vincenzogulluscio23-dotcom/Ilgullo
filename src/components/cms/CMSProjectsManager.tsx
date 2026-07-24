import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Project, ProjectCategory, ProjectTemplate, EditorialBlock } from '../../types';
import { generateTemplateBlocks } from '../../lib/cmsStorage';
import { CMSBlockEditor } from './CMSBlockEditor';
import { CMSMediaUploader } from './CMSMediaUploader';
import { CMSSEOEditor } from './CMSSEOEditor';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Copy,
  Eye,
  Save,
  X,
  Layers,
  Sparkles,
  FileText,
  Globe,
  ImageIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CMSProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useCMS();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'blocks' | 'media' | 'seo'>('info');
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const emptyProject: Project = {
    id: `proj-${Date.now()}`,
    slug: 'nuovo-progetto',
    number: `0${projects.length + 1}`,
    title: 'Nuovo Progetto Editoriale',
    client: 'Cliente / Brand',
    year: '2026',
    category: 'Film',
    template: 'Editorial',
    services: ['Regia', 'Fotografia', 'Branded Content'],
    role: 'Director & Photographer',
    location: 'Milano, Italy',
    excerpt: 'Breve estrazione o sinossi per la scheda progetto.',
    context: 'Il contesto narrativo e l’origine della produzione.',
    pointOfView: 'Punto di vista e approccio stilistico.',
    process: 'Descrizione delle fasi di ricerca e ripresa sul campo.',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [],
    blocks: [],
    credits: {
      client: 'Brand',
      direction: 'Vincenzo Gulluscio',
      photography: 'Vincenzo Gulluscio',
    },
    featured: true,
  };

  const handleStartCreate = () => {
    const newProj = {
      ...emptyProject,
      blocks: generateTemplateBlocks('Editorial', emptyProject),
    };
    setEditingProject(newProj);
    setIsCreating(true);
    setActiveTab('info');
  };

  const handleDuplicateProject = (p: Project) => {
    const clone: Project = {
      ...p,
      id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      slug: `${p.slug}-copia`,
      number: `0${projects.length + 1}`,
      title: `${p.title} (Copia)`,
      featured: false,
    };
    addProject(clone);
  };

  const handleTemplateChange = (template: ProjectTemplate) => {
    if (!editingProject) return;
    const newBlocks = generateTemplateBlocks(template, editingProject);
    setEditingProject({
      ...editingProject,
      template,
      blocks: newBlocks,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isCreating) {
      addProject(editingProject);
    } else {
      updateProject(editingProject.id, editingProject);
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  const categories: ProjectCategory[] = ['All', 'Film', 'Photography', 'Branded Content', 'Corporate', 'Campaign', 'Social', 'Personal'];
  const templates: ProjectTemplate[] = ['Editorial', 'Visual Story', 'Case Study', 'Film', 'Gallery', 'Sticky Story'];

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Gestione Progetti & Storie ({projects.length})
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Modifica, duplica o aggiungi racconti completi con composizione a blocchi editoriali.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Nuovo Progetto</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Cerca per titolo, cliente o categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-4 py-3 text-xs text-white placeholder-[#8D8D89] focus:outline-none focus:border-[#FF5A36]"
        />
      </div>

      {/* Projects Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-[#121214] border border-[#28282D] rounded-2xl overflow-hidden hover:border-[#FF5A36]/60 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/10] bg-black overflow-hidden">
                <img
                  src={p.coverImage}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#09090A]/80 text-[10px] font-mono text-[#FF5A36] backdrop-blur-md border border-white/10">
                    {p.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-white/90 backdrop-blur-md">
                    {p.template || 'Editorial'}
                  </span>
                  {p.featured && (
                    <span className="px-2.5 py-1 rounded-md bg-[#FF5A36] text-[10px] font-mono text-white flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      In Evidenza
                    </span>
                  )}
                </div>

                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white/80">
                  {p.year}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-5">
                <span className="font-mono text-xs text-[#8D8D89] block mb-1">
                  {p.client}
                </span>
                <h3 className="font-serif italic text-xl text-white mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-[#C9C7C1] font-sans line-clamp-2 leading-relaxed mb-3">
                  {p.excerpt}
                </p>

                <div className="text-[10px] font-mono text-[#8D8D89] flex items-center gap-3">
                  <span>Blocchi: {p.blocks?.length || 0}</span>
                  <span>•</span>
                  <span>Immagini: {p.galleryImages?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-5 py-3.5 bg-[#09090A]/60 border-t border-[#28282D] flex items-center justify-between">
              <button
                onClick={() => updateProject(p.id, { featured: !p.featured })}
                className={`text-[11px] font-mono inline-flex items-center gap-1.5 transition-colors ${
                  p.featured ? 'text-[#FF5A36]' : 'text-[#8D8D89] hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${p.featured ? 'fill-current' : ''}`} />
                <span>{p.featured ? 'In evidenza' : 'Evidenzia'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleDuplicateProject(p)}
                  className="p-2 rounded-lg bg-[#28282D] text-white hover:bg-[#FF5A36] transition-colors"
                  title="Duplica Progetto"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setEditingProject(p);
                    setIsCreating(false);
                    setActiveTab('info');
                  }}
                  className="p-2 rounded-lg bg-[#28282D] text-white hover:bg-[#FF5A36] transition-colors"
                  title="Modifica Progetto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Sei sicuro di voler eliminare "${p.title}"?`)) {
                      deleteProject(p.id);
                    }
                  }}
                  className="p-2 rounded-lg bg-red-950/60 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                  title="Elimina Progetto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Featured Modal Editor */}
      <AnimatePresence>
        {editingProject && (
          <div
            className="fixed inset-0 z-50 bg-[#09090A]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
            onClick={() => setEditingProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full my-auto bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar"
            >
              {/* Modal Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#28282D]">
                <div>
                  <h3 className="font-serif italic text-2xl text-white">
                    {isCreating ? 'Nuovo Progetto Editoriale' : `Modifica "${editingProject.title}"`}
                  </h3>
                  <p className="text-xs text-[#8D8D89] font-mono mt-0.5">
                    Modifica i dati principali, riordina i blocchi editoriali o ottimizza i tag SEO.
                  </p>
                </div>

                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 rounded-full bg-[#09090A] text-[#8D8D89] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Tabs Bar */}
              <div className="flex items-center gap-2 border-b border-[#28282D] pb-3 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('info')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-2 transition-colors ${
                    activeTab === 'info'
                      ? 'bg-[#FF5A36] text-white font-medium shadow'
                      : 'bg-[#09090A] text-[#8D8D89] hover:text-white border border-[#28282D]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dati Principali</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('blocks')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-2 transition-colors ${
                    activeTab === 'blocks'
                      ? 'bg-[#FF5A36] text-white font-medium shadow'
                      : 'bg-[#09090A] text-[#8D8D89] hover:text-white border border-[#28282D]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Blocchi Narrativi ({editingProject.blocks?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('media')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-2 transition-colors ${
                    activeTab === 'media'
                      ? 'bg-[#FF5A36] text-white font-medium shadow'
                      : 'bg-[#09090A] text-[#8D8D89] hover:text-white border border-[#28282D]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Gallery & Media</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('seo')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-2 transition-colors ${
                    activeTab === 'seo'
                      ? 'bg-[#FF5A36] text-white font-medium shadow'
                      : 'bg-[#09090A] text-[#8D8D89] hover:text-white border border-[#28282D]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>SEO & Social</span>
                </button>
              </div>

              {/* Tab 1: Info */}
              {activeTab === 'info' && (
                <div className="space-y-6">
                  {/* Template Picker */}
                  <div className="p-4 bg-[#09090A] border border-[#28282D] rounded-2xl space-y-2">
                    <label className="block text-xs font-mono text-[#FF5A36] font-medium">
                      Struttura Narrativa Template Progetto
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {templates.map((tpl) => (
                        <button
                          key={tpl}
                          type="button"
                          onClick={() => handleTemplateChange(tpl)}
                          className={`p-2.5 rounded-xl border text-left font-mono text-xs transition-all ${
                            editingProject.template === tpl
                              ? 'bg-[#FF5A36]/20 border-[#FF5A36] text-white font-semibold'
                              : 'bg-[#121214] border-[#28282D] text-[#8D8D89] hover:text-white'
                          }`}
                        >
                          {tpl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Titolo Progetto *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingProject({
                            ...editingProject,
                            title: val,
                            slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                          });
                        }}
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Cliente / Brand *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.client}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Categoria *</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })
                        }
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      >
                        {categories.filter((c) => c !== 'All').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Anno *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.year}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Estratto / Excerpt *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingProject.excerpt}
                      onChange={(e) => setEditingProject({ ...editingProject, excerpt: e.target.value })}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine Copertina *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.coverImage}
                        onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Video Hero MP4 (Opzionale)</label>
                      <input
                        type="text"
                        value={editingProject.heroVideoUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, heroVideoUrl: e.target.value })}
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Blocks Editor */}
              {activeTab === 'blocks' && (
                <CMSBlockEditor
                  blocks={editingProject.blocks || []}
                  onChange={(blocks) => setEditingProject({ ...editingProject, blocks })}
                />
              )}

              {/* Tab 3: Media */}
              {activeTab === 'media' && (
                <CMSMediaUploader
                  title="Galleria Fotografica Progetto"
                  images={(editingProject.galleryImages || []).map((url, i) => ({
                    id: `img-${i}`,
                    url,
                    cropPreference: 'auto',
                  }))}
                  onChange={(imgs) =>
                    setEditingProject({
                      ...editingProject,
                      galleryImages: imgs.map((i) => i.url),
                    })
                  }
                />
              )}

              {/* Tab 4: SEO */}
              {activeTab === 'seo' && (
                <CMSSEOEditor
                  seo={editingProject.seo}
                  onChange={(seo) => setEditingProject({ ...editingProject, seo })}
                  defaultTitle={`${editingProject.title} — Vincenzo Gulluscio`}
                  defaultDesc={editingProject.excerpt}
                />
              )}

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#28282D]">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono text-[#8D8D89] hover:text-white"
                >
                  Annulla
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Salva Progetto</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
