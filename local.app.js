async function main() {
  console.log('YO YO')
  await skypager.windowManager.createForScript(`http://localhost:5000/app.js`)
  console.log('HI')
}

main()
