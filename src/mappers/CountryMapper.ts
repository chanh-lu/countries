import { Country } from "../types/Country";

export function mapRestCountriesToCountries(data: any[]): Country[] {
  return data.map((item: any) => {
    return {
      name: item.name.common,
      officialName: item.name.official,
      flagUrl: item.flags.svg,
      flagAlt: item.flags.alt,
    };
  });
}
