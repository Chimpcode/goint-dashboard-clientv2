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
        additionalConditions
        
        stock
        expireAt
        isActive
        tags
        locationByStores{
          id, name
        }
        locationBySectors{
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
  $locationByStoresIds: [ID!], 
  $locationBySectorsIds: [ID!], $byid: ID, $image: String
  $expireAt: DateTime, $description: String, $additionalConditions: String, $isActive: Boolean
  $maxAge: Int, $minAge: Int, $upperHour: String, $lowerHour: String, $gender: String, $availableDays: String
) {
    createPost (
      title: $title, tags: $tags,
      stock: $stock,
      locationBySectorsIds: $locationBySectorsIds,
      locationByStoresIds: $locationByStoresIds,
      byId: $byid, expireAt: $expireAt, description: $description, additionalConditions: $additionalConditions
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
        additionalConditions
        description
        stock
        expireAt
        isActive
    }
}
`

const updatePostMut = gql`
mutation ($id: ID!, $title: String, $tags: String!, $stock: Int, 
  $locationByStoresIds: [ID!], $locationBySectorsIds: [ID!], $byid: ID, $image: String
  $expireAt: DateTime, $description: String, $additionalConditions: String, $isActive: Boolean
  $maxAge: Int, $minAge: Int, $upperHour: String, $lowerHour: String, $gender: String, $availableDays: String
) {
    updatePost (
      id: $id
      title: $title, tags: $tags,
      stock: $stock,
      locationByStoresIds: $locationByStoresIds,
      locationBySectorsIds: $locationBySectorsIds,
      byId: $byid, expireAt: $expireAt, description: $description, additionalConditions: $additionalConditions,
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
        additionalConditions
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

const deletePostMut = gql`
mutation ($id: ID!) {
    deletePost (
      id: $id,
    ) {
        id
    }
}
`

export {allPostsQuery, addNewPostMut, toggleActivationPostMut, updatePostMut, deletePostMut}
