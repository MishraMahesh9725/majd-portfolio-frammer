const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const notes = [];
  page.on("pageerror", (error) => notes.push("pageerror " + error.message));
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(300);
  const menu = await page.getByRole("link", { name: "Services" }).count();
  notes.push("menu links " + menu);
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Works" }).click();
  await page.waitForURL("**/work**");
  notes.push("work " + page.url());
  await page.goto("http://localhost:5173/work/damas");
  notes.push("damas h1 " + (await page.locator("h1").innerText()));
  await page.goto("http://localhost:5173/blog/how-can-designers-prepare-for-the-future");
  notes.push("post h1 " + (await page.locator("h1").innerText()));
  await page.goto("http://localhost:5173/#contact");
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Submit" }).click();
  notes.push("errors visible " + (await page.getByText("Enter your name.").count()));
  await page.getByPlaceholder("Enter your name").fill("Monil");
  await page.getByPlaceholder("Enter your email").fill("monil@example.com");
  await page.getByPlaceholder("Tell us about your project").fill("A portfolio clone.");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Sending" }).waitFor({ state: "visible", timeout: 2000 }).catch(() => notes.push("no sending state"));
  await page.getByRole("status").waitFor({ timeout: 3000 });
  notes.push("success " + (await page.getByRole("status").innerText()));
  console.log(notes.join("\n"));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
