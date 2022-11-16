import Link from "next/link";
import React from "react";

export async function getStaticProps() {
	const products = await fetch("https://fakestoreapi.com/products?limit=10").then((res) =>
		res.json()
	);

	const date = new Date();
	// return { props: { coins, propTest: "This is a test" } };
	return { props: { products, lastRenderer: date.getSeconds() } };
}

const Isr = (props?: any) => {
	const products = props.products;

	return (
		<>
			<header>
				<div className="bg-pink-200 mx-auto p-4">
					<h1 className="text-center font-semibold text-2xl">Plataforma On-line</h1>
				</div>
			</header>
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
		</>
	);
};

export default Isr;
