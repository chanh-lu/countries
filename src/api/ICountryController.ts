import { Country } from "../types/Country";

export interface ICountryController {
  getAllAsync(): Promise<Country[]>;
  getByNameAsync(name: string): Promise<Country>;
}
