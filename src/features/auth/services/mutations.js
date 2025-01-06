import gql from 'graphql-tag';

export const Login = gql`
  mutation Login($input: UserLogin!) {
    login(input: $input) {
      user {
        id
        username
        lastName
        firstName
        email
      }
      token
    }
  }
`;
