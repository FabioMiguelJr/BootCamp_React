import { fireEvent, render, screen } from "@testing-library/react";
import CoinsList from "../pages/coinslist/CoinsList";

const setFetchReturnData = (data) => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve([{ id: "bitcoin" }]),
		})
	);
};

describe("General CoinsList test", () => {
	beforeAll(() => {
		setFetchReturnData([{ id: "bitcoin" }, { id: "ethereum" }]);
	});

	test("it should render", () => {
		render(<CoinsList />);
	});

	test("it should render API Data", async () => {
		render(<CoinsList />);
		await screen.findByText("bitcoin");
	});

	test("it should filter correctly", async () => {
		render(<CoinsList />);

		await screen.findByText("bitcoin");
		await screen.findByText("ethereum");

		const filter = screen.getByLabelText(/Filter/i);
		fireEvent.change(filter, { target: { value: "bitcoin" } });
		screen.getByText("bitcoin");
		screen.getByText("ethereumm");
	});
});
