export interface AboutImage {
  url: string;
  alt: string;
}

export interface AboutLink {
  title: string;
  url: string;
  target?: string;
}

export interface AboutHistoryItem {
  image: AboutImage;
  text: string;
  cta?: AboutLink;
}

export interface AboutAchievement {
  image: AboutImage;
  text: string;
}

export interface AboutSupplyCategory {
  id: number;
  name: string;
  slug: string;
  image: {
    url: string;
    alt: string;
  };
}

export interface AboutFaq {
  question: string;
  answer: string;
}

export interface AboutData {
  pageTitle: string;
  content: string;

  featuredImage: {
    url: string;
    alt: string;
  };
  banner: {
    image: AboutImage;
    title: string;
    text: string;
  };

  history: {
    title: string;
    subText: string;
    items: AboutHistoryItem[];
  };

  achievement: AboutAchievement[];

  whyChoose: {
    title: string;
    content: string;
    cta?: AboutLink;
    image: AboutImage;
  };

  supply: {
    title: string;
    text: string;
    categories: AboutSupplyCategory[];
  };

  faq: {
    title: string;
    subText: string;
    cta?: AboutLink;
    items: AboutFaq[];
  };
}