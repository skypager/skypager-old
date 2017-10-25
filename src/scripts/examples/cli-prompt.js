print('Hello!')

runtime.cli.ask({ name: { description: 'What is your name?' } }).then(responses => {
  console.log('Responses', responses)
})
