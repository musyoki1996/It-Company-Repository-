export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  subServices: string[];
  problemsAddressed: string[];
  keyBenefits: string[];
  deliverables: string[];
  icon: string;
}

export interface SectorSolution {
  id: string;
  title: string;
  targetAudience: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  exampleSystem: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Websites' | 'Web Apps' | 'Mobile Apps' | 'Business Systems' | 'Cloud & Security' | 'Branding';
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  image: string;
  isDemonstration: boolean;
  demoMetrics: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Technology Trends' | 'Website Development' | 'Software Development' | 'Cybersecurity' | 'Business Automation' | 'Digital Transformation';
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export const COMPANY_IDENTITY = {
  name: 'INFRANOVIX TECHNOLOGIES',
  slogan: 'INNOVATE. INTEGRATE. ELEVATE.',
  mission: 'To empower businesses and individuals through innovative, accessible, reliable, and scalable technology solutions.',
  vision: 'To become a trusted technology partner driving digital innovation and transformation across Africa and beyond.',
  coreValues: [
    { title: 'Innovation', desc: 'Engineering forward-thinking, modern solutions that anticipate future market and operational demands.' },
    { title: 'Integrity', desc: 'Unwavering transparency in project timelines, commercial quotations, architectural choices, and client data governance.' },
    { title: 'Excellence', desc: 'Relentless commitment to clean codebases, resilient architectures, rigorous testing, and flawless UX.' },
    { title: 'Collaboration', desc: 'Co-designing digital solutions alongside stakeholders to solve authentic, ground-level business challenges.' },
    { title: 'Customer Commitment', desc: 'Long-term partnership beyond deployment through dependable technical support and strategic evolution.' },
    { title: 'Continuous Improvement', desc: 'Agile iteration, continuous learning, and adopting modern technologies that deliver competitive advantages.' }
  ],
  deliveryProcess: [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Deep Requirements Gathering',
      description: 'We analyze your business workflows, stakeholder objectives, user pain points, and technical feasibility to establish an unambiguous project charter.'
    },
    {
      step: '02',
      title: 'Strategize',
      tagline: 'Architectural Blueprinting',
      description: 'We develop a modular technical blueprint, selecting the optimal database structure, cloud infrastructure, API contracts, and security protocols.'
    },
    {
      step: '03',
      title: 'Design',
      tagline: 'High-Fidelity Prototyping',
      description: 'We craft human-centric UI/UX design systems, component libraries, and interactive wireframes ensuring effortless usability across devices.'
    },
    {
      step: '04',
      title: 'Develop',
      tagline: 'Agile Full-Stack Engineering',
      description: 'Our software engineers build with TypeScript, modern frameworks, and robust relational or document databases with automated CI/CD and unit testing.'
    },
    {
      step: '05',
      title: 'Deploy',
      tagline: 'Production Launch & Integration',
      description: 'We execute zero-downtime production deployment, configure SSL, domain DNS, data migrations, third-party integrations, and automated backups.'
    },
    {
      step: '06',
      title: 'Support',
      tagline: 'Maintenance, Scaling & SLA',
      description: 'We safeguard continuous performance with proactive monitoring, system optimizations, feature enhancements, and dedicated SLA response times.'
    }
  ]
};

