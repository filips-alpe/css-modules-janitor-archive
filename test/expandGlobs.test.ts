jest.mock("glob", () =>
    jest.fn().mockImplementation((pattern, options, cb) =>
        cb(null, `some/path/${pattern}`),
    ),
);

import * as _glob from "glob";
import { expandGlobs } from "../src/expandGlobs";

const glob = _glob as any as typeof _glob & jest.Mock;

describe("expandGlobs", () => {
    it("can expand a single glob pattern", async () => {
        const result = await expandGlobs("foo");

        expect(result).toEqual(["some/path/foo"]);
        expect(glob).toHaveBeenCalledWith("foo", {}, expect.any(Function));
        glob.mockClear();
    });

    it("can expand multiple glob patterns", async () => {
        const result = await expandGlobs(["foo", "bar"]);

        expect(result).toEqual(["some/path/foo", "some/path/bar"]);
        expect(glob).toHaveBeenCalledTimes(2);
        expect(glob).toHaveBeenCalledWith("foo", {}, expect.any(Function));
        expect(glob).toHaveBeenCalledWith("bar", {}, expect.any(Function));
        glob.mockClear();
    });

    it("accepts additional glob options", async () => {
        const result = await expandGlobs("foo", { ignore: "**/*.md" });

        expect(result).toEqual(["some/path/foo"]);
        expect(glob).toHaveBeenCalledWith("foo", { ignore: "**/*.md" }, expect.any(Function));
        glob.mockClear();
    });

    it("filters out duplicate results", async () => {
        const result = await expandGlobs(["foo", "bar", "foo", "bar"]);

        expect(result).toEqual(["some/path/foo", "some/path/bar"]);
        glob.mockClear();
    });
});
