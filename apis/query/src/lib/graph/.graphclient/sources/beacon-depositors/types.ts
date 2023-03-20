// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace BeaconDepositorsTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Aggregation = {
  id: Scalars['ID'];
  totalDeposits?: Maybe<Scalars['BigInt']>;
  totalDepositors?: Maybe<Scalars['BigInt']>;
  totalAmountDeposited?: Maybe<Scalars['BigInt']>;
};

export type Aggregation_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalDeposits?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_not?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_gt?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_lt?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_gte?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_lte?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDeposits_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDepositors?: InputMaybe<Scalars['BigInt']>;
  totalDepositors_not?: InputMaybe<Scalars['BigInt']>;
  totalDepositors_gt?: InputMaybe<Scalars['BigInt']>;
  totalDepositors_lt?: InputMaybe<Scalars['BigInt']>;
  totalDepositors_gte?: InputMaybe<Scalars['BigInt']>;
  totalDepositors_lte?: InputMaybe<Scalars['BigInt']>;
  totalDepositors_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDepositors_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountDeposited?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_not?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Aggregation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Aggregation_filter>>>;
};

export type Aggregation_orderBy =
  | 'id'
  | 'totalDeposits'
  | 'totalDepositors'
  | 'totalAmountDeposited';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type DailyDeposit = {
  id: Scalars['ID'];
  dailyAmountDeposited?: Maybe<Scalars['BigInt']>;
  dailyDepositCount?: Maybe<Scalars['BigInt']>;
};

export type DailyDeposit_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  dailyAmountDeposited?: InputMaybe<Scalars['BigInt']>;
  dailyAmountDeposited_not?: InputMaybe<Scalars['BigInt']>;
  dailyAmountDeposited_gt?: InputMaybe<Scalars['BigInt']>;
  dailyAmountDeposited_lt?: InputMaybe<Scalars['BigInt']>;
  dailyAmountDeposited_gte?: InputMaybe<Scalars['BigInt']>;
  dailyAmountDeposited_lte?: InputMaybe<Scalars['BigInt']>;
  dailyAmountDeposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyAmountDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyDepositCount?: InputMaybe<Scalars['BigInt']>;
  dailyDepositCount_not?: InputMaybe<Scalars['BigInt']>;
  dailyDepositCount_gt?: InputMaybe<Scalars['BigInt']>;
  dailyDepositCount_lt?: InputMaybe<Scalars['BigInt']>;
  dailyDepositCount_gte?: InputMaybe<Scalars['BigInt']>;
  dailyDepositCount_lte?: InputMaybe<Scalars['BigInt']>;
  dailyDepositCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyDepositCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyDeposit_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DailyDeposit_filter>>>;
};

export type DailyDeposit_orderBy =
  | 'id'
  | 'dailyAmountDeposited'
  | 'dailyDepositCount';

export type Deposit = {
  id: Scalars['ID'];
  dayID: Scalars['String'];
  depositor?: Maybe<Depositor>;
  pubkey: Scalars['Bytes'];
  withdrawal_credentials: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type Deposit_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  dayID?: InputMaybe<Scalars['String']>;
  dayID_not?: InputMaybe<Scalars['String']>;
  dayID_gt?: InputMaybe<Scalars['String']>;
  dayID_lt?: InputMaybe<Scalars['String']>;
  dayID_gte?: InputMaybe<Scalars['String']>;
  dayID_lte?: InputMaybe<Scalars['String']>;
  dayID_in?: InputMaybe<Array<Scalars['String']>>;
  dayID_not_in?: InputMaybe<Array<Scalars['String']>>;
  dayID_contains?: InputMaybe<Scalars['String']>;
  dayID_contains_nocase?: InputMaybe<Scalars['String']>;
  dayID_not_contains?: InputMaybe<Scalars['String']>;
  dayID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dayID_starts_with?: InputMaybe<Scalars['String']>;
  dayID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dayID_not_starts_with?: InputMaybe<Scalars['String']>;
  dayID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dayID_ends_with?: InputMaybe<Scalars['String']>;
  dayID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dayID_not_ends_with?: InputMaybe<Scalars['String']>;
  dayID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  depositor?: InputMaybe<Scalars['String']>;
  depositor_not?: InputMaybe<Scalars['String']>;
  depositor_gt?: InputMaybe<Scalars['String']>;
  depositor_lt?: InputMaybe<Scalars['String']>;
  depositor_gte?: InputMaybe<Scalars['String']>;
  depositor_lte?: InputMaybe<Scalars['String']>;
  depositor_in?: InputMaybe<Array<Scalars['String']>>;
  depositor_not_in?: InputMaybe<Array<Scalars['String']>>;
  depositor_contains?: InputMaybe<Scalars['String']>;
  depositor_contains_nocase?: InputMaybe<Scalars['String']>;
  depositor_not_contains?: InputMaybe<Scalars['String']>;
  depositor_not_contains_nocase?: InputMaybe<Scalars['String']>;
  depositor_starts_with?: InputMaybe<Scalars['String']>;
  depositor_starts_with_nocase?: InputMaybe<Scalars['String']>;
  depositor_not_starts_with?: InputMaybe<Scalars['String']>;
  depositor_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  depositor_ends_with?: InputMaybe<Scalars['String']>;
  depositor_ends_with_nocase?: InputMaybe<Scalars['String']>;
  depositor_not_ends_with?: InputMaybe<Scalars['String']>;
  depositor_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  depositor_?: InputMaybe<Depositor_filter>;
  pubkey?: InputMaybe<Scalars['Bytes']>;
  pubkey_not?: InputMaybe<Scalars['Bytes']>;
  pubkey_gt?: InputMaybe<Scalars['Bytes']>;
  pubkey_lt?: InputMaybe<Scalars['Bytes']>;
  pubkey_gte?: InputMaybe<Scalars['Bytes']>;
  pubkey_lte?: InputMaybe<Scalars['Bytes']>;
  pubkey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pubkey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pubkey_contains?: InputMaybe<Scalars['Bytes']>;
  pubkey_not_contains?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials_not?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials_gt?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials_lt?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials_gte?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials_lte?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials_in?: InputMaybe<Array<Scalars['Bytes']>>;
  withdrawal_credentials_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  withdrawal_credentials_contains?: InputMaybe<Scalars['Bytes']>;
  withdrawal_credentials_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
};

