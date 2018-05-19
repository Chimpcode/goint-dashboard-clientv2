import gql from 'graphql-tag'

const allCategoriesQuery = gql`
query allCategoriesQuery {
    categories: allCompanyCategories{
        id
        name
        tags
        createdAt
        alias
    }
}
`

export {allCategoriesQuery}
