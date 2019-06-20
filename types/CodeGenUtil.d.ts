import { OmitByValueExact } from 'utility-types';

declare global {
  /**
   * Top extractors
   */
  type ModelFromGetQuery<
    Q extends GetQueryStructure,
    QueryName extends string
  > = GetValueOfQueryName<Q, QueryName>;

  type ModelFromListQuery<
    Q extends ListQueryStructure,
    QueryName extends string
  > = ListQueryItemModel<Q, QueryName>;

  type ModelConnectionFromGetQuery<
    Q extends ConnectionGetQueryStructure,
    QueryName extends string,
    ConnectionFieldName extends string
  > = ConnectionGetValueOfQueryName<Q, QueryName, ConnectionFieldName>;

  /**
   * Utils - Connection
   */
  interface ConnectionGetQueryStructure {
    [k: string]: {
      [k: string]: any | null;
    } | null;
  }

  type ConnectionGetValueOfQueryName<
    Q extends ConnectionGetQueryStructure,
    QueryName extends string,
    ConnectionFieldName extends string
  > = NonNullable<NonNullable<NonNullable<Q[QueryName]>>[ConnectionFieldName]>;

  /**
   * Utils - GetQuery
   */

  interface GetQueryStructure {
    [k: string]: {
      [f: string]: any;
    } | null;
  }

  type GetValueOfQueryName<
    Q extends GetQueryStructure,
    QueryName extends string
  > = NonNullable<Q[QueryName]>;

  /**
   * Utils - ListItems
   */

  type ListQueryItemArrayStructure = Array<{
    [x: number]: any;
  } | null>;

  interface ListQueryStructure {
    [k: string]: {
      items: ListQueryItemArrayStructure | null;
    } | null;
  }

  type ListValueOfQueryName<
    Q extends ListQueryStructure,
    QueryName extends string
  > = NonNullable<Q[QueryName]>;

  type ListQueryValueOfItems<
    Q extends ListQueryStructure,
    QueryName extends string
  > = NonNullable<ListValueOfQueryName<Q, QueryName>['items']>;

  type ListQueryRemoveNullOnArrayValue<
    Q extends ListQueryStructure,
    QueryName extends string
  > = Exclude<ListQueryValueOfItems<Q, QueryName>, [null]>;

  type ListQueryItemModel<
    Q extends ListQueryStructure,
    QueryName extends string
  > = NonNullable<ListQueryRemoveNullOnArrayValue<Q, QueryName>[0]>;
}
