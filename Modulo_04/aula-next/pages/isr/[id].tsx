import Image from "next/image";

export async function getStaticPaths() {
	const products = await fetch("https://fakestoreapi.com/products").then((res) => res.json());

	const paths = products.map((item: any) => ({
		params: {
			id: item.id.toString(),
			title: item.title,
			price: item.price,
			category: item.category,
			description: item.description,
			image: item.image,
		},
	}));
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: any }) {
	const product = await fetch(`https://fakestoreapi.com/products/${params.id}`).then((res) =>
		res.json()
	);

	const date = new Date();
	return { props: { product, lastRenderer: date.getSeconds() } };
}

const StaticPaths = (props: any) => {
	const product = props.product;

	return (
		<div>
			<div className="container justify-content-center" id="container-home">
				<div>
					<div>
						<p>{product.title}</p>
					</div>
					<div>
						<Image src={product.image} alt={product.title} width={300} height={300} />{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StaticPaths;
