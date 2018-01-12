import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const httpLink = new HttpLink({ uri: 'http://13.90.253.208:60000/simple/v1/cjb5vhjxf002q01897ggfz3b3' })

  // auth token
  let token = process.server ? ctx.req.session : window.__NUXT__.state.session

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { authorization: `Bearer ${token}` }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
