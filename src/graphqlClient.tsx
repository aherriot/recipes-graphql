import { createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import type { Variables, ResolveInfo } from '@urql/exchange-graphcache'

export default createClient({
  url: '/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      optimistic: {
        likeRecipe: (
          variables: Variables,
          cache: Cache,
          info: ResolveInfo
        ): null => {
          console.log(variables)
          return null
          // return variables
        },
      },
    }),
    fetchExchange,
  ],
})
