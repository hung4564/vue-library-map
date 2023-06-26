/* eslint-disable no-console */
(async () => {
  try {
    const { execa } = await import("execa");
    await execa(
      "vue-cli-service",
      ["build", "--target", "lib", "--name", "map", "build/app.js"],
      { stdio: "inherit" }
    );
    console.log("build map done");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
