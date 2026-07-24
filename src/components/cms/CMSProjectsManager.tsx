import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Project, ProjectCategory } from '../../types';
import { Plus, Edit2, Trash2, Star, Eye, Image as ImageIcon, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CMSProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useCMS();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const emptyProject: Project = {
    id: `proj-${Date.now()}`,
    slug: 'nuovo-progetto',
    number: `0${projects.length + 1}`,
    title: '',
    client: '',
    year: '2026',
    category: 'Film',
    services: ['Regia', 'Fotografia'],
    role: 'Director / Filmmaker',
    location: 'Milano, Italy',
    excerpt: '',
    context: '',
    pointOfView: '',
    process: '',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [],
    credits: {
      client: '',
      direction: 'Vincenzo Gulluscio',
      photography: 'Vincenzo Gulluscio',
    },
    featured: true,
  };

  const handleStartCreate = () => {
    setEditingProject(emptyProject);
    setIsCreating(true);
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

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Gestione Progetti ({projects.length})
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Aggiungi, modifica o elimina i lavori mostrati in homepage e nel portfolio completo.
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
          placeholder="Cerca progetti per titolo, cliente o categoria..."
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
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#09090A]/80 text-[10px] font-mono text-[#FF5A36] backdrop-blur-md border border-white/10">
                    {p.category}
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
                <p className="text-xs text-[#C9C7C1] font-sans line-clamp-2 leading-relaxed">
                  {p.excerpt}
                </p>
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
                <span>{p.featured ? 'In evidenza' : 'Metti in evidenza'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingProject(p);
                    setIsCreating(false);
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

      {/* Edit / Create Modal Form */}
      <AnimatePresence>
        {editingProject && (
          <div
            className="fixed inset-0 z-50 bg-[#09090A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setEditingProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full my-auto bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#28282D]">
                <h3 className="font-serif italic text-2xl text-white">
                  {isCreating ? 'Nuovo Progetto' : `Modifica "${editingProject.title}"`}
                </h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 rounded-full bg-[#09090A] text-[#8D8D89] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Basic fields */}
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
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
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

                {/* Excerpt and Editorial Narrative */}
                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Estratto / Sintesi (Excerpt)</label>
                  <textarea
                    rows={2}
                    value={editingProject.excerpt}
                    onChange={(e) => setEditingProject({ ...editingProject, excerpt: e.target.value })}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Il Contesto (Context)</label>
                  <textarea
                    rows={3}
                    value={editingProject.context}
                    onChange={(e) => setEditingProject({ ...editingProject, context: e.target.value })}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Il Punto di Vista (Point of View)</label>
                  <textarea
                    rows={3}
                    value={editingProject.pointOfView}
                    onChange={(e) => setEditingProject({ ...editingProject, pointOfView: e.target.value })}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                {/* Cover & Video URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine Copertina *</label>
                    <input
                      type="url"
                      required
                      value={editingProject.coverImage}
                      onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Video Hero (Opzionale MP4)</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={editingProject.heroVideoUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, heroVideoUrl: e.target.value })}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>
                </div>

                {/* Submit button bar */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#28282D]">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono text-[#8D8D89] hover:text-white"
                  >
                    Annulla
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salva Progetto</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
