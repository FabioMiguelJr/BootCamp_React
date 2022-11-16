export async function getStaticProps() {
	const coins = await fetch("https://api.coingecko.com/api/v3/coins/list?limit=20").then((res) =>
		res.json()
	);

	// const res = await fetch("https://.../version");
	// const versionObject = await res.json();

	return { props: { coins, propTest: "This is a test" } };
}

const StaticWithDeps = ({ coins, propTest }: { coins: any[]; propTest: string }) => {
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

export default StaticWithDeps;
