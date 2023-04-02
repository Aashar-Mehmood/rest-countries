import SearchBar from "../components/SearchBar";
import FilterDropDown from "../components/FilterDropDown";
import CountryCard from "../components/CountryCard";
import useCountriesApi from "../hooks/useCountriesApi";
import { CountriesContext } from "../Context/CountriesProvider";
import { useContext, useEffect, useState } from "react";
import loadingGif from "../assets/Spinner-0.5s-124px.svg";
export default function Index() {
  const [loading, setLoading] = useState(true);
  const { countries, region } = useContext(CountriesContext);
  const { countriesBasicInfo } = useCountriesApi();
  countriesBasicInfo(region);
  useEffect(() => {
    if (countries.length > 0) {
      setLoading(false);
    }
  }, [countries.length]);
  return (
    <>
      <SearchBar />
      <FilterDropDown />
      {loading ? (
        <img
          className="relative left-2/4 -translate-x-2/4 z-10"
          src={loadingGif}
          alt="loading..."
        />
      ) : (
        countries.map((countryObj, index) => {
          return <CountryCard key={index} {...countryObj} />;
        })
      )}
    </>
  );
}
