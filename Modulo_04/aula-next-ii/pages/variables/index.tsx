export async function getServerSideProps() {
	console.log(process.env.PROFESSOR);
	console.log(process.env.NEXT_PUBLIC_TEST);
	return { props: {} };
}
const Variables = () => {
	console.log(process.env.PROFESSOR);
	console.log(process.env.NEXT_PUBLIC_TEST);
	return <div>Variables</div>;
};

export default Variables;
