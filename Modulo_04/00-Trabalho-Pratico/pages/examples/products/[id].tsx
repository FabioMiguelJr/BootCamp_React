import { useRouter } from "next/router";

const Product = () => {
	const router = useRouter();
	const { id } = router.query;
	return <div>Rendering informations about product id: {id}</div>;
};

export default Product;
