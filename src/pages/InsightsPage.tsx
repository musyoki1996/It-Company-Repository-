import React, { useState } from 'react';
import { Search, Clock, Calendar, ArrowRight, X, BookOpen, CheckCircle2 } from 'lucide-react';
import { INSIGHT_ARTICLES, InsightArticle } from '../data/companyData';
import { motion } from 'framer-motion';
import { 
  staggerContainerVariants, 
  deliberateCardVariants, 
  subtleCardHover 
} from '../utils/animations';

export const InsightsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const categories = [
    'All',
    'Technology Trends',
    'Website Development',
    'Software Development',
    'Cybersecurity',
    'Business Automation',
    'Digital Transformation'
  ];

  const filteredArticles = INSIGHT_ARTICLES.filter(art => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.content.some(p => p.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. Header Banner */}
      <section className="relative pt-16 sm:pt-20 pb-16 border-b border-white/[0.07] bg-[#0A0713]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#FFC400] mb-4">
            <span>ENGINEERING WHITEPAPERS & KNOWLEDGE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Technology Insights & Architecture Briefs
          </h1>
          <p className="mt-4 text-base text-slate-300 font-normal leading-relaxed">
            Rigorous analysis on enterprise software engineering, cloud migration, data protection compliance, and business automation across the African continent and global markets.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by keyword or topic (e.g. Cloud, KDPA, PWA)..."
              className="w-full pl-11 pr-4 py-3 bg-[#0D091A] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/[0.07]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#FFC400] text-[#090611] border-[#FFC400] font-semibold'
                  : 'text-slate-300 hover:text-white bg-[#0D091A] border-white/[0.07] hover:border-white/[0.15]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={deliberateCardVariants}
              whileHover={subtleCardHover}
              onClick={() => setActiveArticle(article)}
              className="p-6 sm:p-8 bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.18] transition-colors cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-[#FFC400] font-medium">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight group-hover:text-[#FFC400] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 font-normal">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-[#FFC400]">
                <span>Read Full Analysis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* 4. Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0D091A] border border-white/[0.08] shadow-2xl p-6 sm:p-10 text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 bg-[#160F2A] hover:bg-[#25004D] border border-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header */}
            <div className="pr-10 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="text-[#FFC400] font-medium">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight">
                {activeArticle.title}
              </h1>

              <p className="text-sm text-[#d4c4f5] font-normal leading-relaxed italic border-l-2 border-[#FFC400] pl-3 py-1">
                {activeArticle.summary}
              </p>
            </div>

            {/* Key Takeaways Callout */}
            <div className="mt-8 p-5 bg-[#140E26] border border-white/[0.08]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#FFC400] mb-2.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FFC400]" />
                <span>Executive Summary Takeaways</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 font-normal">
                {activeArticle.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Prose Body */}
            <div className="mt-8 space-y-4 text-sm text-slate-300 leading-relaxed border-t border-white/[0.07] pt-6 font-normal">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-white/[0.07] flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px]">Published by Infranovix Research Practice</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-semibold uppercase text-xs tracking-wider transition-colors cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
