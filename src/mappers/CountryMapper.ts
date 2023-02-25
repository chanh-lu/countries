import { Country } from "../types/Country";

export function mapRestCountriesToCountries(data: any[]): Country[] {
  return data.map((item: any) => {
    const name = item.name;
    return {
      name: name.common,
      officialName: name.official,
    };
  });
}
