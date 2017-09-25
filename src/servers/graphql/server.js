import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import bodyParser from "body-parser"
import exampleSchema from "./example/schema"

export function appWillMount(app) {
  const schema = this.tryResult("schema", () => exampleSchema)

  app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }))
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))

  return app
}
