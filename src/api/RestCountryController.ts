import { mapRestCountriesToCountries } from "../mappers/CountryMapper";
import { Country } from "../types/Country";
import { ICountryController } from "./ICountryController";

export class RestCountryController implements ICountryController {
  version = "v3.1";
  baseUrl = "https://restcountries.com";

  async getAllAsync(): Promise<Country[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.version}/all`);
      const data = await response.json();
      return mapRestCountriesToCountries(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getByNameAsync(name: string): Promise<Country> {
    throw new Error("Method not implemented.");
  }
}
