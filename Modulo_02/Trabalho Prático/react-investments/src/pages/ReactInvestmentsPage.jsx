import React from "react";
import Header from "../components/Header";
import Investments from "../components/Investments";
import Main from "../components/Main";
import Item from "../components/Item";

import { investment } from "../data/investments";
import Investment from "../components/Investment";

export default function ReactInvestmentsPage() {
	let valorPercentual = 0;
	let valorAnterior = 0;
	let negFund = false;
	let negAnualFund = false;
	let fundJan = 0;
	let fundAnual = 0;
	let anualPercent = 0;
	let firstLine = false;

	function calcFundPercentage(previous, current) {
		return ((current - previous) / previous) * 100;
	}

	function invReportFilter(fundIdFilter) {
		return investment.reports
			.filter((reportFiltered) => reportFiltered.investmentId === fundIdFilter)
			.sort((jan, dec) => {
				return jan.month - dec.month;
			});
	}

	function investmentFundId(fundID) {
		fundJan = 0;
		fundAnual = 0;
		anualPercent = 0;

		const invReportFiltered = invReportFilter(fundID);

		invReportFiltered.map((report) => {
			if (report.month === 1) {
				fundJan = report.value;
			}
			if (report.month === 12) {
				fundAnual = report.value - fundJan;
			}
			anualPercent = calcFundPercentage(fundJan, report.value);

			return [fundAnual, anualPercent];
		});
		return `R$${fundAnual.toFixed(2)} - (${anualPercent.toFixed(2)}%)`;
	}

	return (
		<div>
			<Header>react-investiments v1.0.1</Header>
			<Main>
				{investment.investments.map(({ description, id }) => {
					const returned = investmentFundId(id);
					negAnualFund = anualPercent < 0 ? true : false;
					return (
						<>
							<Investments className="mt-1" key={id}>
								<div className="text-center">{description}</div>
								<div className="text-center">
									<Item label="Rendimento Total: " negative={negAnualFund}>
										{returned}
									</Item>
								</div>
								{investment.reports
									.filter((reportFiltered) => {
										return reportFiltered.investmentId === id;
									})
									.sort((a, b) => {
										return a.month - b.month;
									})
									.map((reportMaped) => {
										if (reportMaped.month === 1) {
											negFund = false;
											valorPercentual = 0;
											valorAnterior = reportMaped.value;
											firstLine = true;
										} else {
											valorPercentual = calcFundPercentage(
												valorAnterior,
												reportMaped.value
											);
											firstLine = false;
											valorAnterior = reportMaped.value;
											negFund = valorPercentual < 0 ? true : false;
										}
										return (
											<Investment
												id={reportMaped.id}
												key={reportMaped.id}
												negatievValue={negFund}
												percentual={valorPercentual}
												first={firstLine}
											>
												{reportMaped}
											</Investment>
										);
									})}
							</Investments>
						</>
					);
				})}
			</Main>
		</div>
	);
}
