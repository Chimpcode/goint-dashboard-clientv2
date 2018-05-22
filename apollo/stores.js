import gql from 'graphql-tag'

const allStoresQuery = gql`
query allStoresQuery ($companyid: ID) {
    allStores: allStores (
      filter: {
        createdBy: {
          id: $companyid
        }
      }
    ) {
        id
        name
        description
        locations {
            id
            address
        }
    }
}
`

const addNewStoreMut = gql`
mutation ($name: String!, $description: String!, $locations: [ID!], $byid: ID!) {
    createStore (
        name: $name,
        description: $description,
        locationsIds: $locations,
        createdById: $byid
    ) {
        id
        name
        description
        locations {
            id
            address
        }
    }
}
`

const updateStoreMut = gql`
mutation ($id: ID!, $name: String!, $description: String!, $locations: [ID!]) {
    updateStore (
        id: $id,
        name: $name,
        description: $description,
        locationsIds: $locations
    ) {
        id
        name
        description
        locations {
            id
            address
        }
    }
}
`

const deleteStoreMut = gql`
mutation ($id: ID!) {
    deleteStore (
        id: $id,
    ) {
        id
        name
        description
        locations {
            address
            id
        }
    }
}
`
export {allStoresQuery, addNewStoreMut, updateStoreMut, deleteStoreMut}
