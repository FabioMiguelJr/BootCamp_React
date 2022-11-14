import Link from "next/link";

export async function getStaticProps() {
	const products = await fetch("https://fakestoreapi.com/products").then((res) => res.json());

	const date = new Date();
	// return { props: { coins, propTest: "This is a test" } };
	return { props: { products, lastRenderer: date.getSeconds() } };
}

const Isr = (props?: any) => {
	const products = props.products;

	return (
		<div>
			<div>{props.lastRenderer}</div>
			<ul>
				{products.map((item: any) => (
					<li key={item.id}>
						<Link href={`isr/${item.id}`} passHref legacyBehavior>
							<a>{item.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Isr;
