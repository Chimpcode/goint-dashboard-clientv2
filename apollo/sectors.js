import gql from 'graphql-tag'

const allSectorsQuery = gql`{
  allSectors {
    id
    name
    stores {
      name
    }
  }
}`

export {allSectorsQuery}
