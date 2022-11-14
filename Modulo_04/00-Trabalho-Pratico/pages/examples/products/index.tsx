import Link from "next/link";

const Products = () => {
	const products = [
		{ id: 1, name: "Product 1" },
		{ id: 2, name: "Product 2" },
		{ id: 3, name: "Product 3" },
		{ id: 4, name: "Product 4" },
		{ id: 5, name: "Product 5" },
		{ id: 6, name: "Product 6" },
	];
	return (
		<ul>
			{products.map((item) => (
				<li key={item.id}>
					<Link href={`products/${item.id}`} passHref legacyBehavior>
						<a>{item.name}</a>
					</Link>
				</li>
			))}
			{/* <Link href="exemples/products/">
			</Link> */}
		</ul>
	);
};

export default Products;
