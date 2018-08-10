import { report } from "../src/index";

describe("css-modules-janitor package", () => {
    it("exports a function", () => {
        expect(report).toEqual(expect.any(Function));
        expect(report).not.toThrow();
    });
});
