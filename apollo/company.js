import gql from 'graphql-tag'

const companyQuery = gql`
query companyQuery ($companyid: ID) {
    company: Company (id: $companyid) {
        id
        logoImage
        commercialName
        createdAt
        email
        legalAddress {
            address
            city
        }
        movilPhone
        postCount
        ruc
        socialReason
        termsConditions
        categories {
            id
            name
            tags
            createdAt
            alias
            updatedAt
        }
        activePlan {
            createdAt
            duration
            id
            type
            updatedAt
        }
        postCount
        stores{
            id
        }
    }
}
`

const updateCompany = gql`
mutation updateCompany($companyid: ID!, $termsConditions: String) {
    company: updateCompany(id: $companyid, termsConditions: $termsConditions) {
        id
        termsConditions    
    }
}
`

const addCompanyCategory = gql`
mutation AddCompanyCategory($companyid: ID!, $categoryid: ID!) {
    reponse: addToCompanyCategories(categoriesCompanyCategoryId: $categoryid, companiesAttachedCompanyId: $companyid) {
        companiesAttachedCompany {
            id
            commercialName
        }
    }
}
`
const removeCompanyCategory = gql`
mutation removeCompanyCategory($companyid: ID!, $categoryid: ID!) {
    reponse: removeFromCompanyCategories(categoriesCompanyCategoryId: $categoryid, companiesAttachedCompanyId: $companyid) {
        companiesAttachedCompany {
            id
            commercialName
          }
    }
}
`

export {companyQuery, addCompanyCategory, removeCompanyCategory, updateCompany}
