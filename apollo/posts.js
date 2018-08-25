import gql from 'graphql-tag'

const allPostsQuery = gql`
query allPostsQuery ($companyid: ID) {
    promociones: allPosts (
      filter: {
        by: {
          id: $companyid
        }
      }
    ) {
        id
        title 
        image
        createdAt
        description
        stock
        expireAt
        isActive
        tags
        locationByStores{
          id, name
        }
        targetPublic {
          availableDays,
          createdAt
          gender
          id
          lowerHour
          maxAge
          minAge
          updatedAt
          upperHour
        }
    }
}
`

const addNewPostMut = gql`
mutation ($title: String, $tags: String!, $stock: Int, 
  $locationBySectorsIds: [ID!], $byid: ID, $image: String
  $expireAt: DateTime, $description: String, $isActive: Boolean
  $maxAge: Int, $minAge: Int, $upperHour: String, $lowerHour: String, $gender: String, $availableDays: String
) {
    createPost (
      title: $title, tags: $tags,
      stock: $stock, locationBySectorsIds: $locationBySectorsIds,
      byId: $byid, expireAt: $expireAt, description: $description,
      isActive: $isActive,
      image: $image
      targetPublic: {
        availableDays: $availableDays
        gender: $gender
        lowerHour: $lowerHour
        upperHour: $upperHour
        maxAge: $maxAge
        minAge: $minAge
      }
    ) {
        id
        title
        createdAt
        description
        stock
        expireAt
        isActive
    }
}
`

const updatePostMut = gql`
mutation ($id: ID!, $title: String, $tags: String!, $stock: Int, 
  $locationByStoresIds: [ID!], $byid: ID, $image: String
  $expireAt: DateTime, $description: String, $isActive: Boolean
  $maxAge: Int, $minAge: Int, $upperHour: String, $lowerHour: String, $gender: String, $availableDays: String
) {
    updatePost (
      id: $id
      title: $title, tags: $tags,
      stock: $stock, locationByStoresIds: $locationByStoresIds,
      byId: $byid, expireAt: $expireAt, description: $description,
      isActive: $isActive,
      image: $image,
      targetPublic: {
        availableDays: $availableDays
        gender: $gender
        lowerHour: $lowerHour
        upperHour: $upperHour
        maxAge: $maxAge
        minAge: $minAge
      }
    ) {
        id
        title
        createdAt
        description
        stock
        expireAt
        isActive
    }
}
`

const toggleActivationPostMut = gql`
mutation ($id: ID!, $isActive: Boolean) {
    updatePost (
      id: $id,
      isActive: $isActive
    ) {
        id
        isActive
    }
}
`

export {allPostsQuery, addNewPostMut, toggleActivationPostMut, updatePostMut}
