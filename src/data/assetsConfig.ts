// Configuration for real corporate photography placeholders across the website.
// These URLs can be swapped with custom client assets or uploaded photos via the Admin Portal.

export interface PhotoAsset {
  id: string;
  label: string;
  description: string;
  url: string;
  alt: string;
}

export const DEFAULT_PHOTOS: Record<string, PhotoAsset> = {
  hero: {
    id: 'hero',
    label: 'Hero Workspace Photo',
    description: 'Main photography of developers in daylight engineering workspace',
    url: '/src/assets/images/office_daylight_workspace_1793452674957.jpg',
    alt: 'Infranovix Technologies software engineering team in Nairobi'
  },
  aboutTeam: {
    id: 'aboutTeam',
    label: 'Corporate Strategy & Boardroom Meeting',
    description: 'Engineers and consultants in modern strategy session around whiteboard',
    url: '/src/assets/images/strategy_meeting_whiteboard_1793452675937.jpg',
    alt: 'Infranovix enterprise technical strategy and architecture session'
  },
  portfolioEnterprise: {
    id: 'portfolioEnterprise',
    label: 'Enterprise MIS / Web App Laptop Showcase',
    description: 'Realistic desk photography displaying corporate dashboard on laptop',
    url: '/src/assets/images/laptop_desk_dashboard_1793452677488.jpg',
    alt: 'Custom enterprise management system and logistics dashboard'
  },
  portfolioMobile: {
    id: 'portfolioMobile',
    label: 'Mobile Payment & Commerce App in Hand',
    description: 'Hands holding smartphone running high-speed mobile payment PWA',
    url: '/src/assets/images/person_holding_phone_app_1793452677022.jpg',
    alt: 'Infranovix mobile banking and merchant payment application'
  }
};
