
export interface HomepageButton {
  title: string;
  url: string;
  target?: string;
}

export interface HomepageBanner {
  title: string;
  subText: string;
  redText: string;

  image: {
    url: string;
    alt: string;
  };

  buttonOne?: HomepageButton;
  buttonTwo?: HomepageButton;
}

export interface HomepageCategoryBlock {
  image: {
    url: string;
    alt: string;
  };

  name: string;
  text: string;

  link?: {
    title: string;
    url: string;
    target?: string;
  };
}

export interface HomepageWhyChoose {
  title: string;
  text: string;

  cta?: {
    title: string;
    url: string;
    target?: string;
  };
}

export interface HomepageIndustryBlock {
  image: {
    url: string;
    alt: string;
  };
  text: string;
  link?: {
    title: string;
    url: string;
    target?: string;
  };
}

export interface HomepageMidBanner {
  image: {
    url: string;
    alt: string;
  };
  title: string;
  subtitle: string;
  cta?: {
    title: string;
    url: string;
    target?: string;
  };
}

export interface HomepageHospitaliltyCategory {
  id: number;
  name: string;
  slug: string;
  image: {
    url: string;
    alt: string;
  };
}

export interface HomepageFeaturedCategory {
  id: number;
  name: string;
  slug: string;
}

export interface HomePageFaq {
  question: string;
  answer: string;
}

export interface HomePageFaqs {
  title: string;
  subtext:string;
  cta?: {
    title: string;
    url: string;
    target?: string;
  };
  items:HomePageFaq[];
}

export interface HomepageData {
  banner: HomepageBanner;
  categoryBlocks: HomepageCategoryBlock[];
  whyChoose: HomepageWhyChoose;
  industryBlocks: HomepageIndustryBlock[];
  midBanner: HomepageMidBanner;
  hospitalityCategories: HomepageHospitaliltyCategory[];
  featuredProductCategories: HomepageFeaturedCategory[];
  productsPerCategory: number;
  faqSection:HomePageFaqs;
}