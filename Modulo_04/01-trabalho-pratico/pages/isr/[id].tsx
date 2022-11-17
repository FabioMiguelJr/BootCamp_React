import Image from "next/image";

export async function getStaticPaths() {
	const coins = await fetch(
		// "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=20&page=1&sparkline=false"
		"https://fakestoreapi.com/products"
	).then((res) => res.json());

	const paths = coins.map((item: any) => ({
		params: {
			id: item.id.toString(),
			image: item.image,
			title: item.title,
			description: item.description,
			price: item.price,
			category: item.category,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: any }) {
	const coins = await fetch(`https://fakestoreapi.com/products/${params.id}`).then((res) =>
		res.json()
	);

	const date = new Date();
	return { props: { coins }, revalidate: 50 };
}

const StaticPaths = (props: any) => {
	const coin = props.coins;
	// const { thumb, small, large } = coin.image;

	return (
		<div className="flex-container-c">
			<div className="card flex-item-1">
				<p className="p-text p-font">{coin.title}</p>
				<p>
					<Image src={coin.image} alt="Imagem" width={250} height={250} />
				</p>
			</div>
			<div className="card card-descr flex-item-3">
				<p className="p-font-xl">
					<b>Category:</b> {coin.category}
				</p>
				<p className="description p-font">
					<b>Description:</b> {coin.description}
				</p>
				<p className="p-font-xxl">
					<b>Price:</b>{" "}
					{coin.price.toLocaleString("pt-BR", {
						minimumFractionDigits: 2,
						style: "currency",
						currency: "BRL",
					})}
				</p>
			</div>
		</div>
	);
};

export default StaticPaths;