export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: 'web-design-dev',
    number: '01',
    title: 'Website Design and Development',
    tagline: 'Fast, secure, conversion-optimized digital presence',
    description: 'We create high-performance corporate websites, e-commerce storefronts, and bespoke digital platforms designed to elevate credibility, rank on search engines, and convert visitors into long-term clients.',
    subServices: [
      'Corporate website development',
      'Business websites for SMEs & startups',
      'E-commerce websites (Shopify, WooCommerce, Custom)',
      'Portfolio websites for professionals & agencies',
      'High-conversion landing pages',
      'WordPress & headless CMS development',
      'Custom bespoke website development',
      'Website redesign, modernization & speed optimization',
      'Ongoing website maintenance, security & support',
      'Domain registration and managed hosting consultancy'
    ],
    problemsAddressed: [
      'Outdated, non-responsive websites losing mobile customers',
      'Slow page load speeds harming Google search visibility and ad conversions',
      'Unsecured web platforms susceptible to malware and injection vulnerabilities',
      'Lack of clear brand hierarchy and conversion funnels'
    ],
    keyBenefits: [
      'Sub-second page speeds and top Google Lighthouse performance scores',
      'WCAG accessibility compliance and seamless mobile responsiveness',
      'Integrated SEO schema and metadata for superior organic search rankings',
      'Scalable CMS backends enabling non-technical staff to update content effortlessly'
    ],
    deliverables: [
      'Custom UI/UX component design system',
      'Fully responsive, production-ready codebase',
      'SSL certificate, DNS setup, and production hosting deployment',
      'Content Management System (CMS) with administrative training manual'
    ],
    icon: 'Globe'
  },
  {
    id: 'app-dev',
    number: '02',
    title: 'Mobile and Web Application Development',
    tagline: 'Scalable full-stack web platforms and native mobile apps',
    description: 'From interactive customer portals to mission-critical SaaS architectures, we build robust, cloud-native web and mobile applications using modern frameworks like React, React Native, Node.js, and TypeScript.',
    subServices: [
      'Custom web application development',
      'Business management & operations applications',
      'Progressive Web Applications (PWAs) with offline access',
      'Mobile application development (iOS & Android)',
      'Interactive customer and client self-service portals',
      'Enterprise workflow web applications',
      'SaaS platform architecture and subscription engines',
      'RESTful & GraphQL API development and integration',
      'Scalable database design, normalization, and optimization'
    ],
    problemsAddressed: [
      'Fragmented operational spreadsheets and disconnected manual processes',
      'Inability for field agents or clients to interact in real time on mobile',
      'Legacy applications unable to handle user concurrency and peak transaction loads',
      'High cost and delays of maintaining separate disparate software tools'
    ],
    keyBenefits: [
      'Unified cloud data accessible from any browser or smartphone',
      'Role-based access control protecting sensitive institutional information',
      'Offline-capable PWAs ensuring uninterrupted field operations in low-bandwidth zones',
      'Modular REST APIs enabling seamless connection with legacy systems'
    ],
    deliverables: [
      'High-availability frontend & backend cloud application',
      'App Store & Google Play distribution packages (for mobile)',
      'Full API documentation and OpenAPI schemas',
      'Role-based administration management console'
    ],
    icon: 'Smartphone'
  },
  {
    id: 'business-software-mis',
    number: '03',
    title: 'Business Software & Management Information Systems',
    tagline: 'Automate operations, eliminate silos, and master business intelligence',
    description: 'We develop specialized management information systems and ERP solutions engineered specifically for institutional workflows, healthcare facilities, academic bodies, retail chains, and logistics companies.',
    subServices: [
      'Enterprise Resource Planning (ERP) systems',
      'Customer Relationship Management (CRM) platforms',
      'Human Resource Management Systems (HRMS & Payroll)',
      'Inventory, procurement & multi-warehouse management',
      'Point of Sale (POS) systems with hardware integration',
      'School management & student information systems',
      'Hospital and clinic management systems (EMR/EHR)',
      'Accounting, billing, and financial reconciliation systems',
      'Project management and resource allocation platforms',
      'Custom Management Information Systems (MIS) dashboards'
    ],
    problemsAddressed: [
      'Stock shrinkage and inventory discrepancies across branch locations',
      'Manual payroll computations and human-error prone financial reconciliations',
      'Paper-based medical patient files causing treatment bottlenecks and lost records',
      'Disjointed student fee tracking and academic record disorganization'
    ],
    keyBenefits: [
      'Automated reconciliation with payment gateways (M-Pesa, card, bank transfers)',
      'Real-time executive dashboards reporting revenue, margins, and operational KPIs',
      'Audit logs tracking every document change, payment entry, and user login',
      'Multi-branch synchronization with automated stock reorder triggers'
    ],
    deliverables: [
      'Tailored ERP/MIS software deployment configured to your business structure',
      'Data migration scripts for transferring historical records safely',
      'Automated financial and regulatory reporting modules',
      'Staff onboarding training sessions and comprehensive system user guides'
    ],
    icon: 'Layers'
  },
  {
    id: 'it-consultancy-support',
    number: '04',
    title: 'General IT Consultancy and Technical Support',
    tagline: 'Strategic technology advisory and dependable systems maintenance',
    description: 'We serve as your fractional Chief Technology Officer and IT department, guiding strategic digital investments, evaluating technical vendor proposals, and resolving mission-critical systems failures.',
    subServices: [
      'IT strategy, digital roadmap and technology budget planning',
      'Comprehensive technology infrastructure assessments',
      'Digital transformation consultancy for legacy enterprises',
      'Network, server, and workplace IT infrastructure planning',
      'Commercial software selection, RFP drafting, and vendor implementation',
      'SLA-backed IT support, remote troubleshooting & helpdesk',
      'Business process automation advisory',
      'Technology training, staff upskilling, and digital capacity building'
    ],
    problemsAddressed: [
      'Purchasing expensive commercial software that fails to solve internal needs',
      'Repeated system outages and network instability hurting daily business output',
      'Lack of clear IT policy, disaster recovery plans, and equipment lifecycles',
      'Staff resistance or inability to adopt modern digital business tools'
    ],
    keyBenefits: [
      'Impartial expert guidance saving millions in mismatched software licenses',
      'Predictable IT spending and streamlined technology operational budgets',
      'Reduced downtime through proactive health checks and preventive maintenance',
      'Empowered workforce through structured hands-on technology workshops'
    ],
    deliverables: [
      'Quarterly/Annual Digital Transformation Roadmap Document',
      'Hardware and network audit report with remediation priority matrix',
      'Vendor evaluation scorecard and implementation oversight',
      'SLA agreement with guaranteed incident response windows'
    ],
    icon: 'Cpu'
  },
  {
    id: 'cloud-hosting-infra',
    number: '05',
    title: 'Cloud Computing, Hosting and Infrastructure',
    tagline: 'Resilient cloud architecture, DevOps, and zero-downtime hosting',
    description: 'We migrate legacy on-premises servers to modern cloud infrastructure (AWS, Google Cloud, Azure, and managed private clouds), ensuring 99.99% uptime, elastic autoscaling, and automated disaster recovery.',
    subServices: [
      'Cloud deployment and architectural migration consultancy',
      'High-availability managed web hosting solutions',
      'Linux and Windows server provisioning and hardening',
      'Complex website, database, and email migrations',
      'Database hosting, clustering, and read-replica setup',
      'Containerized application deployment (Docker & Kubernetes)',
      'Automated cloud backup and business continuity planning',
      'Corporate email setup (Google Workspace, Microsoft 365, Custom)'
    ],
    problemsAddressed: [
      'Server crashes during promotional campaigns or high-traffic periods',
      'Catastrophic data loss due to lack of automated geo-replicated backups',
      'Uncontrolled cloud hosting expenditures with underutilized compute resources',
      'Unreliable email deliverability with messages landing in client spam folders'
    ],
    keyBenefits: [
      'Autoscaling compute instances that automatically expand with traffic demand',
      'Point-in-time database recovery ensuring minimal data recovery point objective (RPO)',
      'FinOps cost governance lowering monthly cloud bills by up to 40%',
      'Enterprise SPF, DKIM, and DMARC configurations for pristine email deliverability'
    ],
    deliverables: [
      'Cloud infrastructure-as-code configuration scripts',
      'Automated daily offsite snapshot and backup retention schedule',
      'Server monitoring alerts for CPU, memory, storage, and latency thresholds',
      'Disaster Recovery and Business Continuity SOP document'
    ],
    icon: 'Cloud'
  },
  {
    id: 'cybersecurity-data-protection',
    number: '06',
    title: 'Cybersecurity and Data Protection',
    tagline: 'Safeguard institutional assets, customer data, and regulatory compliance',
    description: 'In an era of sophisticated ransomware, identity theft, and strict data protection laws, we harden your digital perimeters, conduct vulnerability assessments, and ensure compliance with Kenyan and global data acts.',
    subServices: [
      'Website and web application security vulnerability assessments',
      'Penetration testing and attack surface mapping',
      'Enterprise security best practices implementation',
      'Data protection and privacy advisory (Kenyan Data Protection Act 2019 / GDPR)',
      'Encrypted cloud backup and ransomware recovery strategies',
      'Granular Role-Based Access Control (RBAC) and MFA deployment',
      'Employee cybersecurity hygiene and phishing simulation training'
    ],
    problemsAddressed: [
      'Financial theft, business email compromise (BEC), and unauthorized transfers',
      'Hefty legal penalties and reputational loss from customer data breaches',
      'Ransomware encrypting local office drives and halting business operations',
      'Weak internal password hygiene and lack of two-factor authentication'
    ],
    keyBenefits: [
      'Full compliance with the Data Protection Commissioner regulations',
      'Early identification and patching of zero-day vulnerabilities before exploitation',
      'Enforced Multi-Factor Authentication (MFA) across all corporate accounts',
      'Resilient air-gapped backup copies immune to ransomware contagion'
    ],
    deliverables: [
      'Comprehensive Vulnerability Assessment and Penetration Testing (VAPT) Report',
      'Institutional Data Privacy Impact Assessment (DPIA) documentation',
      'Hardened IAM / access control architecture',
      'Cybersecurity incident response playbook'
    ],
    icon: 'ShieldCheck'
  },
  {
    id: 'digital-solutions-automation',
    number: '07',
    title: 'Digital Solutions and Business Automation',
    tagline: 'Eliminate repetitive manual tasks through intelligent digital workflows',
    description: 'We connect your disparate business tools, digitize paper forms, create automated customer notification flows, and build real-time executive analytics dashboards to maximize organizational efficiency.',
    subServices: [
      'End-to-end workflow automation (Make, Zapier, Custom microservices)',
      'Digital forms, mobile field data collection, and signature capture',
      'Paperless business process digitization',
      'Custom executive KPI reporting dashboards and data warehousing',
      'Data cleaning, transformation, and structured management solutions',
      'Third-party system integrations (Payment gateways, CRMs, ERPs, SMS/WhatsApp)',
      'AI-assisted business solutions (document parsing, intelligent classification)'
    ],
    problemsAddressed: [
      'Hundreds of staff hours wasted every month retyping information across systems',
      'Slow quote turnaround times allowing competitors to capture prospective clients',
      'Inability for leadership to view real-time company performance without waiting for end-of-month reports',
      'Customer frustration over delayed SMS notifications and manual confirmation receipts'
    ],
    keyBenefits: [
      'Zero manual data re-entry with instantaneous bi-directional system synchronization',
      'Immediate automated invoice generation upon client order placement',
      'Real-time visibility into leads, revenue, and fulfillment milestones',
      'Instant SMS and WhatsApp status updates delighting end consumers'
    ],
    deliverables: [
      'Configured and tested automated workflow pipelines',
      'Self-service mobile-friendly digital intake forms',
      'Executive analytics dashboard with auto-refreshing metrics',
      'System integration connectors with error logging and notification hooks'
    ],
    icon: 'Workflow'
  },
  {
    id: 'digital-branding-creative',
    number: '08',
    title: 'Digital Branding and Creative Technology',
    tagline: 'Compelling brand identity, visual systems, and marketing collateral',
    description: 'We synthesize strategic technology with memorable visual design to ensure your company communicates authority, innovation, and trust across all digital touchpoints and corporate publications.',
    subServices: [
      'Corporate logo design, iconography, and visual brand identity systems',
      'Brand style guides (color systems, typography scales, graphic motifs)',
      'Corporate stationery, business cards, email signatures, and letterheads',
      'Digital marketing strategy and conversion rate consultancy',
      'Social media creative asset templates and motion design',
      'High-stakes investor pitch deck, proposal, and corporate brochure design'
    ],
    problemsAddressed: [
      'Amateurish visual presentation causing enterprise clients to doubt capability',
      'Inconsistent visual branding across sales documents, website, and social channels',
      'Cluttered investor presentations that obscure core business value',
      'Lack of recognizable digital brand assets in competitive marketplaces'
    ],
    keyBenefits: [
      'Distinctive corporate identity that inspires immediate client trust and confidence',
      'Cohesive visual guidelines ensuring unified presentation across all departments',
      'Persuasive pitch decks and proposals engineered to win high-value tenders',
      'Vector asset kits prepared for digital, print, and physical architectural branding'
    ],
    deliverables: [
      'Complete Brand Identity Guidelines Manual (PDF & Vector package)',
      'High-resolution logo package (SVG, PNG, EPS in all color variants)',
      'Editable corporate presentation templates (PowerPoint / Google Slides / Figma)',
      'Marketing collateral kit for social media and advertising campaigns'
    ],
    icon: 'Palette'
  }
];

