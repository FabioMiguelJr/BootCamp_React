import Image from "next/image";
import { useEffect, useState } from "react";

const ImagesExample = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=100&page=1&sparkline=false"
		)
			.then((res) => res.json())
			.then(setData);
	}, []);
	return (
		<ul>
			{data.map((item: any) => (
				<li key={item.id}>
					{/* <img src={item.image} height={250} width={250} alt="Imagem" /> */}
					<Image src={item.image} width={250} height={250} alt="Imagem" />
				</li>
			))}
		</ul>
	);
};

export default ImagesExample;
