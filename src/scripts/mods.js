async function s(k) {
  const data = await select("modules/maintainers")
  console.log(data)
}

s()
