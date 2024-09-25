// sections.d.ts

export interface HeroSection {
    type: 'hero';
    imageURI: string;
}

export interface ImageTextSection {
    type: 'image-text';
    imageURI: string;
    text: string;
    title?: string;
    leftToRight?: boolean;
}

export interface DataSection {
    type: 'data';
    url: string;
}

export type Section = HeroSection | ImageTextSection | DataSection;