# Lazy load features

Right now every feature is enabled every time the node runtime is used.  We should move this functionality into the `prepare` step of the commands that need them.
