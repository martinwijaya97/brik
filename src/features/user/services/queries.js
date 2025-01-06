import gql from 'graphql-tag';

export const COMPANY_LIST = gql`
  query ($page: Int, $pageSize: Int, $searchQuery: String) {
    companyList(page: $page, pageSize: $pageSize, search: $searchQuery) {
      companies {
        id
        name
        code
      }
      meta {
        total
        pageSize
        currentPage
        totalPage
      }
    }
  }
`;

export const COMPANY_DETAIL = gql`
  query ($id: String!) {
    companyDetail(id: $id) {
      id
      name
      code
    }
  }
`;
