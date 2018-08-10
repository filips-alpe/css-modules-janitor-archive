import * as glob from "glob";
import * as util from "util";

function uniq(arr: string[]) {
    return arr.filter((val, index, self) => self.indexOf(val) === index);
}

export async function expandGlobs(patterns: string | string[], globOptions: glob.IOptions = {}) {
    const patternList = typeof patterns === "string" ? [patterns] : patterns;

    let fileList: string[] = [];
    for (const pattern of patternList) {
        fileList = fileList.concat(await util.promisify(glob)(pattern, globOptions));
    }

    return uniq(fileList);
}
