import { Country } from 'models/model';

export const mockCountry: Partial<Country> = {
  name: 'Nigeria',
  borders: ['Benin', 'Cameroun', 'Niger'],
  flags: {
    svg: 'svg',
    png: 'png',
  },
  currencies: [
    {
      name: 'Naira',
      code: 'NGN',
      symbol: 'NGN',
    },
  ],
  capital: 'Abuja',
  languages: [
    {
      iso639_1: 'English',
      iso639_2: 'English',
      name: 'English',
      nativeName: 'Igbo',
    },
  ],
};

export const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
