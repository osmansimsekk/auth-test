import countries from "world-countries";

export const countryOptions = countries
  .map((country) => ({
    label: country.name.common,
    value: country.cca2,
    flag: country.flag,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const COUNTRY_CODES = new Set(countries.map((c) => c.cca2));
