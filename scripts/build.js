/* eslint-disable no-console */
(async () => {
  try {
    const { execa } = await import("execa");
    await execa(
      "vue-cli-service build --target lib --name reader build/reader.js",
      { stdio: "inherit" }
    );
    console.log("build reader done");
    await execa(
      "vue-cli-service build --target lib --no-clean --name event-bus build/event-bus.js",
      { stdio: "inherit" }
    );
    console.log("build event-bus done");
    await execa(
      "vue-cli-service build --target lib --no-clean --name model build/model.js",
      { stdio: "inherit" }
    );
    console.log("build model done");
    await execa(
      "vue-cli-service build --target lib --no-clean --name mixin build/mixin.js",
      { stdio: "inherit" }
    );
    console.log("build mixin done");
    await execa(
      "vue-cli-service build --target lib --no-clean --name store build/store.js",
      { stdio: "inherit" }
    );
    console.log("build store done");
    await execa(
      "vue-cli-service build --target lib --no-clean --name helper build/helper.js",
      { stdio: "inherit" }
    );
    console.log("build helper done");
    await execa(
      "vue-cli-service build --target lib --no-clean --name map build/app.js",
      { stdio: "inherit" }
    );
    console.log("build map done");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
