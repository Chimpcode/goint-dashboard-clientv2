import gql from 'graphql-tag'

const allPostsQuery = gql`{
    allPosts {
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

export {allPostsQuery}
