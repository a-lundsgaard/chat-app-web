import { gql } from './__generated__/gql';


const IndexPageQuery = gql(`
  query IndexPageQuery {
    getAllUsers {
      id
      username
      email
      password
      created_at
    }
  }
`);