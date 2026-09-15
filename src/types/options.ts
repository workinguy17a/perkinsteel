export interface GlobalImage {
  url: string;
  alt: string;
}
export interface GlobalAchievement {
    image: GlobalImage;
    text: string;
  }

export interface GlobalOptions {
  logo: {
    url: string;
    alt: string;
  };

  socialLinks: {
    icons: string;
    url: string;
  }[];

  phoneNumber: string;
  email: string;
  address: string;
  bottomText:string;
  copyright: string;

  usp: {
    icon: string;
    text: string;
  }[];

  achievement: GlobalAchievement[];
  
}