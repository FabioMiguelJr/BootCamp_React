import Home from "@/pages/index";

// Praticando Jest

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

// Praticando TDD

const captalizeWord = (word: string) => {
	const firstLetter = word[0].toUpperCase();
	const otherLetters = word.substring(1);
	return `${firstLetter}${otherLetters}`;
};

const captalize = (text: string) => {
	if (text.length === 0) {
		return "";
	}

	// const words = text.split(" ");
	// return words.map((word) => captalizeWord(word)).join(" ");

	return text.split(" ").map(captalizeWord).join(" ");
};

describe("Sanity of formater", () => {
	test("Should do nothing for empty entry", () => {
		expect(captalize("")).toBe("");
	});

	test("Should returno Rodrigo for Rodrigo", () => {
		expect(captalize("rodrigo")).toBe("Rodrigo");
	});

	test("Should returno Rodrigo for Rodrigo", () => {
		expect(captalize("rodrigo borba")).toBe("Rodrigo Borba");
	});
});
