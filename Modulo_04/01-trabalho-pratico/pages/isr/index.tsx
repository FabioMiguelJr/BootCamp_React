import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
	const coins = await fetch(
		// "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=20&page=1&sparkline=false"
		"https://fakestoreapi.com/products"
	).then((res) => res.json());

	const date = new Date();
	// return { props: { coins, propTest: "This is a test" } };
	return { props: { coins, lastRenderer: date.getSeconds() }, revalidate: 50 };
}

const Isr = (props: any) => {
	const coins = props.coins;

	return (
		<>
			{/* <header>Mercatus Fashion</header> */}
			<div className="header">
				<div className="sides">
					<a href="https://blogdofabiomiguel.blogspot.com" className="logo">
						BLOG
					</a>
				</div>
				<div className="sides">
					{" "}
					<a href="#" className="menu">
						{" "}
					</a>
				</div>
				<div className="info">
					<h4>
						<a href="https://codepen.io/nodws/pen/aWgMMQ">UI DESIGN</a>
					</h4>
					<h1>Tatifashion Modas & Brechós</h1>
					<div className="meta">
						<a
							href="https://twitter.com/FabioMigueljr"
							target="_b"
							className="author"
						></a>
						<br />
						By{" "}
						<a href="https://twitter.com/FabioMigueljr" target="_b">
							Fábio Miguel
						</a>{" "}
						on Nov 16, 2022
					</div>
				</div>
			</div>
			<div className="container">
				<div className="flex-container">
					{coins.map((item: any) => (
						<div className="card" key={item.id}>
							<p>
								<Image
									src={item.image}
									alt={"Imagem"}
									width={250}
									height={250}
									priority
								/>
							</p>
							<p className="p-text p-link p-font">
								<Link href={`isr/${item.id}`} passHref legacyBehavior>
									<a>{item.title}</a>
								</Link>
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Isr;
