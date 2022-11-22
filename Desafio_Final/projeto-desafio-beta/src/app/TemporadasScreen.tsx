import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { getTemporadaEndpoit, IPartidas, IRodadas, ITabela } from "./backend";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(2),
			minWidth: 120,
		},
		selectEmpty: {
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 650,
			marginTop: 50,
		},
		direcao: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
	})
);

export default function TemporadasScreen() {
	var tabela: Array<ITabela> = [];

	const classes = useStyles();

	const [ano, setAno] = useState<string>("2003");
	const [temporadaFiltro, setTemporadaFiltro] = useState<IRodadas[]>([]);
	const [partidas, setPartidas] = useState<IPartidas[]>([]);
	const [ultimaRodada, setUltimaRodada] = useState<ITabela[]>([]);

	useEffect(() => {
		getTemporadaEndpoit(ano).then(setTemporadaFiltro);
	}, [ano]);

	useEffect(() => {
		temporadaFiltro.forEach((element, index) => {
			if (temporadaFiltro.length - 1 === index) {
				setPartidas(element.partidas.flat());
				setUltimaRodada(carregaTabela());
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [temporadaFiltro]);

	function carregaTabela(): ITabela[] {
		// eslint-disable-next-line array-callback-return
		partidas.map((equipe, index) => {
			const tm: ITabela = {
				time: equipe.mandante,
				pontos: equipe.pontuacao_geral_mandante.total_pontos,
				vitorias: equipe.pontuacao_geral_mandante.total_vitorias,
				empates: equipe.pontuacao_geral_mandante.total_empates,
				derrotas: equipe.pontuacao_geral_mandante.total_derrotas,
				golsPro: equipe.pontuacao_geral_mandante.total_gols_marcados,
				golsContra: equipe.pontuacao_geral_mandante.total_gols_sofridos,
				saldoGols:
					equipe.pontuacao_geral_mandante.total_gols_marcados -
					equipe.pontuacao_geral_mandante.total_gols_sofridos,
			};

			const tv: ITabela = {
				time: equipe.visitante,
				pontos: equipe.pontuacao_geral_visitante.total_pontos,
				vitorias: equipe.pontuacao_geral_visitante.total_vitorias,
				empates: equipe.pontuacao_geral_visitante.total_empates,
				derrotas: equipe.pontuacao_geral_visitante.total_derrotas,
				golsPro: equipe.pontuacao_geral_visitante.total_gols_marcados,
				golsContra: equipe.pontuacao_geral_visitante.total_gols_sofridos,
				saldoGols:
					equipe.pontuacao_geral_visitante.total_gols_marcados -
					equipe.pontuacao_geral_visitante.total_gols_sofridos,
			};
			tabela.push(tm);
			tabela.push(tv);
		});
		tabela.sort((a, b) => (a.pontos > b.pontos ? -1 : 1));
		return tabela;
	}

	const handleChangeAnos = (event: React.ChangeEvent<{ value: unknown }>) => {
		setAno(event.target.value as string);
	};

	function trataNome(nome: string): string {
		nome = nome.replace(/ /g, "_");
		return nome
			.toLocaleLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
	}

	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				padding="4px 8px"
				height="3em"
				bgcolor="#00FFF9"
				fontSize="1em"
				marginBottom={10}
			>
				react-campeonato-brasileiro
			</Box>
			<Box
				display="flex"
				justifyContent="space-around"
				alignItems="center"
				padding="8px 16px"
				height="3em"
			>
				<Box display="flex" marginBottom={10} flexDirection="column" alignItems="center">
					<FormControl className={classes.formControl}>
						<InputLabel shrink id="select-anos">
							Temporadas
						</InputLabel>
						<Select
							labelId="select-anos"
							id="anos"
							value={ano}
							onChange={handleChangeAnos}
							displayEmpty
							className={classes.selectEmpty}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={2003}>2003</MenuItem>
							<MenuItem value={2004}>2004</MenuItem>
							<MenuItem value={2005}>2005</MenuItem>
							<MenuItem value={2006}>2006</MenuItem>
							<MenuItem value={2007}>2007</MenuItem>
							<MenuItem value={2008}>2008</MenuItem>
							<MenuItem value={2009}>2009</MenuItem>
							<MenuItem value={2010}>2010</MenuItem>
							<MenuItem value={2011}>2011</MenuItem>
							<MenuItem value={2012}>2012</MenuItem>
							<MenuItem value={2013}>2013</MenuItem>
							<MenuItem value={2014}>2014</MenuItem>
							<MenuItem value={2015}>2015</MenuItem>
						</Select>
					</FormControl>
					<FormControl>
						<Box>Campeonato Brasileiro de {ano}</Box>
					</FormControl>
					<Box marginTop={2}>Classificação</Box>
				</Box>
			</Box>
			<div></div>
			<Box>
				<TableContainer>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								{/* <TableCell>Dessert (100g serving)</TableCell> */}
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell>P</TableCell>
								<TableCell>V</TableCell>
								<TableCell>E</TableCell>
								<TableCell>D</TableCell>
								<TableCell>GP</TableCell>
								<TableCell>GC</TableCell>
								<TableCell>S</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className={classes.table}>
							{ultimaRodada.map((rodada: ITabela, i) => (
								<TableRow key={i}>
									<TableCell component="th" scope="ano">
										{i + 1}
									</TableCell>
									<TableCell className={classes.direcao}>
										<Box marginRight={3}>
											<img
												src={`../img/${trataNome(rodada.time)}.png`}
												alt="."
												width="50"
												height="50"
											/>
										</Box>
										<Box>{rodada.time}</Box>
									</TableCell>
									<TableCell>{rodada.pontos}</TableCell>
									<TableCell>{rodada.vitorias}</TableCell>
									<TableCell>{rodada.empates}</TableCell>
									<TableCell>{rodada.derrotas}</TableCell>
									<TableCell>{rodada.golsPro}</TableCell>
									<TableCell>{rodada.golsContra}</TableCell>
									<TableCell>{rodada.saldoGols}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
