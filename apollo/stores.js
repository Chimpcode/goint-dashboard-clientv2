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

const addNewStoreMut = gql`
mutation ($name: String!, $description: String!, $locations: [ID!]) {
    createStore (
        name: $name,
        description: $description,
        locationsIds: $locations
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
