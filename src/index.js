import Fontmin from "fontmin";
import deasync from "deasync";
import trans from "./trans";

function isChinese(s) {
  return /[\u4e00-\u9fa5]/.test(s);
}
let asyncfnSync = deasync(asyncfn);
let str = new Set();
let fontSrc = "";
let destSrc = "";

function asyncfn(callback) {
  if (str.size && fontSrc && destSrc) {
    const text = [...str].join("");
    const fontmin = new Fontmin()
      .src(fontSrc)
      .dest(destSrc)
      .use(
        Fontmin.glyph({
          text,
        })
      )
      .use(Fontmin.ttf2woff({}));
    fontmin.run((err) => {
      if (err) {
        throw err;
      }
      callback();
      console.log("font minify done!");
    });
  } else {
    callback();
    console.log("font minify params error!");
  }
}

export default function () {
  return {
    visitor: {
      Program: {
        enter(path, state) {},
        exit(path, state) {
          fontSrc = state.opts.fontSrc;
          destSrc = state.opts.destSrc;
          asyncfnSync();
        },
      },
      StringLiteral(path) {
        str = new Set([...str, ...path.node.value]);
        if (isChinese(path.node.value)) {
          path.node.value = trans(path.node.value);
        }
      },
    },
  };
}
