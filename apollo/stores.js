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
        isVirtual
        businessHours
        location {
            id
            address
        }
    }
}
`

// businessHours: $businessHours,
const addNewStoreMut = gql`
mutation ($name: String!, $description: String!, $location: ID!, $byid: ID!, $wifi: Boolean, $isVirtual: Boolean, $businessHours: String!) {
    createStore (
        name: $name,
        description: $description,
        locationId: $location,
        createdById: $byid
        wifi: $wifi,
        isVirtual: $isVirtual,
        businessHours: $businessHours
    ) {
        id
        name
        wifi
        isVirtual
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
mutation ($id: ID!, $name: String!, $description: String!, $location: ID!, $wifi: Boolean, $isVirtual: Boolean, $businessHours: String!) {
    updateStore (
        id: $id,
        name: $name,
        description: $description,
        businessHours: $businessHours,
        locationId: $location,
        wifi: $wifi,
        isVirtual: $isVirtual
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
