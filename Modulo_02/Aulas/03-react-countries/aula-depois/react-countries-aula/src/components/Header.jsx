export default function Header({ children, size }) {
	let fontSize = "text-xl";
	if (size === "large") {
		fontSize = "text-2xl";
	}
	return (
		<div>
			<header>
				<div className="bg-blue-300 mx-auto p-3">
					<h1 className={`text-center font-semibold ${fontSize}`}>{children}</h1>
				</div>
			</header>
		</div>
	);
}
