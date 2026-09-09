export interface ContactImage {
  url: string;
  alt: string;
}

export interface ContactFeature {
  icon: ContactImage;
  title: string;
  text: string;
}

export interface ContactData {
  pageTitle: string;

  banner: {
    image: ContactImage;
    title: string;
    text: string;
  };

  form: {
    title: string;
    text: string;
    code: string;
  };

  info: {
    title: string;
    text: string;
    followUsTitle: string;
  };

  features: ContactFeature[];

  map: string;
}