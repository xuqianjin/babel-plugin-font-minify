import path from "path";
import fs from "fs";
import assert from "assert";
import { transformFileSync } from "babel-core";

function trim(str) {
  return eval("'" + str.replace(/^\s+|\s+$/, "") + "'");
}

describe("", () => {
  const fixturesDir = path.join(__dirname, "fixtures");
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split("-").join(" ")}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actualPath = path.join(fixtureDir, "actual.js");
      const actual = transformFileSync(actualPath).code;
    });
  });
});
