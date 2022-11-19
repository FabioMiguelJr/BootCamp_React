import { useEffect, useState } from "react";

const CoinsList = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false"
		)
			.then((resp) => resp.json())
			.then(setData);
	}, []);

	return (
		<div>
			<div>
				<label>
					Filter
					<input />
				</label>
			</div>
			{data.map((item: any) => (
				<div key={item.id}>{item.id}</div>
			))}
		</div>
	);
};

export default CoinsList;
