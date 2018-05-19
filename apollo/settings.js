import gql from 'graphql-tag'

const logoImage = gql`
query ($companyid: ID) {
  Company (
    id: $companyid
  ) {
    id
    ruc
    logoImage
  }
}`

const updateLogoImage = gql`
mutation ($companyid: ID!, $logoImage: String){
  updateCompany(
    id: $companyid,
    logoImage: $logoImage
  ) {
    id
    logoImage
  }
}`

export {logoImage, updateLogoImage}
