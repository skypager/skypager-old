export default function babel(cfg) {
  return cfg
    .loader("json", [".json"], { loader: "json" })
    .loader("babel", [".js"], { loader: "babel", exclude: [/node_modules/] })
}
