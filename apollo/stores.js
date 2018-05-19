import gql from 'graphql-tag'

const allStoresQuery = gql`
query allStoresQuery ($companyid: ID) {
    allStores (
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
        }
    }
}
`
export {allStoresQuery, addNewStoreMut, deleteStoreMut}
