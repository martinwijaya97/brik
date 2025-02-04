import gql from 'graphql-tag';

export const COMPANY_LIST = gql`
  query ($page: Int, $pageSize: Int, $searchQuery: String, $sortByColumnName: String!, $sortByDirection: SortOrder!) {
    companyList(
      page: $page
      pageSize: $pageSize
      search: $searchQuery
      sort: { columnName: $sortByColumnName, sortOrder: $sortByDirection }
    ) {
      companies {
        id
        name
        code
        creator {
          id
          username
        }
        updater {
          id
          username
        }
        plants {
          id
          code
          name
        }
      }
      meta {
        currentPage
        pageSize
        totalItems
        totalPages
      }
    }
  }
`;

export const COMPANY_DETAIL = gql`
  query ($id: ID!) {
    companyDetail(id: $id) {
      id
      name
      code
      creator {
        id
        username
      }
      updater {
        id
        username
      }
      plants {
        id
        code
        name
      }
    }
  }
`;
