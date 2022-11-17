import Head from "next/head";
export default function IndexPage() {
	return (
		<div>
			{/* Override aqui! */}
			<Head>
				{" "}
				Override aqui!
				<link
					href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
					rel="stylesheet"
				/>
			</Head>
			<p>Hello world!</p>
		</div>
	);
}
