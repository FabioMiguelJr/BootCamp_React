export async function getStaticPaths() {
	const products = await fetch("https://fakestoreapi.com/products").then((res) => res.json());

	console.log(products);

	const paths = products.map((item: any) => ({
		params: {
			id: item.id,
			title: item.title,
			price: item.price,
			category: item.category,
			description: item.description,
			image: item.image,
		},
	}));
	console.log(paths);
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: any }) {
	const id: string = params.id;
	const product = await fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
		res.json()
	);

	const date = new Date();
	return { props: { product, lastRenderer: date.getSeconds() } };
}

const StaticPaths = (props: any) => {
	const product = props.product;

	return (
		<div>
			<div>{props.lastRenderer}</div>
			<span>{product.title}</span>
		</div>
	);
};

export default StaticPaths;