export const SECTOR_SOLUTIONS: SectorSolution[] = [
  {
    id: 'smes',
    title: 'Small & Medium Enterprises (SMEs)',
    targetAudience: 'Growing trading companies, distributors, and service providers',
    challenges: [
      'Managing sales, stock, and credit ledgers in paper books or single-user spreadsheets',
      'Cash flow blindspots caused by delayed reconciliation of mobile money and bank payments',
      'Inability to monitor branch staff operations without physical site visits'
    ],
    solutions: [
      'Integrated cloud POS and inventory management synchronized with M-Pesa Till & Paybill numbers',
      'Lightweight web-based customer management system with automated SMS invoice reminders',
      'Professional corporate web presence establishing business legitimacy for bank financing'
    ],
    outcomes: [
      '30% reduction in stock loss through real-time inventory tracking',
      'Accelerated invoice settlement cycles with automated payment triggers',
      'Seamless multi-branch control accessible from the owner’s smartphone'
    ],
    exampleSystem: 'Cloud POS & Multi-Store Inventory Reconciliation System'
  },
  {
    id: 'startups',
    title: 'Startups & Tech Entrepreneurs',
    targetAudience: 'Early-stage founders, venture builders, and innovation hubs',
    challenges: [
      'Need to build and launch high-quality MVPs within constrained capital timelines',
      'Scalability bottlenecks when user traction surges unexpectedly',
      'Lack of in-house full-stack software architecture expertise'
    ],
    solutions: [
      'Rapid prototype-to-production engineering using modern modular TypeScript stacks',
      'Serverless and containerized cloud setups that scale dynamically from 10 to 100,000 users',
      'Third-party payment, biometric identity, and geospatial API integrations'
    ],
    outcomes: [
      'Time-to-market reduced from 9 months to under 8 weeks',
      'Zero infrastructure overhead during initial pre-revenue phases',
      'Investor-ready tech architecture capable of passing stringent technical due diligence'
    ],
    exampleSystem: 'Scalable Fintech / Proptech Micro-Service Architecture'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Organizations & Clinics',
    targetAudience: 'Hospitals, outpatient clinics, diagnostics labs, and pharmacies',
    challenges: [
      'Missing or delayed physical patient files creating agonizing queue times',
      'Frequent medication stockouts and expired pharmaceuticals on dispensary shelves',
      'Vulnerability to regulatory sanctions regarding patient health data privacy'
    ],
    solutions: [
      'Custom Electronic Health Record (EHR) and clinic management portal',
      'Automated pharmacy dispensing management with expiration alerts and batch tracking',
      'Data-compliant patient appointment booking and digital lab results distribution'
    ],
    outcomes: [
      '55% drop in average outpatient patient wait times',
      'Zero stock waste from undetected medication expirations',
      'Full compliance with health data privacy mandates and insurance claim audit trails'
    ],
    exampleSystem: 'Unified Clinic EMR & Outpatient Scheduling Portal'
  },
  {
    id: 'education',
    title: 'Educational Institutions & Academies',
    targetAudience: 'Primary & secondary schools, colleges, vocational training institutes',
    challenges: [
      'Difficulty collecting student fees and tracking outstanding installment balances',
      'Time-consuming manual preparation of academic report cards and transcripts',
      'Weak communication channels between administration, teachers, and parents'
    ],
    solutions: [
      'Comprehensive School Management Information System (MIS)',
      'Automated student fee collection with instant SMS receipts sent to parents',
      'Teacher gradebook module that auto-computes rankings, averages, and printable report sheets'
    ],
    outcomes: [
      '98% timely fee collection rate with automated installment reminders',
      'Report card processing time cut from two weeks to under two hours',
      'Enhanced institutional reputation and increased student enrollment inquiries'
    ],
    exampleSystem: 'Institutional Student Information System & Parent Fee Portal'
  },
  {
    id: 'retail',
    title: 'Retail & E-Commerce Businesses',
    targetAudience: 'Fashion boutiques, electronics retailers, supermarkets, and B2B wholesalers',
    challenges: [
      'High cart abandonment due to lack of localized payment options (M-Pesa, Airtel Money)',
      'Discrepancies between inventory shown on the online store and physical shop shelves',
      'High logistics and courier delivery coordination costs'
    ],
    solutions: [
      'Omnichannel e-commerce web platform synchronized directly with physical store POS',
      'Direct M-Pesa Express STK push integration with instant order confirmation',
      'Automated dispatch routing connecting local courier API services'
    ],
    outcomes: [
      '42% increase in checkout completions via instant mobile money STK push',
      'Eliminated accidental overselling of out-of-stock items',
      'Real-time package tracking updates sent automatically to customer phones'
    ],
    exampleSystem: 'Omnichannel B2C Storefront with Integrated Mobile Money STK Engine'
  },
  {
    id: 'ngos',
    title: 'NGOs & Development Organizations',
    targetAudience: 'International non-profits, community-based organizations, donor projects',
    challenges: [
      'Collecting reliable field data in remote areas with zero or unstable internet connectivity',
      'Generating donor-compliant monitoring and evaluation (M&E) reports with verifiable evidence',
      'Managing procurement transparency and grant budget tracking across projects'
    ],
    solutions: [
      'Offline-first Progressive Web Applications with automatic background sync upon reconnection',
      'Interactive geospatial M&E dashboards visualizing project impact indicators for donors',
      'Transparent grant expenditure workflow with multi-level approval hierarchies'
    ],
    outcomes: [
      '100% data integrity from rural field surveys with GPS verification',
      'Automated quarterly donor progress reporting saving weeks of administrative compilation',
      'Transparent audit-ready fund tracking ensuring renewed grant allocations'
    ],
    exampleSystem: 'Offline-First Field Survey & Donor M&E Impact Dashboard'
  },
  {
    id: 'professional-firms',
    title: 'Professional Service Firms',
    targetAudience: 'Legal practices, accounting firms, engineering consultancies, architects',
    challenges: [
      'Unbillable hours lost in disorganized document management and email threads',
      'Client anxiety over case or project progress requiring repetitive manual phone updates',
      'Need for authoritative digital presentation to command premium advisory fees'
    ],
    solutions: [
      'Secure client collaboration portal for confidential document exchange and electronic signing',
      'Automated timesheet and milestone billing system integrated with project workflows',
      'World-class corporate website with thought leadership publishing engine'
    ],
    outcomes: [
      'Enhanced billable hour capture by 22% through automated tracking',
      'Higher win rates on high-value corporate advisory mandates',
      'Secure client document repositories replacing insecure email attachments'
    ],
    exampleSystem: 'Confidential Client Case Management & Secure Document Vault'
  },
  {
    id: 'corporates',
    title: 'Corporate Enterprises & Institutions',
    targetAudience: 'Financial institutions, manufacturing conglomerates, state corporations',
    challenges: [
      'Rigid legacy mainframe systems that cannot easily expose APIs to new modern tools',
      'Strict corporate governance, SOC2/ISO security standards, and disaster recovery mandates',
      'Siloed departments leading to duplicate data and slow inter-divisional communication'
    ],
    solutions: [
      'Micro-service middleware layers creating secure REST/GraphQL bridges over legacy systems',
      'Enterprise-grade single sign-on (SSO), data encryption at rest and in transit, and auditing',
      'High-availability cloud infrastructure with 99.99% SLA and dedicated DevSecOps support'
    ],
    outcomes: [
      'Modern digital customer experiences launched without replacing core legacy databases',
      'Flawless security compliance passing external penetration testing and regulatory audits',
      'Accelerated organizational agility with automated cross-divisional data feeds'
    ],
    exampleSystem: 'Enterprise API Gateway & Cross-Platform Orchestration Layer'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-01',
    title: 'LogiFin Global Supply Chain & Trade Finance Engine',
    category: 'Business Systems',
    tagline: 'Multi-currency logistics management and automated freight invoicing',
    description: 'Demonstration enterprise platform built to showcase our ERP and financial reconciliation capabilities. Connects customs documentation, container tracking, and freight financing with instant automated invoicing.',
    challenge: 'Cross-border logistics operators routinely suffer from 14-day invoice dispute delays, mismatched bill of lading records, and manual currency conversion risks.',
    solution: 'Engineered a unified web-based portal integrating GPS telemetry feeds, automated OCR bill-of-lading scanning, and multi-currency ledger engines supporting KES, USD, and EUR.',
    results: [
      'Reduced average freight billing reconciliation from 14 days to under 4 hours',
      'Zero currency exchange discrepancies across cross-border transport routes',
      'Full visual container tracking map with real-time waypoint alerts'
    ],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    image: '/src/assets/images/laptop_desk_dashboard_1793452677488.jpg',
    isDemonstration: true,
    demoMetrics: '96.5% On-Time Clearance · $1.8M Tracked Volume'
  },
  {
    id: 'proj-02',
    title: 'Nuru Mobile Merchant Commerce & Micro-Credit PWA',
    category: 'Mobile Apps',
    tagline: 'Lightweight offline-first mobile app for micro-merchants',
    description: 'Demonstration mobile fintech app highlighting our Progressive Web App (PWA) engineering and mobile money payment workflows. Enables small retail stall operators to record sales, issue digital receipts, and access inventory micro-credit.',
    challenge: 'Micro-retailers operate in dense urban markets with volatile mobile internet connectivity and cannot afford bulky POS machines or native app downloads.',
    solution: 'Constructed an ultra-fast PWA with IndexedDB offline transaction caching, instant M-Pesa STK push integration, and automated Bluetooth receipt printer support.',
    results: [
      '100% offline transaction reliability with automatic background synchronization',
      'Less than 2.5MB total initial payload size for fast 3G network loading',
      'Integrated SMS receipt dispatch reducing printed paper operational costs'
    ],
    technologies: ['React', 'PWA / Service Workers', 'Tailwind CSS', 'M-Pesa API', 'IndexedDB'],
    image: '/src/assets/images/person_holding_phone_app_1793452677022.jpg',
    isDemonstration: true,
    demoMetrics: '< 2.5MB Payload · 100% Offline Capable'
  },
  {
    id: 'proj-03',
    title: 'QuantumLink Enterprise Distributed Cloud Mesh',
    category: 'Cloud & Security',
    tagline: 'High-availability infrastructure orchestration and security monitoring',
    description: 'Demonstration cloud infrastructure architecture demonstrating multi-region failover, automated vulnerability scanning, and low-latency API routing for critical enterprise workloads.',
    challenge: 'Financial and technology firms face severe penalties and revenue loss during single-zone cloud outages and cyber intrusions.',
    solution: 'Designed an automated Terraform-managed cloud architecture featuring global load balancers, automated database replication, and zero-trust IAM security policies.',
    results: [
      'Achieved 99.99% continuous uptime simulation across multiple cloud regions',
      'Sub-50ms regional API response latency across East African edge nodes',
      'Automated daily encrypted snapshot backups with 15-minute point-in-time recovery'
    ],
    technologies: ['AWS / GCP', 'Terraform', 'Kubernetes', 'Cloudflare', 'PostgreSQL', 'Docker'],
    image: '/src/assets/images/strategy_meeting_whiteboard_1793452675937.jpg',
    isDemonstration: true,
    demoMetrics: '99.99% Simulated Uptime · < 50ms Edge Latency'
  },
  {
    id: 'proj-04',
    title: 'AfrInnovate Institute Corporate Digital Platform',
    category: 'Websites',
    tagline: 'Bespoke corporate website with interactive course catalog & lead funnel',
    description: 'Demonstration institutional web portal showcasing corporate branding, sub-second load times, and dynamic inquiry routing for executive education and digital certification programs.',
    challenge: 'Academic and training institutions frequently lose prospective corporate sponsors due to slow, poorly designed legacy websites with broken inquiry forms.',
    solution: 'Developed an elegant corporate web presence with clean typographic hierarchy, interactive program search, and automated CRM lead capture.',
    results: [
      'Perfect 100/100 Google Lighthouse Desktop Performance score',
      '180% increase in submitted executive corporate inquiry forms in simulated tests',
      'Accessible WCAG AA compliant navigation and high-contrast typography'
    ],
    technologies: ['React 19', 'Tailwind CSS', 'TypeScript', 'SEO Schema', 'Express API'],
    image: '/src/assets/images/office_daylight_workspace_1793452674957.jpg',
    isDemonstration: true,
    demoMetrics: '100/100 Lighthouse · 0.4s FCP Speed'
  }
];

