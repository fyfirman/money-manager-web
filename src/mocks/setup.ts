if (typeof window === "undefined") {
  // disabled because not work
  // const { server } = require("./server");
  // server.listen();
} else {
  const { worker } = require("./browser");
  worker.start();
}

export {};
