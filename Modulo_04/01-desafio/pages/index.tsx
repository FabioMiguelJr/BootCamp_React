import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import profilePic from "../public/unavailable.png";

export default function Home() {
	const StyledButton = styled.button`
		background-color: transparent;
		border: 1px solid black;
		border-radius: 5px;
		padding: 12px;
		margin: 16px 32px;
		:hover {
			cursor: pointer;
			background-color: #f2f2f2;
		}
	`;

	const DivContainer = styled.div`
		display: flex;
		flex-direction: column;
	`;

	const DivContButton = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	`;

	const DivContInput = styled.div`
		width: 100%;
		padding: 0px 32px;
		margin-top: 18px;
	`;

	const DivContDetails = styled.div`
		margin-left: 8px;
	`;

	const StyledInput = styled.input`
		width: 100%;
		height: 42px;
		padding: 0px 12px;
	`;

	const StyledUl = styled.ul`
		padding: 2rem;
		list-style: none;
	`;

	const StyledLi = styled.li`
		background-color: lightgrey;
		border-radius: 12px;
		overflow: hidden;
		margin: 1rem;
		padding: 1rem;
	`;

	const StyledH3 = styled.h3`
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	`;

	const [data, setData] = useState([]);
	const [pagina, setPagina] = useState<number>(1);

	useEffect(() => {
		fetch(`https://api.coingecko.com/api/v3/exchanges/?per_page=100&page=${pagina}`)
			.then((response) => response.json())
			.then(setData);
	}, [pagina]);

	function pageUp(pg: number) {
		let newPage: number;
		newPage = pg + 1;
		setPagina(newPage);
	}

	function pageDown(pg: number) {
		let newPage: number;
		newPage = pg - 1;
		setPagina(newPage);
	}

	return (
		<DivContainer>
			<DivContButton>
				<div>
					<StyledButton
						onClick={() => {
							pageDown(pagina);
						}}
					>
						Página Anterior
					</StyledButton>
				</div>
				<div>
					<StyledButton
						onClick={() => {
							pageUp(pagina);
						}}
					>
						Página Posterior
					</StyledButton>
				</div>
			</DivContButton>
			<DivContInput>
				<StyledInput placeholder="Filtre por nome" type="text" />
			</DivContInput>
			<DivContainer>
				<StyledUl>
					{data.map((item: any) => (
						<StyledLi key={item.id}>
							<StyledH3>
								<span className="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
									<span className="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
										<Image
											src={
												item.image === "missing_small.png"
													? profilePic
													: item.image
											}
											width={80}
											height={80}
											alt="Imagem"
										/>
									</span>
								</span>
								<DivContDetails>{item.name}</DivContDetails>
							</StyledH3>
							<div>
								Ano da criação:{" "}
								<b>
									{item.year_established
										? item.year_established
										: "não declarado"}
								</b>
							</div>
							<div>
								Pais: <b>{item.country ? item.contry : "não declarado"}</b>
							</div>
							<div>
								Pontuação:{" "}
								<b>{item.trust_score ? item.trust_score : "não declarado"}</b>
							</div>
							<div>
								Volume de trade (24 horas):{" "}
								<b>
									{item.trade_volume_24h_btc_normalized
										? item.trade_volume_24h_btc_normalized
										: "não declarado"}
								</b>
							</div>
						</StyledLi>
					))}
				</StyledUl>
			</DivContainer>
		</DivContainer>
	);
}
