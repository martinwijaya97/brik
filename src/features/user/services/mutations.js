import gql from 'graphql-tag';

export const COMPANY_CREATE = gql`
  mutation companyCreate($code: String, $name: String!) {
    companyCreate(input: { code: $code, name: $name }) {
      id
      name
      code
      createdAt
    }
  }
`;

export const COMPANY_UPDATE = gql`
  mutation companyUpdate($id: ID!, $code: String, $name: String!) {
    companyUpdate(id: $id, input: { code: $code, name: $name }) {
      id
      name
      code
      createdAt
    }
  }
`;

export const COMPANY_DELETE = gql`
  mutation companyDelete($id: ID!) {
    companyDelete(id: $id) {
      id
      name
      code
      createdAt
    }
  }
`;
