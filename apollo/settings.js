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

const updateHeaderPortrait = gql`
mutation ($companyid: ID!, $headerBackground: String){
  updateCompany(
    id: $companyid,
    headerBackground: $headerBackground
  ) {
    id
    headerBackground
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

export {logoImage, updateLogoImage, updateHeaderPortrait}
