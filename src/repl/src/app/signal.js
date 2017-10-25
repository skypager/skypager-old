/* eslint-disable */
if (module.hot) {
  function checkForUpdate(fromUpdate) {
    module.hot.check(function(err, updatedModules) {
      if (err) {
        if (module.hot.status() in {
            abort: 1,
            fail: 1
          }) {
          console.debug("[HMR] Cannot apply update.");
          console.debug("[HMR] " + err.stack || err.message);
          console.debug("[HMR] You need to restart the application!");
        } else {
          console.debug("[HMR] Update failed: " + err.stack || err.message);
        }
        return;
      }
      if (!updatedModules) {
        return;
      }

      module.hot.apply({
        ignoreUnaccepted: true
      }, function(err, renewedModules) {
        if (err) {
          if (module.hot.status() in {
              abort: 1,
              fail: 1
            }) {
            console.debug("[HMR] Cannot apply update (Need to do a full reload!)");
            console.debug("[HMR] " + err.stack || err.message);
            console.debug("[HMR] You need to restart the application!");
          } else {
            console.debug("[HMR] Update failed: " + err.stack || err.message);
          }
          return;
        }

        checkForUpdate(true);
      });
    });
  }

  process.on("SIGUSR2", function() {
    console.debug('GOT SIG')
    if (module.hot.status() !== "idle") {
      console.debug("[HMR] Got signal but currently in " + module.hot.status() + " state.");
      console.debug("[HMR] Need to be in idle state to start hot update.");
      return;
    }

    checkForUpdate();
  });
} else {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}
