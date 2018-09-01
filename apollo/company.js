import gql from 'graphql-tag'

const plansQuery = gql`
query allPlansQuery {
  plans: allPlans {
    id
    monthlyPrice
    name
    duration
    
  }
}
`

const companyQuery = gql`
query companyQuery ($companyid: ID) {
    company: Company (id: $companyid) {
        id
        aboutUs
        logoImage
        headerBackground
        commercialName
        createdAt
        email
        legalAddress {
            id
            address
            city
            province
            country
            postalCode
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
            name
            updatedAt
        }
        postCount
        stores{
            id
        }
    }
}
`

const createCompany = gql`
mutation createCompany($email: String!, $password: String!, $staticPhone: String!, $movilPhone: String!,
  $socialReason: String!, $commercialName: String!, $fiscalIdentity: String!, $ruc: String!, $ownerFullname: String!,
  $legalAddressAddress: String!, $legalAddressPostalCode: String, $link: String!, $aboutUs: String!,
  $legalAddressCity: String!, $legalAddressProvince: String!, $legalAddressCountry: String!, $emailPayment: String!, $activePlanId: ID
  $termsConditions: String!, $legalAddressRegion: String!) {
    company: createCompany(
      aboutUs: $aboutUs,
      email: $email,
      password: $password,
      ownerFullname: $ownerFullname,
      staticPhone: $staticPhone,
      movilPhone: $movilPhone,
      activePlanId: $activePlanId,
      socialReason: $socialReason,
      commercialName: $commercialName,
      fiscalIdentity: $fiscalIdentity,
      link: $link,
      ruc: $ruc,
      emailPayment: $emailPayment,
      termsConditions: $termsConditions,
      legalAddress: {
        address: $legalAddressAddress,
        city: $legalAddressCity,
        country: $legalAddressCountry,
        province: $legalAddressProvince,
        postalCode: $legalAddressPostalCode,
        region: $legalAddressRegion
      }
    ) {
        id
        email
        movilPhone
        termsConditions
        legalAddress {
          address
          city
          province
          country
          postalCode
        }
    }
}
`

const updateCompany = gql`
mutation updateCompany($companyid: ID!, $aboutUs: String, $movilPhone: String, $email: String, $emailPayment: String, $commercialName: String) {
    company: updateCompany(
      id: $companyid,
      aboutUs: $aboutUs,
      email: $email,
      emailPayment: $emailPayment,
      commercialName: $commercialName,
      movilPhone: $movilPhone
    ) {
        id
        email
        emailPayment
        commercialName
        movilPhone
        aboutUs
        ownerFullname
    }
}
`

const updateCompanyLegalAddress = gql`
mutation updateCompanyLegalAddress($legalAddressId: ID!, $address: String, $city: String, $province: String, $country: String, $postalCode: String) {
    legalAddress: updateLegalAddress(
      id: $legalAddressId,
      address: $address,
      city: $city,
      province: $province,
      country: $country,
      postalCode: $postalCode)
    {
        id
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

export { companyQuery, addCompanyCategory, removeCompanyCategory, updateCompany, updateCompanyLegalAddress, createCompany, plansQuery }
