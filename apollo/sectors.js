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

const addNewSectorMut = gql`
mutation ($name: String!, $stores: [ID!]) {
    createSector (
        name: $name,
        storesIds: $stores
    ) {
        id
        name
        stores {
          name
        }
    }
}
`

const deleteSectorMut = gql`
mutation ($id: ID!) {
    deleteSector (
        id: $id,
    ) {
        id
        name
        stores {
          name
        }
    }
}
`

export {allSectorsQuery, addNewSectorMut, deleteSectorMut}