export const VENDOR_COMPARISON_MATRIX = [
  {
    criterion: 'Full Codebase & IP Ownership',
    infranovix: '100% Client-Owned, zero vendor lock-in',
    foreignSaaS: 'Rented licenses, no access to underlying code',
    genericFreelancers: 'Fragmented or undocumented custom code'
  },
  {
    criterion: 'Regional Payment Integration (M-Pesa / E-Banking)',
    infranovix: 'Native STK Push, B2C, automated bank reconciliation',
    foreignSaaS: 'Often requires complex 3rd-party webhook middleware',
    genericFreelancers: 'Basic plugins prone to silent transaction drops'
  },
  {
    criterion: 'Data Sovereignty & KDPA Compliance',
    infranovix: 'Kenya Data Protection Act 2019 compliant architecture',
    foreignSaaS: 'Data stored in foreign jurisdictions with unclear legal jurisdiction',
    genericFreelancers: 'Rarely audited for regulatory data protection'
  },
  {
    criterion: 'Architecture & Load Resilience',
    infranovix: 'Containerized microservices, sub-second TTFB, high concurrency',
    foreignSaaS: 'Subject to multi-tenant shared server throttling',
    genericFreelancers: 'Monolithic or single shared host vulnerable to crashes'
  },
  {
    criterion: 'Ongoing SLA & Technical Accountability',
    infranovix: 'Contractual uptime guarantee with dedicated local engineering leads',
    foreignSaaS: 'Tier-1 ticket support with 48-72h overseas response times',
    genericFreelancers: 'Unreliable availability once initial invoice is cleared'
  }
];


