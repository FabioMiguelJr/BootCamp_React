import Link from "next/link";

export async function getStaticProps() {
	const coins = await fetch(
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false"
	).then((res) => res.json());

	const date = new Date();
	// return { props: { coins, propTest: "This is a test" } };
	return { props: { coins, lastRenderer: date.getSeconds() }, revalidate: 5 };
}

const Isr = (props: any) => {
	const coins = props.coins;

	return (
		<div>
			<div>{props.lastRenderer}</div>
			<ul>
				{coins.map((item: any) => (
					<li key={item.id}>
						<Link href={`isr/${item.id}`} passHref legacyBehavior>
							<a>{item.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Isr;
