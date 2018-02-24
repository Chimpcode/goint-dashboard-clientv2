import gql from 'graphql-tag'

const allSectorsQuery = gql`
query ($companyid: ID) {
  allSectors (
    filter: {
      createdBy: {
        id: $companyid
      }
    }
  ) {
    id
    name
    stores {
      name
    }
  }
}`

const addNewSectorMut = gql`
mutation ($name: String!, $stores: [ID!], $byid: ID!) {
    createSector (
        name: $name,
        storesIds: $stores,
        createdById: $byid
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
