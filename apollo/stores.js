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
        location {
            id
            address
        }
    }
}
`

const addNewStoreMut = gql`
mutation ($name: String!, $description: String!, $location: ID!, $byid: ID!, $businessHours: String!, $wifi: Boolean, $storeType: Boolean) {
    createStore (
        name: $name,
        description: $description,
        businessHours: $businessHours,
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

const updateStoreMut = gql`
mutation ($id: ID!, $name: String!, $description: String!, $location: ID!, $businessHours: String!, $wifi: Boolean, $storeType: Boolean) {
    updateStore (
        id: $id,
        name: $name,
        businessHours: $businessHours,
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
