import React, { useState } from "react";
import Countries from "../components/Countries";
import Country from "../components/Country";
import Header from "../components/Header";
import Main from "../components/Main";
import TextInput from "../components/TextInput";

import { allCountries } from "../data/countries";

export default function ReactCountriesPage() {
	const [countryFilter, setCountryFilter] = useState("");
	const [visitedCountries, setVisitedCountries] = useState([]);

	function handleCountryFilterChange(newCountryFilter) {
		setCountryFilter(newCountryFilter);
	}

	function toggleVisitedCountry(countryId) {
		//console.log(countryId);
		let newVisitedCountries = [...visitedCountries];

		if (newVisitedCountries.indexOf(countryId) !== -1) {
			newVisitedCountries = newVisitedCountries.filter((visitedCountryId) => {
				return visitedCountryId !== countryId;
			});
		} else {
			newVisitedCountries.push(countryId);
		}
		setVisitedCountries(newVisitedCountries);
	}

	const countryFilterLowercase = countryFilter.trim().toLocaleLowerCase();

	const filteredCountries =
		countryFilterLowercase.length >= 3
			? allCountries.filter(({ nameLowerCase }) => {
					return nameLowerCase.includes(countryFilterLowercase);
			  })
			: allCountries;

	return (
		<div>
			<Header>react-countries</Header>
			<Main>
				<TextInput
					id="InputCountryFilter"
					labelDescription="Informe o nome do pais (pelo menos três caracteres)"
					inputValue={countryFilter}
					onInputChange={handleCountryFilterChange}
					autoFocus
				></TextInput>

				{/* <Countries
					visitedCountries={visitedCountries}
					onCountryClick={toggleVisitedCountry}
				>
					{filteredCountries}
				</Countries> */}
				<Countries>
					<h2 className="text-center font-semibold">
						{filteredCountries.length} país(es)
					</h2>
					<h3 className="text-center font-semibold">
						{visitedCountries.length} país(es) visitados
					</h3>
					{filteredCountries.map((country) => {
						const isVisited = visitedCountries.indexOf(country.id) !== -1;
						return (
							<Country
								isVisited={isVisited}
								onCountryClick={toggleVisitedCountry}
								key={country.id}
							>
								{country}
							</Country>
						);
					})}
				</Countries>
			</Main>
		</div>
	);
}
