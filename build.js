// Very basic, handwritten build script.

const fs = require("fs");

const minifyHTML = require("html-minifier").minify;
const CleanCSS = require("clean-css");

// Clean ./dist directory

if (fs.existsSync("./dist")) {
  console.log("Cleaning ./dist directory");
  fs.rmSync("./dist", { force: true, recursive: true });
}
fs.mkdirSync("./dist");
fs.mkdirSync("./dist/assets");
fs.mkdirSync("./dist/assets/css");
fs.mkdirSync("./dist/assets/img");

// Minify index.html

console.log("Minifying index.html...");

const index = fs.readFileSync("./src/index.html").toLocaleString();
const minifiedIndex = minifyHTML(index, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeTagWhitespace: true,
});

fs.writeFileSync("./dist/index.html", minifiedIndex);
console.log("Minified index.html");

// Minify CSS

console.log("Minifying assets/css/styles.css...");

const styles = fs.readFileSync("./src/assets/css/styles.css").toLocaleString();
const minifiedStyles = new CleanCSS().minify(styles);

fs.writeFileSync("./dist/assets/css/styles.css", minifiedStyles.styles);

console.log("Minified assets/css/styles.css");

// Move images

console.log("Copying images");

const images = fs.readdirSync("./src/assets/img");

Promise.all(
  images.map((img) =>
    fs.promises.copyFile(`./src/assets/img/${img}`, `./dist/assets/img/${img}`)
  )
).then(() => {
  console.log("Copied images");
});
