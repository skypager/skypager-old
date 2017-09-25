import { mixinPropertyUtils } from "runtime/utils/properties"

module.exports = function(chain, api = {}) {
  return chain.invoke("select", "entity", api).thru(result => mixinPropertyUtils(result, true, true))
}
