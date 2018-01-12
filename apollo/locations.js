import gql from 'graphql-tag'

const allLocationsQuery = gql`{
        allLocations{
          id
          address
          latitude
          longitude
        }
      }`

export {allLocationsQuery}
