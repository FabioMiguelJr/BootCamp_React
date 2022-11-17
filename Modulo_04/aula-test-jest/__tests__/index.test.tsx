import Home from "@/pages/index";

const sum = (a: number, b: number) => {
	return a + b;
};

describe("Simple operations", () => {
	beforeEach(() => {});

	afterEach(() => {});

	beforeAll(() => {});

	afterAll(() => {});

	test("dois mais dois é quatro", () => {
		expect(sum(2, 2)).toBe(4);
	});
});
