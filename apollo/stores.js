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
        wifi
        storeType
        location {
            id
            address
        }
    }
}
`

// businessHours: $businessHours,
const addNewStoreMut = gql`
mutation ($name: String!, $description: String!, $location: ID!, $byid: ID!, $wifi: Boolean, $storeType: Boolean) {
    createStore (
        name: $name,
        description: $description,
        locationId: $location,
        createdById: $byid
        wifi: $wifi,
        storeType: $storeType
    ) {
        id
        name
        businessHours
        description
        location {
            id
            address
        }
    }
}
`

// businessHours: $businessHours,
const updateStoreMut = gql`
mutation ($id: ID!, $name: String!, $description: String!, $location: ID!, $wifi: Boolean, $storeType: Boolean) {
    updateStore (
        id: $id,
        name: $name,
        description: $description,
        locationId: $location,
        wifi: $wifi,
        storeType: $storeType
    ) {
        id
        name
        description
        businessHours
        location {
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
        location {
            address
            id
        }
    }
}
`
export {allStoresQuery, addNewStoreMut, updateStoreMut, deleteStoreMut}
