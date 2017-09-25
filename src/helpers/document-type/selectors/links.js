module.exports = function(chain, options = {}) {
  return chain.invoke("createHeadingsMap", "accessorMethod").mapValues(heading => heading.selectChildren("link"))
}
