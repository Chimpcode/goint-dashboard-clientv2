import gql from 'graphql-tag'

const allSectorsQuery = gql`
query allSectorsQuery ($companyid: ID) {
  allSectors: allSectors (
    filter: {
      createdBy: {
        id: $companyid
      }
    }
  ) {
    id
    name
    stores {
      id
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
          id
          name
        }
    }
}
`

const updateSectorMut = gql`
mutation ($id: ID!, $name: String!, $stores: [ID!]) {
    updateSector (
        id: $id,
        name: $name,
        storesIds: $stores
    ) {
        id
        name
        stores {
          id
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
          id
          name
        }
    }
}
`

export {allSectorsQuery, addNewSectorMut, updateSectorMut, deleteSectorMut}
