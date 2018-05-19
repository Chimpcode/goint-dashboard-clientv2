import gql from 'graphql-tag'

const allLocationsQuery = gql`
  query allLocationsQuery ($companyid: ID) {
    allLocations (filter: {
      createdBy: {
        id: $companyid
      }
    }) {
      id
      address
      latitude
      longitude
    }
  }
`

const addNewLocationMut = gql`
  mutation ($address: String!, $lng: Float!, $lat: Float!, $byid: ID!) {
    createLocation (
      address: $address,
      longitude: $lng,
      latitude: $lat,
      createdById: $byid
    ) {
      id
      address
      latitude
      longitude
    }
  }
`

const deleteLocationMut = gql`
  mutation ($id: ID!) {
    deleteLocation (
      id: $id,
    ) {
      id
      address
      latitude
      longitude
    }
  }
`

const editLocationMut = gql`
  mutation (
    $id: ID!
    $address: String,
    $lng: Float,
    $lat: Float
  ) {
    updateLocation (
      id: $id,
      address: $address,
      lng: $lng,
      lat: $lat
    ){
      id
      address
      latitude
      longitude
    }
  }
`
export {allLocationsQuery, addNewLocationMut, deleteLocationMut, editLocationMut}