export type Deposit_orderBy =
  | 'id'
  | 'dayID'
  | 'depositor'
  | 'depositor__id'
  | 'depositor__totalAmountDeposited'
  | 'depositor__depositCount'
  | 'pubkey'
  | 'withdrawal_credentials'
  | 'amount'
  | 'timestamp';

export type Depositor = {
  id: Scalars['ID'];
  totalAmountDeposited?: Maybe<Scalars['BigInt']>;
  depositCount?: Maybe<Scalars['BigInt']>;
  deposits?: Maybe<Array<Deposit>>;
};


export type DepositordepositsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Deposit_filter>;
};

export type Depositor_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalAmountDeposited?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_not?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmountDeposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  depositCount?: InputMaybe<Scalars['BigInt']>;
  depositCount_not?: InputMaybe<Scalars['BigInt']>;
  depositCount_gt?: InputMaybe<Scalars['BigInt']>;
  depositCount_lt?: InputMaybe<Scalars['BigInt']>;
  depositCount_gte?: InputMaybe<Scalars['BigInt']>;
  depositCount_lte?: InputMaybe<Scalars['BigInt']>;
  depositCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  depositCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deposits_?: InputMaybe<Deposit_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Depositor_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Depositor_filter>>>;
};

export type Depositor_orderBy =
  | 'id'
  | 'totalAmountDeposited'
  | 'depositCount'
  | 'deposits';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  aggregation?: Maybe<Aggregation>;
  aggregations: Array<Aggregation>;
  depositor?: Maybe<Depositor>;
  depositors: Array<Depositor>;
  dailyDeposit?: Maybe<DailyDeposit>;
  dailyDeposits: Array<DailyDeposit>;
  deposit?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryaggregationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaggregationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Aggregation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Aggregation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Depositor_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Depositor_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydailyDepositArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydailyDepositsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyDeposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DailyDeposit_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Deposit_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  aggregation?: Maybe<Aggregation>;
  aggregations: Array<Aggregation>;
  depositor?: Maybe<Depositor>;
  depositors: Array<Depositor>;
  dailyDeposit?: Maybe<DailyDeposit>;
  dailyDeposits: Array<DailyDeposit>;
  deposit?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionaggregationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaggregationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Aggregation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Aggregation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Depositor_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Depositor_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondailyDepositArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondailyDepositsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyDeposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DailyDeposit_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Deposit_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  aggregation: InContextSdkMethod<Query['aggregation'], QueryaggregationArgs, MeshContext>,
  /** null **/
  aggregations: InContextSdkMethod<Query['aggregations'], QueryaggregationsArgs, MeshContext>,
  /** null **/
  depositor: InContextSdkMethod<Query['depositor'], QuerydepositorArgs, MeshContext>,
  /** null **/
  depositors: InContextSdkMethod<Query['depositors'], QuerydepositorsArgs, MeshContext>,
  /** null **/
  dailyDeposit: InContextSdkMethod<Query['dailyDeposit'], QuerydailyDepositArgs, MeshContext>,
  /** null **/
  dailyDeposits: InContextSdkMethod<Query['dailyDeposits'], QuerydailyDepositsArgs, MeshContext>,
  /** null **/
  deposit: InContextSdkMethod<Query['deposit'], QuerydepositArgs, MeshContext>,
  /** null **/
  deposits: InContextSdkMethod<Query['deposits'], QuerydepositsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  aggregation: InContextSdkMethod<Subscription['aggregation'], SubscriptionaggregationArgs, MeshContext>,
  /** null **/
  aggregations: InContextSdkMethod<Subscription['aggregations'], SubscriptionaggregationsArgs, MeshContext>,
  /** null **/
  depositor: InContextSdkMethod<Subscription['depositor'], SubscriptiondepositorArgs, MeshContext>,
  /** null **/
  depositors: InContextSdkMethod<Subscription['depositors'], SubscriptiondepositorsArgs, MeshContext>,
  /** null **/
  dailyDeposit: InContextSdkMethod<Subscription['dailyDeposit'], SubscriptiondailyDepositArgs, MeshContext>,
  /** null **/
  dailyDeposits: InContextSdkMethod<Subscription['dailyDeposits'], SubscriptiondailyDepositsArgs, MeshContext>,
  /** null **/
  deposit: InContextSdkMethod<Subscription['deposit'], SubscriptiondepositArgs, MeshContext>,
  /** null **/
  deposits: InContextSdkMethod<Subscription['deposits'], SubscriptiondepositsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["beacon-depositors"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
