export interface Country{
    name: string;
    iso2: string;
    iso3: string;

    flag?: string;
    population?: {
        year: number;
        value: number;
        }[];
    currency?: string;
    capital?: string;
    dialCode?: string;
    states?: string[];
    cities?: string[];
}