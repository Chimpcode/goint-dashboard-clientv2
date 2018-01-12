import gql from 'graphql-tag'

const allStoresQuery = gql`
      {
        allStores {
          id
          name
          description
          locations {
            address
          }
        }
      }
      `

export {allStoresQuery}
