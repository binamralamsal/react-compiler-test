import { useEffect, useMemo, useState } from "react";

export function CountriesFromAsia() {
  const [countries, setCountries] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();

      setCountries(countries);
    }

    fetchCountries();
  }, []);

  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>
        Increment ({counter})
      </button>
      <h1>Countries from Asia</h1>
      <CountriesList countries={countries} />
    </div>
  );
}

function CountriesList({ countries }) {
  const asianCountries = countries.filter((country) => {
    for (let i = 0; i <= 5000000; i++) {}
    return country.region === "Asia";
  });

  return (
    <ul>
      {asianCountries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
}
