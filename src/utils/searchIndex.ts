import { 
  SERVICES_CATALOG, 
  PORTFOLIO_PROJECTS, 
  SECTOR_SOLUTIONS, 
  INSIGHT_ARTICLES,
  ServiceCategory,
  PortfolioProject,
  SectorSolution,
  InsightArticle
} from '../data/companyData';

export type SearchResultType = 'service' | 'project' | 'solution' | 'insight';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  matchSnippet?: string;
  badge: string;
  tab: string;
  payload?: any;
}

export function searchPlatform(query: string): SearchResultItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  const results: SearchResultItem[] = [];

  // 1. Search Services Catalog
  SERVICES_CATALOG.forEach((svc) => {
    const titleMatch = svc.title.toLowerCase().includes(clean);
    const descMatch = svc.description.toLowerCase().includes(clean);
    const subMatch = svc.subServices.find(s => s.toLowerCase().includes(clean));
    const problemMatch = svc.problemsAddressed.find(p => p.toLowerCase().includes(clean));

    if (titleMatch || descMatch || subMatch || problemMatch) {
      results.push({
        id: `service-${svc.id}`,
        type: 'service',
        title: svc.title,
        subtitle: svc.tagline,
        matchSnippet: subMatch ? `Feature: ${subMatch}` : (problemMatch ? `Solves: ${problemMatch}` : svc.description.slice(0, 100) + '...'),
        badge: 'Service',
        tab: 'services',
        payload: svc
      });
    }
  });

  // 2. Search Portfolio Projects
  PORTFOLIO_PROJECTS.forEach((proj) => {
    const titleMatch = proj.title.toLowerCase().includes(clean);
    const descMatch = proj.description.toLowerCase().includes(clean);
    const techMatch = proj.technologies.find(t => t.toLowerCase().includes(clean));
    const catMatch = proj.category.toLowerCase().includes(clean);

    if (titleMatch || descMatch || techMatch || catMatch) {
      results.push({
        id: `project-${proj.id}`,
        type: 'project',
        title: proj.title,
        subtitle: `${proj.category} · ${proj.demoMetrics}`,
        matchSnippet: techMatch ? `Tech Stack: ${proj.technologies.join(', ')}` : proj.tagline,
        badge: 'Project Case',
        tab: 'portfolio',
        payload: proj
      });
    }
  });

  // 3. Search Sector Solutions
  SECTOR_SOLUTIONS.forEach((sec) => {
    const titleMatch = sec.title.toLowerCase().includes(clean);
    const audMatch = sec.targetAudience.toLowerCase().includes(clean);
    const solMatch = sec.solutions.find(s => s.toLowerCase().includes(clean));
    const chalMatch = sec.challenges.find(c => c.toLowerCase().includes(clean));

    if (titleMatch || audMatch || solMatch || chalMatch) {
      results.push({
        id: `solution-${sec.id}`,
        type: 'solution',
        title: sec.title,
        subtitle: sec.targetAudience,
        matchSnippet: solMatch || chalMatch || sec.exampleSystem,
        badge: 'Industry Solution',
        tab: 'solutions',
        payload: sec
      });
    }
  });

  // 4. Search Insights & Whitepapers
  INSIGHT_ARTICLES.forEach((art) => {
    const titleMatch = art.title.toLowerCase().includes(clean);
    const summaryMatch = art.summary.toLowerCase().includes(clean);
    const catMatch = art.category.toLowerCase().includes(clean);
    const takeawayMatch = art.keyTakeaways.find(k => k.toLowerCase().includes(clean));

    if (titleMatch || summaryMatch || catMatch || takeawayMatch) {
      results.push({
        id: `insight-${art.id}`,
        type: 'insight',
        title: art.title,
        subtitle: `${art.category} · ${art.readTime}`,
        matchSnippet: takeawayMatch || art.summary.slice(0, 110) + '...',
        badge: 'Whitepaper',
        tab: 'insights',
        payload: art
      });
    }
  });

  return results.slice(0, 8); // Top 8 relevant matches
}
