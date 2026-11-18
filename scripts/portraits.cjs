const data = JSON.parse(require("fs").readFileSync("reference/data/home-1440.json", "utf8"));
for (const image of data.images) {
  if ((image.alt || "").toLowerCase().includes("portrait") || (image.src || "").includes("haSj")) {
    console.log("---");
    console.log(image.alt);
    console.log("src", image.src);
    console.log("srcset", (image.srcset || "").slice(0, 500));
    console.log("rect", JSON.stringify(image.rect));
    console.log("styles", JSON.stringify(image.styles));
  }
}
