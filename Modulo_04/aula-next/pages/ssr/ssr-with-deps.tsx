export async function getServerSideProps() {
	const coins = await fetch(
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false"
	).then((res) => res.json());

	return { props: coins };
}

const SsrWithDeps = (coins: any[]) => {
	return (
		<ul>
			{coins.map((item: any) => (
				<li key={item.id}>
					<a>{item.name}</a>
				</li>
			))}
		</ul>
	);
};

export default SsrWithDeps;