export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'art-01',
    title: 'Architecting for Resilience: Why African Enterprises Must Adopt Cloud-Native Systems in 2026',
    slug: 'cloud-native-resilience-african-enterprises-2026',
    category: 'Cloud Computing, Hosting and Infrastructure' as any,
    readTime: '6 min read',
    date: 'October 24, 2026',
    summary: 'Moving beyond legacy on-premises physical servers to containerized cloud architectures guarantees business continuity, elastic cost scaling, and disaster recovery.',
    content: [
      'For decades, many mid-sized and large enterprises across Kenya and East Africa relied on physical server racks stored in dedicated office server rooms. While this gave leadership a tangible sense of control, it introduced enormous operational risks: power outages, equipment overheating, localized hardware failures, and catastrophic vulnerability to physical theft or fire.',
      'In 2026, the economics of infrastructure have fundamentally changed. Modern cloud providers offer regional edge points of presence across the African continent, delivering latencies well under 40 milliseconds.',
      'By transitioning to cloud-native architectures—leveraging containerization with Docker and Kubernetes, alongside managed relational databases—businesses eliminate single points of failure. When peak customer demand occurs (such as month-end salary processing or holiday sales rushes), cloud resources scale elastically to absorb the load without manual intervention.',
      'Furthermore, FinOps methodologies allow engineering teams to continuously monitor compute utilization, shutting down idle staging environments and rightsizing production instances to reduce monthly cloud expenditure by 30% to 45%.'
    ],
    keyTakeaways: [
      'Eliminate physical single points of failure with geo-replicated cloud storage',
      'Autoscale compute resources during traffic surges to maintain uninterrupted responsiveness',
      'Adopt FinOps governance to prevent cloud cost overruns and maintain predictable monthly operational budgets'
    ]
  },
  {
    id: 'art-02',
    title: 'The Real Cost of Custom Software vs Commercial Off-The-Shelf (COTS) Solutions',
    slug: 'custom-software-vs-cots-cost-analysis',
    category: 'Software Development',
    readTime: '7 min read',
    date: 'October 16, 2026',
    summary: 'A pragmatic framework for business executives evaluating whether to subscribe to existing SaaS packages or invest in bespoke proprietary technology.',
    content: [
      'When an organization identifies an operational bottleneck, executive leadership invariably faces a strategic dilemma: should we subscribe to an existing commercial off-the-shelf (COTS) software package, or commission a custom software system tailored specifically to our proprietary workflows?',
      'COTS software offers speed of initial deployment. For standard, non-differentiating operational tasks—such as generic office email, standard payroll tax calculations, or basic video conferencing—subscribing to mature commercial platforms is almost always the economically rational choice.',
      'However, when applied to core competitive business processes—such as specialized logistics dispatch, unique credit appraisal scoring, or proprietary manufacturing quality control—COTS packages rapidly reveal severe limitations.',
      'Per-seat licensing costs compound aggressively as headcount grows. More critically, organizations frequently discover they must alter their efficient, proven workflows to conform to the rigid data models enforced by foreign software vendors.',
      'A well-engineered custom software platform transforms technology from an ongoing operational expense into a balance-sheet asset that the company owns outright, without recurrent user license fees.'
    ],
    keyTakeaways: [
      'Use COTS for commoditized utility functions (email, baseline payroll)',
      'Build custom software for your core value proposition and proprietary competitive advantages',
      'Factor 3-year per-seat licensing escalation into your total cost of ownership (TCO) calculations'
    ]
  },
  {
    id: 'art-03',
    title: 'Navigating Kenya’s Data Protection Act: A Practical Guide for Technology Leaders',
    slug: 'kenya-data-protection-act-compliance-guide',
    category: 'Cybersecurity',
    readTime: '5 min read',
    date: 'October 08, 2026',
    summary: 'Crucial technical mandates every developer and enterprise must implement to satisfy the Office of the Data Protection Commissioner (ODPC).',
    content: [
      'The enforcement of the Kenya Data Protection Act (KDPA) 2019 has transitioned from an advisory posture to aggressive regulatory enforcement, with substantial statutory penalties for non-compliant organizations.',
      'For software architects and business executives, compliance is not merely a legal checklist; it requires fundamental architectural decisions embedded directly in database design and application source code.',
      'First, Data Minimization: software systems must only collect personal data strictly required to deliver the primary service. Extraneous fields—such as unnecessary identification numbers or birthdates—must be eliminated from registration funnels.',
      'Second, Purpose Limitation & Consent: users must be presented with explicit, unbundled opt-in mechanisms rather than pre-checked consent toggles.',
      'Third, Encryption at Rest and in Transit: all personally identifiable information (PII) stored in databases must be encrypted using AES-256 standards, with TLS 1.3 enforced across all API communication endpoints.',
      'Finally, Right to Erasure: your engineering architecture must provide mechanisms to anonymize or purge customer personal records upon valid statutory request without corrupting historical financial audit trails.'
    ],
    keyTakeaways: [
      'Enforce end-to-end encryption for all personal data both in transit and at rest',
      'Implement granular role-based access control so employees access only essential records',
      'Design automated data anonymization workflows to fulfill statutory erasure requests'
    ]
  },
  {
    id: 'art-04',
    title: 'Why Progressive Web Apps (PWAs) Are Winning the Battle for Emerging Market Mobile Commerce',
    slug: 'pwa-revolution-emerging-markets-mobile-commerce',
    category: 'Website Development',
    readTime: '6 min read',
    date: 'September 28, 2026',
    summary: 'How PWAs solve storage friction, mobile internet latency, and high app store commissions for African consumer brands.',
    content: [
      'In many emerging economies, mobile devices represent the primary gateway to the internet. However, a significant portion of consumers use budget or mid-tier smartphones with limited internal storage space (32GB to 64GB).',
      'When a brand demands that a customer download a 95MB native app from Google Play or the Apple App Store just to order a product or check an account status, conversion rates plummet. Users routinely uninstall apps to free up storage for personal photos and messaging apps.',
      'Progressive Web Applications (PWAs) deliver the decisive solution. A PWA operates directly within the mobile browser yet delivers native app features: home-screen installation, push notifications, offline caching, and instant launch speeds.',
      'Because a PWA requires only a few megabytes of cached assets, friction drops to zero. Users can browse product catalogs even when stepping into low-connectivity basement shops or rural transit zones.'
    ],
    keyTakeaways: [
      'Bypass app store installation resistance and 30% platform commissions',
      'Maintain continuous user engagement with lightweight home screen shortcuts and push notifications',
      'Ensure uninterrupted browsing with local cache storage even in offline environments'
    ]
  }
];
