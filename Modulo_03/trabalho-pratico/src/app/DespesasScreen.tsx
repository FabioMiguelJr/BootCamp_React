import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { Box, TextField } from "@material-ui/core";
import { getDespesasEndpoint, getDespesasMesEndpoit, IDespesas } from "./backend";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { formatCurrency } from "./dateFunction";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		table: {
			minWidth: 650,
		},
	})
);

export default function DespesasScreen1() {
	const classes = useStyles();

	const [anos, setAnos] = useState<string>("2020");
	const [meses, setMeses] = useState<string>("01");
	const [despesasFiltro, setDespesasFiltro] = useState<IDespesas[]>([]);
	const [despesas, setDespesas] = useState<IDespesas[]>([]);
	const [somatorio, setSomatorio] = useState<number>(0);

	useEffect(() => {
		console.log("1");
		getDespesasEndpoint().then(setDespesasFiltro);
	}, []);

	useEffect(() => {
		console.log("2");
		// eslint-disable-next-line
		despesasFiltro.map((filtro, i) => {
			if (i === 0) {
				setAnos(filtro.mes.substring(0, 4));
				setMeses(filtro.mes.substring(5, 7));
			}
		});
	}, [despesasFiltro]);

	useEffect(() => {
		console.log("3");
		getDespesasMesEndpoit(anos + "-" + meses).then(setDespesas);
	}, [anos, meses]);

	useEffect(() => {
		console.log("4");
		setSomatorio(soma(despesas));
	}, [despesas]);

	const handleChangeAnos = (event: React.ChangeEvent<{ value: unknown }>) => {
		setAnos(event.target.value as string);
	};

	const handleChangeMeses = (event: React.ChangeEvent<{ value: unknown }>) => {
		setMeses(event.target.value as string);
	};

	function soma(despesas: IDespesas[]): number {
		let soma: number = 0;
		// eslint-disable-next-line
		despesas.map((despesa) => {
			soma = soma + Number(despesa.valor);
		});
		// console.log(soma);

		return soma;
	}

	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				padding="4px 8px"
				height="3em"
				bgcolor="primary.main"
				fontSize="1em"
			>
				<Box>Teste</Box>
			</Box>
			<Box display="flex" alignItems="center" padding="8px 16px" height="3em">
				{/* Select dos anos - por enquanto fixo */}
				<Box flex="1">
					<FormControl className={classes.formControl}>
						<InputLabel shrink id="select-anos">
							Anos
						</InputLabel>
						<Select
							labelId="select-anos"
							id="anos"
							value={anos}
							onChange={handleChangeAnos}
							displayEmpty
							className={classes.selectEmpty}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={2019}>2019</MenuItem>
							<MenuItem value={2020}>2020</MenuItem>
							<MenuItem value={2022}>2021</MenuItem>
							<MenuItem value={2023}>2022</MenuItem>
							<MenuItem value={2024}>2023</MenuItem>
							<MenuItem value={2025}>2024</MenuItem>
						</Select>
						{/* <FormHelperText>Label + placeholder</FormHelperText> */}
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel shrink id="select-meses">
							Meses
						</InputLabel>
						<Select
							labelId="select-meses"
							id="meses"
							value={meses}
							onChange={handleChangeMeses}
							displayEmpty
							className={classes.selectEmpty}
						>
							<MenuItem value={"00"}>
								<em>None</em>
							</MenuItem>
							<MenuItem value={"01"}>Janeiro</MenuItem>
							<MenuItem value={"02"}>Fevereiro</MenuItem>
							<MenuItem value={"03"}>Março</MenuItem>
							<MenuItem value={"04"}>Abril</MenuItem>
							<MenuItem value={"05"}>Maio</MenuItem>
							<MenuItem value={"06"}>Junho</MenuItem>
							<MenuItem value={"07"}>Julho</MenuItem>
							<MenuItem value={"08"}>Agosto</MenuItem>
							<MenuItem value={"09"}>Setembro</MenuItem>
							<MenuItem value={"10"}>Outubro</MenuItem>
							<MenuItem value={"11"}>Novembro</MenuItem>
							<MenuItem value={"12"}>Dezembro</MenuItem>
						</Select>
						{/* <FormHelperText>Label + placeholder</FormHelperText> */}
					</FormControl>
				</Box>
				<Box>
					<TextField
						id="standard-read-only-input"
						label="Despesa Toal: "
						// defaultValue={somatorio}
						value={formatCurrency(somatorio)}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Box>
			</Box>
			<div></div>
			<Box>
				<TableContainer>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								{/* <TableCell>Dessert (100g serving)</TableCell> */}
								<TableCell>Descrição</TableCell>
								<TableCell>Categoria</TableCell>
								<TableCell align="right">Dia</TableCell>
								<TableCell align="right">Valor</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{despesas.map((desp: IDespesas) => (
								<TableRow key={desp.id}>
									<TableCell component="th" scope="ano">
										{desp.descricao}
									</TableCell>
									<TableCell>{desp.categoria}</TableCell>
									<TableCell align="right">{desp.dia}</TableCell>
									<TableCell align="right">
										{formatCurrency(desp.valor)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
