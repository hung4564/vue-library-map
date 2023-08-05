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
    await execa(
      "vue-cli-service",
      [
        "build",
        "--no-clean",
        "--target",
        "lib",
        "--name",
        "helper",
        "build/helper.js"
      ],
      { stdio: "inherit" }
    );
    console.log("build helper done");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
