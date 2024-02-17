/* eslint-disable no-console */
(async () => {
  try {
    const { execa } = await import("execa");
    await execa(
      "vue-cli-service",
      ["build", "--target", "lib", "--name", "map", "build/app.js"],
      { stdio: "inherit" }
    );
    console.info("build map done");
    // await execa(
    //   "vue-cli-service",
    //   [
    //     "build",
    //     "--no-clean",
    //     "--target",
    //     "lib",
    //     "--name",
    //     "helper",
    //     "build/helper.js"
    //   ],
    //   { stdio: "inherit" }
    // );
    // console.info("build helper done");
    // await execa(
    //   "vue-cli-service",
    //   [
    //     "build",
    //     "--no-clean",
    //     "--target",
    //     "lib",
    //     "--name",
    //     "model",
    //     "build/model.js"
    //   ],
    //   { stdio: "inherit" }
    // );
    // console.info("build model done");
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
