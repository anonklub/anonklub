// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace CryptopunksTypes {
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

export type Account = {
  /** Ethereum Address */
  id: Scalars['Bytes'];
  /** All Punks owned by Account */
  punksOwned?: Maybe<Array<Punk>>;
  /** Purchases by Account */
  bought: Array<Sale>;
  /** All Punks owned by Account */
  nftsOwned: Array<NFT>;
  /** Punks assigned to account (if any) */
  assigned: Array<Assign>;
  /** Punk transfers by Account */
  sent: Array<Transfer>;
  /** Punk transfers to Account */
  received: Array<Transfer>;
  /** Query bids by Account */
  bids: Array<Bid>;
  /** Punks offered for sale by Account */
  asks: Array<Ask>;
  /** Total number of Punks owned by account */
  numberOfPunksOwned: Scalars['BigInt'];
  /** Total number of Punks assigned to account */
  numberOfPunksAssigned: Scalars['BigInt'];
  /** Total number of transfer by Account */
  numberOfTransfers: Scalars['BigInt'];
  /** Total number of sales by Account */
  numberOfSales: Scalars['BigInt'];
  /** Total number of purchases by Account */
  numberOfPurchases: Scalars['BigInt'];
  /** Total amount spent buying Punks by Account */
  totalSpent: Scalars['BigInt'];
  /** Total amount earned by Account from selling Punks */
  totalEarned: Scalars['BigInt'];
  /** Average amount spent buying Punks by Account */
  averageAmountSpent: Scalars['BigInt'];
  /** Account URL */
  accountUrl: Scalars['String'];
};


export type AccountpunksOwnedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Punk_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Punk_filter>;
};


export type AccountboughtArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sale_filter>;
};


export type AccountnftsOwnedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
};


export type AccountassignedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Assign_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Assign_filter>;
};


export type AccountsentArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
};


export type AccountreceivedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
};


export type AccountbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
};


export type AccountasksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ask_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Ask_filter>;
};

export type Account_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  punksOwned_?: InputMaybe<Punk_filter>;
  bought_?: InputMaybe<Sale_filter>;
  nftsOwned_?: InputMaybe<NFT_filter>;
  assigned_?: InputMaybe<Assign_filter>;
  sent_?: InputMaybe<Transfer_filter>;
  received_?: InputMaybe<Transfer_filter>;
  bids_?: InputMaybe<Bid_filter>;
  asks_?: InputMaybe<Ask_filter>;
  numberOfPunksOwned?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksOwned_not?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksOwned_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksOwned_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksOwned_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksOwned_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksOwned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfPunksOwned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfPunksAssigned?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksAssigned_not?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksAssigned_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksAssigned_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksAssigned_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksAssigned_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfPunksAssigned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfPunksAssigned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfTransfers?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_not?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfSales?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_not?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfSales_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfPurchases?: InputMaybe<Scalars['BigInt']>;
  numberOfPurchases_not?: InputMaybe<Scalars['BigInt']>;
  numberOfPurchases_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfPurchases_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfPurchases_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfPurchases_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfPurchases_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfPurchases_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSpent?: InputMaybe<Scalars['BigInt']>;
  totalSpent_not?: InputMaybe<Scalars['BigInt']>;
  totalSpent_gt?: InputMaybe<Scalars['BigInt']>;
  totalSpent_lt?: InputMaybe<Scalars['BigInt']>;
  totalSpent_gte?: InputMaybe<Scalars['BigInt']>;
  totalSpent_lte?: InputMaybe<Scalars['BigInt']>;
  totalSpent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSpent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalEarned?: InputMaybe<Scalars['BigInt']>;
  totalEarned_not?: InputMaybe<Scalars['BigInt']>;
  totalEarned_gt?: InputMaybe<Scalars['BigInt']>;
  totalEarned_lt?: InputMaybe<Scalars['BigInt']>;
  totalEarned_gte?: InputMaybe<Scalars['BigInt']>;
  totalEarned_lte?: InputMaybe<Scalars['BigInt']>;
  totalEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averageAmountSpent?: InputMaybe<Scalars['BigInt']>;
  averageAmountSpent_not?: InputMaybe<Scalars['BigInt']>;
  averageAmountSpent_gt?: InputMaybe<Scalars['BigInt']>;
  averageAmountSpent_lt?: InputMaybe<Scalars['BigInt']>;
  averageAmountSpent_gte?: InputMaybe<Scalars['BigInt']>;
  averageAmountSpent_lte?: InputMaybe<Scalars['BigInt']>;
  averageAmountSpent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averageAmountSpent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accountUrl?: InputMaybe<Scalars['String']>;
  accountUrl_not?: InputMaybe<Scalars['String']>;
  accountUrl_gt?: InputMaybe<Scalars['String']>;
  accountUrl_lt?: InputMaybe<Scalars['String']>;
  accountUrl_gte?: InputMaybe<Scalars['String']>;
  accountUrl_lte?: InputMaybe<Scalars['String']>;
  accountUrl_in?: InputMaybe<Array<Scalars['String']>>;
  accountUrl_not_in?: InputMaybe<Array<Scalars['String']>>;
  accountUrl_contains?: InputMaybe<Scalars['String']>;
  accountUrl_contains_nocase?: InputMaybe<Scalars['String']>;
  accountUrl_not_contains?: InputMaybe<Scalars['String']>;
  accountUrl_not_contains_nocase?: InputMaybe<Scalars['String']>;
  accountUrl_starts_with?: InputMaybe<Scalars['String']>;
  accountUrl_starts_with_nocase?: InputMaybe<Scalars['String']>;
  accountUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  accountUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  accountUrl_ends_with?: InputMaybe<Scalars['String']>;
  accountUrl_ends_with_nocase?: InputMaybe<Scalars['String']>;
  accountUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  accountUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Account_filter>>>;
};

export type Account_orderBy =
  | 'id'
  | 'punksOwned'
  | 'bought'
  | 'nftsOwned'
  | 'assigned'
  | 'sent'
  | 'received'
  | 'bids'
  | 'asks'
  | 'numberOfPunksOwned'
  | 'numberOfPunksAssigned'
  | 'numberOfTransfers'
  | 'numberOfSales'
  | 'numberOfPurchases'
  | 'totalSpent'
  | 'totalEarned'
  | 'averageAmountSpent'
  | 'accountUrl';

export type Ask = Offer & {
  id: Scalars['ID'];
  /** Account that created Ask */
  from: Account;
  /** Open Status of Punk. Asks can be either Open or Closed */
  open: Scalars['Boolean'];
  /** Ask for Punk in ETH */
  amount: Scalars['BigInt'];
  /** Punk being offered for sale */
  nft?: Maybe<NFT>;
  /** Ask created at */
  created?: Maybe<Event>;
  /** Ask removed at */
  removed?: Maybe<Event>;
  offerType: OfferType;
};

export type AskCreated = Event & {
  id: Scalars['ID'];
  /** Account that created Ask */
  from?: Maybe<Account>;
  to?: Maybe<Account>;
  ask?: Maybe<Ask>;
  /** Ask in ETH */
  amount?: Maybe<Scalars['BigInt']>;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk being offered for sale */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type AskCreated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  ask?: InputMaybe<Scalars['String']>;
  ask_not?: InputMaybe<Scalars['String']>;
  ask_gt?: InputMaybe<Scalars['String']>;
  ask_lt?: InputMaybe<Scalars['String']>;
  ask_gte?: InputMaybe<Scalars['String']>;
  ask_lte?: InputMaybe<Scalars['String']>;
  ask_in?: InputMaybe<Array<Scalars['String']>>;
  ask_not_in?: InputMaybe<Array<Scalars['String']>>;
  ask_contains?: InputMaybe<Scalars['String']>;
  ask_contains_nocase?: InputMaybe<Scalars['String']>;
  ask_not_contains?: InputMaybe<Scalars['String']>;
  ask_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ask_starts_with?: InputMaybe<Scalars['String']>;
  ask_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ask_not_starts_with?: InputMaybe<Scalars['String']>;
  ask_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ask_ends_with?: InputMaybe<Scalars['String']>;
  ask_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ask_not_ends_with?: InputMaybe<Scalars['String']>;
  ask_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ask_?: InputMaybe<Ask_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<AskCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AskCreated_filter>>>;
};

export type AskCreated_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'ask'
  | 'ask__id'
  | 'ask__open'
  | 'ask__amount'
  | 'ask__offerType'
  | 'amount'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type AskRemoved = Event & {
  id: Scalars['ID'];
  ask: Ask;
  /** Account that removed Ask */
  from?: Maybe<Account>;
  to?: Maybe<Account>;
  /** Ask that was removed, in ETH */
  amount?: Maybe<Scalars['BigInt']>;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk whose asked was removed */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type AskRemoved_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  ask?: InputMaybe<Scalars['String']>;
  ask_not?: InputMaybe<Scalars['String']>;
  ask_gt?: InputMaybe<Scalars['String']>;
  ask_lt?: InputMaybe<Scalars['String']>;
  ask_gte?: InputMaybe<Scalars['String']>;
  ask_lte?: InputMaybe<Scalars['String']>;
  ask_in?: InputMaybe<Array<Scalars['String']>>;
  ask_not_in?: InputMaybe<Array<Scalars['String']>>;
  ask_contains?: InputMaybe<Scalars['String']>;
  ask_contains_nocase?: InputMaybe<Scalars['String']>;
  ask_not_contains?: InputMaybe<Scalars['String']>;
  ask_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ask_starts_with?: InputMaybe<Scalars['String']>;
  ask_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ask_not_starts_with?: InputMaybe<Scalars['String']>;
  ask_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ask_ends_with?: InputMaybe<Scalars['String']>;
  ask_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ask_not_ends_with?: InputMaybe<Scalars['String']>;
  ask_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ask_?: InputMaybe<Ask_filter>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<AskRemoved_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AskRemoved_filter>>>;
};

export type AskRemoved_orderBy =
  | 'id'
  | 'ask'
  | 'ask__id'
  | 'ask__open'
  | 'ask__amount'
  | 'ask__offerType'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type Ask_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  open?: InputMaybe<Scalars['Boolean']>;
  open_not?: InputMaybe<Scalars['Boolean']>;
  open_in?: InputMaybe<Array<Scalars['Boolean']>>;
  open_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  created?: InputMaybe<Scalars['String']>;
  created_not?: InputMaybe<Scalars['String']>;
  created_gt?: InputMaybe<Scalars['String']>;
  created_lt?: InputMaybe<Scalars['String']>;
  created_gte?: InputMaybe<Scalars['String']>;
  created_lte?: InputMaybe<Scalars['String']>;
  created_in?: InputMaybe<Array<Scalars['String']>>;
  created_not_in?: InputMaybe<Array<Scalars['String']>>;
  created_contains?: InputMaybe<Scalars['String']>;
  created_contains_nocase?: InputMaybe<Scalars['String']>;
  created_not_contains?: InputMaybe<Scalars['String']>;
  created_not_contains_nocase?: InputMaybe<Scalars['String']>;
  created_starts_with?: InputMaybe<Scalars['String']>;
  created_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_starts_with?: InputMaybe<Scalars['String']>;
  created_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_ends_with?: InputMaybe<Scalars['String']>;
  created_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_ends_with?: InputMaybe<Scalars['String']>;
  created_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_?: InputMaybe<Event_filter>;
  removed?: InputMaybe<Scalars['String']>;
  removed_not?: InputMaybe<Scalars['String']>;
  removed_gt?: InputMaybe<Scalars['String']>;
  removed_lt?: InputMaybe<Scalars['String']>;
  removed_gte?: InputMaybe<Scalars['String']>;
  removed_lte?: InputMaybe<Scalars['String']>;
  removed_in?: InputMaybe<Array<Scalars['String']>>;
  removed_not_in?: InputMaybe<Array<Scalars['String']>>;
  removed_contains?: InputMaybe<Scalars['String']>;
  removed_contains_nocase?: InputMaybe<Scalars['String']>;
  removed_not_contains?: InputMaybe<Scalars['String']>;
  removed_not_contains_nocase?: InputMaybe<Scalars['String']>;
  removed_starts_with?: InputMaybe<Scalars['String']>;
  removed_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removed_not_starts_with?: InputMaybe<Scalars['String']>;
  removed_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removed_ends_with?: InputMaybe<Scalars['String']>;
  removed_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removed_not_ends_with?: InputMaybe<Scalars['String']>;
  removed_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removed_?: InputMaybe<Event_filter>;
  offerType?: InputMaybe<OfferType>;
  offerType_not?: InputMaybe<OfferType>;
  offerType_in?: InputMaybe<Array<OfferType>>;
  offerType_not_in?: InputMaybe<Array<OfferType>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Ask_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Ask_filter>>>;
};

export type Ask_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'open'
  | 'amount'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'created'
  | 'created__id'
  | 'created__amount'
  | 'created__type'
  | 'created__logNumber'
  | 'created__blockNumber'
  | 'created__blockHash'
  | 'created__txHash'
  | 'created__timestamp'
  | 'removed'
  | 'removed__id'
  | 'removed__amount'
  | 'removed__type'
  | 'removed__logNumber'
  | 'removed__blockNumber'
  | 'removed__blockHash'
  | 'removed__txHash'
  | 'removed__timestamp'
  | 'offerType';

export type Assign = Event & {
  id: Scalars['ID'];
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk that was assigned */
  nft?: Maybe<NFT>;
  /** Account that claimed Punk */
  to?: Maybe<Account>;
  amount?: Maybe<Scalars['BigInt']>;
  from?: Maybe<Account>;
  type: EventType;
  logNumber: Scalars['BigInt'];
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type Assign_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<Assign_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Assign_filter>>>;
};

export type Assign_orderBy =
  | 'id'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'type'
  | 'logNumber'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type Bid = Offer & {
  id: Scalars['ID'];
  /** Bidder */
  from: Account;
  /** Open status of Punk. Bids can be either Open or Closed */
  open: Scalars['Boolean'];
  /** Bid amount in ETH */
  amount: Scalars['BigInt'];
  /** Punk bidded */
  nft?: Maybe<NFT>;
  /** Bid created at */
  created?: Maybe<Event>;
  /** Bid removed at */
  removed?: Maybe<Event>;
  offerType: OfferType;
};

export type BidCreated = Event & {
  id: Scalars['ID'];
  /** Account that created Bid */
  from?: Maybe<Account>;
  to?: Maybe<Account>;
  bid?: Maybe<Bid>;
  /** Bid in ETH */
  amount?: Maybe<Scalars['BigInt']>;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk being bidded */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type BidCreated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  bid?: InputMaybe<Scalars['String']>;
  bid_not?: InputMaybe<Scalars['String']>;
  bid_gt?: InputMaybe<Scalars['String']>;
  bid_lt?: InputMaybe<Scalars['String']>;
  bid_gte?: InputMaybe<Scalars['String']>;
  bid_lte?: InputMaybe<Scalars['String']>;
  bid_in?: InputMaybe<Array<Scalars['String']>>;
  bid_not_in?: InputMaybe<Array<Scalars['String']>>;
  bid_contains?: InputMaybe<Scalars['String']>;
  bid_contains_nocase?: InputMaybe<Scalars['String']>;
  bid_not_contains?: InputMaybe<Scalars['String']>;
  bid_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bid_starts_with?: InputMaybe<Scalars['String']>;
  bid_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bid_not_starts_with?: InputMaybe<Scalars['String']>;
  bid_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bid_ends_with?: InputMaybe<Scalars['String']>;
  bid_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bid_not_ends_with?: InputMaybe<Scalars['String']>;
  bid_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bid_?: InputMaybe<Bid_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<BidCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BidCreated_filter>>>;
};

export type BidCreated_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'bid'
  | 'bid__id'
  | 'bid__open'
  | 'bid__amount'
  | 'bid__offerType'
  | 'amount'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type BidRemoved = Event & {
  id: Scalars['ID'];
  /** Account that removed Bid */
  from?: Maybe<Account>;
  to?: Maybe<Account>;
  /** Bid that was removed, in ETH */
  amount?: Maybe<Scalars['BigInt']>;
  bid: Bid;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk whose Bid was removed */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type BidRemoved_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bid?: InputMaybe<Scalars['String']>;
  bid_not?: InputMaybe<Scalars['String']>;
  bid_gt?: InputMaybe<Scalars['String']>;
  bid_lt?: InputMaybe<Scalars['String']>;
  bid_gte?: InputMaybe<Scalars['String']>;
  bid_lte?: InputMaybe<Scalars['String']>;
  bid_in?: InputMaybe<Array<Scalars['String']>>;
  bid_not_in?: InputMaybe<Array<Scalars['String']>>;
  bid_contains?: InputMaybe<Scalars['String']>;
  bid_contains_nocase?: InputMaybe<Scalars['String']>;
  bid_not_contains?: InputMaybe<Scalars['String']>;
  bid_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bid_starts_with?: InputMaybe<Scalars['String']>;
  bid_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bid_not_starts_with?: InputMaybe<Scalars['String']>;
  bid_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bid_ends_with?: InputMaybe<Scalars['String']>;
  bid_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bid_not_ends_with?: InputMaybe<Scalars['String']>;
  bid_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bid_?: InputMaybe<Bid_filter>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<BidRemoved_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BidRemoved_filter>>>;
};

export type BidRemoved_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'bid'
  | 'bid__id'
  | 'bid__open'
  | 'bid__amount'
  | 'bid__offerType'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type Bid_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  open?: InputMaybe<Scalars['Boolean']>;
  open_not?: InputMaybe<Scalars['Boolean']>;
  open_in?: InputMaybe<Array<Scalars['Boolean']>>;
  open_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  created?: InputMaybe<Scalars['String']>;
  created_not?: InputMaybe<Scalars['String']>;
  created_gt?: InputMaybe<Scalars['String']>;
  created_lt?: InputMaybe<Scalars['String']>;
  created_gte?: InputMaybe<Scalars['String']>;
  created_lte?: InputMaybe<Scalars['String']>;
  created_in?: InputMaybe<Array<Scalars['String']>>;
  created_not_in?: InputMaybe<Array<Scalars['String']>>;
  created_contains?: InputMaybe<Scalars['String']>;
  created_contains_nocase?: InputMaybe<Scalars['String']>;
  created_not_contains?: InputMaybe<Scalars['String']>;
  created_not_contains_nocase?: InputMaybe<Scalars['String']>;
  created_starts_with?: InputMaybe<Scalars['String']>;
  created_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_starts_with?: InputMaybe<Scalars['String']>;
  created_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_ends_with?: InputMaybe<Scalars['String']>;
  created_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_ends_with?: InputMaybe<Scalars['String']>;
  created_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_?: InputMaybe<Event_filter>;
  removed?: InputMaybe<Scalars['String']>;
  removed_not?: InputMaybe<Scalars['String']>;
  removed_gt?: InputMaybe<Scalars['String']>;
  removed_lt?: InputMaybe<Scalars['String']>;
  removed_gte?: InputMaybe<Scalars['String']>;
  removed_lte?: InputMaybe<Scalars['String']>;
  removed_in?: InputMaybe<Array<Scalars['String']>>;
  removed_not_in?: InputMaybe<Array<Scalars['String']>>;
  removed_contains?: InputMaybe<Scalars['String']>;
  removed_contains_nocase?: InputMaybe<Scalars['String']>;
  removed_not_contains?: InputMaybe<Scalars['String']>;
  removed_not_contains_nocase?: InputMaybe<Scalars['String']>;
  removed_starts_with?: InputMaybe<Scalars['String']>;
  removed_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removed_not_starts_with?: InputMaybe<Scalars['String']>;
  removed_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removed_ends_with?: InputMaybe<Scalars['String']>;
  removed_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removed_not_ends_with?: InputMaybe<Scalars['String']>;
  removed_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removed_?: InputMaybe<Event_filter>;
  offerType?: InputMaybe<OfferType>;
  offerType_not?: InputMaybe<OfferType>;
  offerType_in?: InputMaybe<Array<OfferType>>;
  offerType_not_in?: InputMaybe<Array<OfferType>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
};

export type Bid_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'open'
  | 'amount'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'created'
  | 'created__id'
  | 'created__amount'
  | 'created__type'
  | 'created__logNumber'
  | 'created__blockNumber'
  | 'created__blockHash'
  | 'created__txHash'
  | 'created__timestamp'
  | 'removed'
  | 'removed__id'
  | 'removed__amount'
  | 'removed__type'
  | 'removed__logNumber'
  | 'removed__blockNumber'
  | 'removed__blockHash'
  | 'removed__txHash'
  | 'removed__timestamp'
  | 'offerType';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CToken = {
  /** TxHash + logNumber */
  id: Scalars['ID'];
  /** Sender */
  from: Account;
  /** Recepient */
  to: Account;
  /** New owner of Punk */
  owner: Scalars['String'];
  /** Amount of cToken transferred */
  amount?: Maybe<Scalars['BigInt']>;
  punkId?: Maybe<Scalars['String']>;
  /** Field for storing referenceIDs of other events in the same transaction */
  referenceId: Scalars['String'];
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type CToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  punkId?: InputMaybe<Scalars['String']>;
  punkId_not?: InputMaybe<Scalars['String']>;
  punkId_gt?: InputMaybe<Scalars['String']>;
  punkId_lt?: InputMaybe<Scalars['String']>;
  punkId_gte?: InputMaybe<Scalars['String']>;
  punkId_lte?: InputMaybe<Scalars['String']>;
  punkId_in?: InputMaybe<Array<Scalars['String']>>;
  punkId_not_in?: InputMaybe<Array<Scalars['String']>>;
  punkId_contains?: InputMaybe<Scalars['String']>;
  punkId_contains_nocase?: InputMaybe<Scalars['String']>;
  punkId_not_contains?: InputMaybe<Scalars['String']>;
  punkId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  punkId_starts_with?: InputMaybe<Scalars['String']>;
  punkId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  punkId_not_starts_with?: InputMaybe<Scalars['String']>;
  punkId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  punkId_ends_with?: InputMaybe<Scalars['String']>;
  punkId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  punkId_not_ends_with?: InputMaybe<Scalars['String']>;
  punkId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referenceId?: InputMaybe<Scalars['String']>;
  referenceId_not?: InputMaybe<Scalars['String']>;
  referenceId_gt?: InputMaybe<Scalars['String']>;
  referenceId_lt?: InputMaybe<Scalars['String']>;
  referenceId_gte?: InputMaybe<Scalars['String']>;
  referenceId_lte?: InputMaybe<Scalars['String']>;
  referenceId_in?: InputMaybe<Array<Scalars['String']>>;
  referenceId_not_in?: InputMaybe<Array<Scalars['String']>>;
  referenceId_contains?: InputMaybe<Scalars['String']>;
  referenceId_contains_nocase?: InputMaybe<Scalars['String']>;
  referenceId_not_contains?: InputMaybe<Scalars['String']>;
  referenceId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  referenceId_starts_with?: InputMaybe<Scalars['String']>;
  referenceId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referenceId_not_starts_with?: InputMaybe<Scalars['String']>;
  referenceId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referenceId_ends_with?: InputMaybe<Scalars['String']>;
  referenceId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referenceId_not_ends_with?: InputMaybe<Scalars['String']>;
  referenceId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<CToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CToken_filter>>>;
};

export type CToken_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'owner'
  | 'amount'
  | 'punkId'
  | 'referenceId'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type Contract = {
  /** Contract Address */
  id: Scalars['ID'];
  /** Token Symbol */
  symbol?: Maybe<Scalars['String']>;
  /** Token name */
  name?: Maybe<Scalars['String']>;
  /** Total supply of tokens */
  totalSupply: Scalars['BigInt'];
  /** Total number of Punk sales */
  totalSales: Scalars['BigInt'];
  /** Total Sales in ETH for Punks */
  totalAmountTraded: Scalars['BigInt'];
  /** The hash of the composite image of all the Punks */
  imageHash?: Maybe<Scalars['String']>;
};

export type Contract_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSales?: InputMaybe<Scalars['BigInt']>;
  totalSales_not?: InputMaybe<Scalars['BigInt']>;
  totalSales_gt?: InputMaybe<Scalars['BigInt']>;
  totalSales_lt?: InputMaybe<Scalars['BigInt']>;
  totalSales_gte?: InputMaybe<Scalars['BigInt']>;
  totalSales_lte?: InputMaybe<Scalars['BigInt']>;
  totalSales_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSales_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountTraded?: InputMaybe<Scalars['BigInt']>;
  totalAmountTraded_not?: InputMaybe<Scalars['BigInt']>;
  totalAmountTraded_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmountTraded_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmountTraded_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmountTraded_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmountTraded_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountTraded_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  imageHash?: InputMaybe<Scalars['String']>;
  imageHash_not?: InputMaybe<Scalars['String']>;
  imageHash_gt?: InputMaybe<Scalars['String']>;
  imageHash_lt?: InputMaybe<Scalars['String']>;
  imageHash_gte?: InputMaybe<Scalars['String']>;
  imageHash_lte?: InputMaybe<Scalars['String']>;
  imageHash_in?: InputMaybe<Array<Scalars['String']>>;
  imageHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  imageHash_contains?: InputMaybe<Scalars['String']>;
  imageHash_contains_nocase?: InputMaybe<Scalars['String']>;
  imageHash_not_contains?: InputMaybe<Scalars['String']>;
  imageHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  imageHash_starts_with?: InputMaybe<Scalars['String']>;
  imageHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  imageHash_not_starts_with?: InputMaybe<Scalars['String']>;
  imageHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  imageHash_ends_with?: InputMaybe<Scalars['String']>;
  imageHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  imageHash_not_ends_with?: InputMaybe<Scalars['String']>;
  imageHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Contract_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Contract_filter>>>;
};

export type Contract_orderBy =
  | 'id'
  | 'symbol'
  | 'name'
  | 'totalSupply'
  | 'totalSales'
  | 'totalAmountTraded'
  | 'imageHash';

export type EpnsNotificationCounter = {
  id: Scalars['ID'];
  totalCount: Scalars['BigInt'];
};

export type EpnsNotificationCounter_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalCount?: InputMaybe<Scalars['BigInt']>;
  totalCount_not?: InputMaybe<Scalars['BigInt']>;
  totalCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EpnsNotificationCounter_filter>>>;
  or?: InputMaybe<Array<InputMaybe<EpnsNotificationCounter_filter>>>;
};

export type EpnsNotificationCounter_orderBy =
  | 'id'
  | 'totalCount';

export type EpnsPushNotification = {
  id: Scalars['ID'];
  notificationNumber: Scalars['BigInt'];
  recipient: Scalars['String'];
  notification: Scalars['String'];
};

export type EpnsPushNotification_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  notificationNumber?: InputMaybe<Scalars['BigInt']>;
  notificationNumber_not?: InputMaybe<Scalars['BigInt']>;
  notificationNumber_gt?: InputMaybe<Scalars['BigInt']>;
  notificationNumber_lt?: InputMaybe<Scalars['BigInt']>;
  notificationNumber_gte?: InputMaybe<Scalars['BigInt']>;
  notificationNumber_lte?: InputMaybe<Scalars['BigInt']>;
  notificationNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  notificationNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  recipient?: InputMaybe<Scalars['String']>;
  recipient_not?: InputMaybe<Scalars['String']>;
  recipient_gt?: InputMaybe<Scalars['String']>;
  recipient_lt?: InputMaybe<Scalars['String']>;
  recipient_gte?: InputMaybe<Scalars['String']>;
  recipient_lte?: InputMaybe<Scalars['String']>;
  recipient_in?: InputMaybe<Array<Scalars['String']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']>>;
  recipient_contains?: InputMaybe<Scalars['String']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']>;
  recipient_not_contains?: InputMaybe<Scalars['String']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']>;
  recipient_starts_with?: InputMaybe<Scalars['String']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  recipient_ends_with?: InputMaybe<Scalars['String']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  notification?: InputMaybe<Scalars['String']>;
  notification_not?: InputMaybe<Scalars['String']>;
  notification_gt?: InputMaybe<Scalars['String']>;
  notification_lt?: InputMaybe<Scalars['String']>;
  notification_gte?: InputMaybe<Scalars['String']>;
  notification_lte?: InputMaybe<Scalars['String']>;
  notification_in?: InputMaybe<Array<Scalars['String']>>;
  notification_not_in?: InputMaybe<Array<Scalars['String']>>;
  notification_contains?: InputMaybe<Scalars['String']>;
  notification_contains_nocase?: InputMaybe<Scalars['String']>;
  notification_not_contains?: InputMaybe<Scalars['String']>;
  notification_not_contains_nocase?: InputMaybe<Scalars['String']>;
  notification_starts_with?: InputMaybe<Scalars['String']>;
  notification_starts_with_nocase?: InputMaybe<Scalars['String']>;
  notification_not_starts_with?: InputMaybe<Scalars['String']>;
  notification_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  notification_ends_with?: InputMaybe<Scalars['String']>;
  notification_ends_with_nocase?: InputMaybe<Scalars['String']>;
  notification_not_ends_with?: InputMaybe<Scalars['String']>;
  notification_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EpnsPushNotification_filter>>>;
  or?: InputMaybe<Array<InputMaybe<EpnsPushNotification_filter>>>;
};

export type EpnsPushNotification_orderBy =
  | 'id'
  | 'notificationNumber'
  | 'recipient'
  | 'notification';

export type Event = {
  id: Scalars['ID'];
  /** Contract metadata */
  contract?: Maybe<Contract>;
  from?: Maybe<Account>;
  to?: Maybe<Account>;
  amount?: Maybe<Scalars['BigInt']>;
  /** Punk */
  nft?: Maybe<NFT>;
  type: EventType;
  logNumber: Scalars['BigInt'];
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type EventType =
  | 'ASSIGN'
  | 'TRANSFER'
  | 'ASK_CREATED'
  | 'ASK_REMOVED'
  | 'BID_CREATED'
  | 'BID_REMOVED'
  | 'SALE'
  | 'WRAP'
  | 'UNWRAP';

export type Event_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<Event_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Event_filter>>>;
};

export type Event_orderBy =
  | 'id'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'type'
  | 'logNumber'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type MetaData = {
  id: Scalars['ID'];
  tokenId: Scalars['BigInt'];
  /** URI of Punk */
  tokenURI: Scalars['String'];
  /** Punk image */
  image?: Maybe<Scalars['String']>;
  /** Punk Svg image */
  svg?: Maybe<Scalars['String']>;
  /** Contract URI */
  contractURI: Scalars['String'];
  /** Punk */
  punk: Punk;
  /** Punk Traits */
  traits: Array<Trait>;
};


export type MetaDatatraitsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trait_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Trait_filter>;
};

export type MetaData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenURI?: InputMaybe<Scalars['String']>;
  tokenURI_not?: InputMaybe<Scalars['String']>;
  tokenURI_gt?: InputMaybe<Scalars['String']>;
  tokenURI_lt?: InputMaybe<Scalars['String']>;
  tokenURI_gte?: InputMaybe<Scalars['String']>;
  tokenURI_lte?: InputMaybe<Scalars['String']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_contains?: InputMaybe<Scalars['String']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  svg?: InputMaybe<Scalars['String']>;
  svg_not?: InputMaybe<Scalars['String']>;
  svg_gt?: InputMaybe<Scalars['String']>;
  svg_lt?: InputMaybe<Scalars['String']>;
  svg_gte?: InputMaybe<Scalars['String']>;
  svg_lte?: InputMaybe<Scalars['String']>;
  svg_in?: InputMaybe<Array<Scalars['String']>>;
  svg_not_in?: InputMaybe<Array<Scalars['String']>>;
  svg_contains?: InputMaybe<Scalars['String']>;
  svg_contains_nocase?: InputMaybe<Scalars['String']>;
  svg_not_contains?: InputMaybe<Scalars['String']>;
  svg_not_contains_nocase?: InputMaybe<Scalars['String']>;
  svg_starts_with?: InputMaybe<Scalars['String']>;
  svg_starts_with_nocase?: InputMaybe<Scalars['String']>;
  svg_not_starts_with?: InputMaybe<Scalars['String']>;
  svg_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  svg_ends_with?: InputMaybe<Scalars['String']>;
  svg_ends_with_nocase?: InputMaybe<Scalars['String']>;
  svg_not_ends_with?: InputMaybe<Scalars['String']>;
  svg_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI?: InputMaybe<Scalars['String']>;
  contractURI_not?: InputMaybe<Scalars['String']>;
  contractURI_gt?: InputMaybe<Scalars['String']>;
  contractURI_lt?: InputMaybe<Scalars['String']>;
  contractURI_gte?: InputMaybe<Scalars['String']>;
  contractURI_lte?: InputMaybe<Scalars['String']>;
  contractURI_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_contains?: InputMaybe<Scalars['String']>;
  contractURI_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_contains?: InputMaybe<Scalars['String']>;
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  punk?: InputMaybe<Scalars['String']>;
  punk_not?: InputMaybe<Scalars['String']>;
  punk_gt?: InputMaybe<Scalars['String']>;
  punk_lt?: InputMaybe<Scalars['String']>;
  punk_gte?: InputMaybe<Scalars['String']>;
  punk_lte?: InputMaybe<Scalars['String']>;
  punk_in?: InputMaybe<Array<Scalars['String']>>;
  punk_not_in?: InputMaybe<Array<Scalars['String']>>;
  punk_contains?: InputMaybe<Scalars['String']>;
  punk_contains_nocase?: InputMaybe<Scalars['String']>;
  punk_not_contains?: InputMaybe<Scalars['String']>;
  punk_not_contains_nocase?: InputMaybe<Scalars['String']>;
  punk_starts_with?: InputMaybe<Scalars['String']>;
  punk_starts_with_nocase?: InputMaybe<Scalars['String']>;
  punk_not_starts_with?: InputMaybe<Scalars['String']>;
  punk_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  punk_ends_with?: InputMaybe<Scalars['String']>;
  punk_ends_with_nocase?: InputMaybe<Scalars['String']>;
  punk_not_ends_with?: InputMaybe<Scalars['String']>;
  punk_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  punk_?: InputMaybe<Punk_filter>;
  traits?: InputMaybe<Array<Scalars['String']>>;
  traits_not?: InputMaybe<Array<Scalars['String']>>;
  traits_contains?: InputMaybe<Array<Scalars['String']>>;
  traits_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  traits_not_contains?: InputMaybe<Array<Scalars['String']>>;
  traits_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  traits_?: InputMaybe<Trait_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MetaData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MetaData_filter>>>;
};

export type MetaData_orderBy =
  | 'id'
  | 'tokenId'
  | 'tokenURI'
  | 'image'
  | 'svg'
  | 'contractURI'
  | 'punk'
  | 'punk__id'
  | 'punk__tokenId'
  | 'punk__wrapped'
  | 'punk__numberOfTransfers'
  | 'punk__numberOfSales'
  | 'punk__totalAmountSpentOnPunk'
  | 'punk__averageSalePrice'
  | 'traits';

export type NFT = {
  id: Scalars['ID'];
  /** Contract metadata */
  contract?: Maybe<Contract>;
  numberOfTransfers: Scalars['BigInt'];
  numberOfSales: Scalars['BigInt'];
  /** Punk index */
  tokenId: Scalars['BigInt'];
  /** Punk owner */
  owner: Account;
  /** All events */
  events: Array<Event>;
  /** ID of current ask for Punk */
  currentAsk?: Maybe<Ask>;
  /** ID of current bid for Punk */
  currentBid?: Maybe<Bid>;
};


export type NFTeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Event_filter>;
};

export type NFT_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  numberOfTransfers?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_not?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfSales?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_not?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfSales_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  events_?: InputMaybe<Event_filter>;
  currentAsk?: InputMaybe<Scalars['String']>;
  currentAsk_not?: InputMaybe<Scalars['String']>;
  currentAsk_gt?: InputMaybe<Scalars['String']>;
  currentAsk_lt?: InputMaybe<Scalars['String']>;
  currentAsk_gte?: InputMaybe<Scalars['String']>;
  currentAsk_lte?: InputMaybe<Scalars['String']>;
  currentAsk_in?: InputMaybe<Array<Scalars['String']>>;
  currentAsk_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentAsk_contains?: InputMaybe<Scalars['String']>;
  currentAsk_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_not_contains?: InputMaybe<Scalars['String']>;
  currentAsk_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_starts_with?: InputMaybe<Scalars['String']>;
  currentAsk_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_not_starts_with?: InputMaybe<Scalars['String']>;
  currentAsk_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_ends_with?: InputMaybe<Scalars['String']>;
  currentAsk_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_not_ends_with?: InputMaybe<Scalars['String']>;
  currentAsk_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_?: InputMaybe<Ask_filter>;
  currentBid?: InputMaybe<Scalars['String']>;
  currentBid_not?: InputMaybe<Scalars['String']>;
  currentBid_gt?: InputMaybe<Scalars['String']>;
  currentBid_lt?: InputMaybe<Scalars['String']>;
  currentBid_gte?: InputMaybe<Scalars['String']>;
  currentBid_lte?: InputMaybe<Scalars['String']>;
  currentBid_in?: InputMaybe<Array<Scalars['String']>>;
  currentBid_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentBid_contains?: InputMaybe<Scalars['String']>;
  currentBid_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBid_not_contains?: InputMaybe<Scalars['String']>;
  currentBid_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBid_starts_with?: InputMaybe<Scalars['String']>;
  currentBid_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_not_starts_with?: InputMaybe<Scalars['String']>;
  currentBid_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_ends_with?: InputMaybe<Scalars['String']>;
  currentBid_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_not_ends_with?: InputMaybe<Scalars['String']>;
  currentBid_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_?: InputMaybe<Bid_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NFT_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NFT_filter>>>;
};

export type NFT_orderBy =
  | 'id'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'numberOfTransfers'
  | 'numberOfSales'
  | 'tokenId'
  | 'owner'
  | 'owner__id'
  | 'owner__numberOfPunksOwned'
  | 'owner__numberOfPunksAssigned'
  | 'owner__numberOfTransfers'
  | 'owner__numberOfSales'
  | 'owner__numberOfPurchases'
  | 'owner__totalSpent'
  | 'owner__totalEarned'
  | 'owner__averageAmountSpent'
  | 'owner__accountUrl'
  | 'events'
  | 'currentAsk'
  | 'currentAsk__id'
  | 'currentAsk__open'
  | 'currentAsk__amount'
  | 'currentAsk__offerType'
  | 'currentBid'
  | 'currentBid__id'
  | 'currentBid__open'
  | 'currentBid__amount'
  | 'currentBid__offerType';

export type Offer = {
  id: Scalars['ID'];
  /** Punk owner */
  from: Account;
  /** Open Status of Punk. Asks/Bids can be either Open or Closed */
  open: Scalars['Boolean'];
  /** Bid/Ask for Punk in ETH */
  amount: Scalars['BigInt'];
  /** Punk being offered/bidded */
  nft?: Maybe<NFT>;
  /** Created at. Could be ASK or BID */
  created?: Maybe<Event>;
  /** Removed at. Could be ASK or BID */
  removed?: Maybe<Event>;
  offerType: OfferType;
};

export type OfferType =
  | 'BID'
  | 'ASK';

export type Offer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  open?: InputMaybe<Scalars['Boolean']>;
  open_not?: InputMaybe<Scalars['Boolean']>;
  open_in?: InputMaybe<Array<Scalars['Boolean']>>;
  open_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  created?: InputMaybe<Scalars['String']>;
  created_not?: InputMaybe<Scalars['String']>;
  created_gt?: InputMaybe<Scalars['String']>;
  created_lt?: InputMaybe<Scalars['String']>;
  created_gte?: InputMaybe<Scalars['String']>;
  created_lte?: InputMaybe<Scalars['String']>;
  created_in?: InputMaybe<Array<Scalars['String']>>;
  created_not_in?: InputMaybe<Array<Scalars['String']>>;
  created_contains?: InputMaybe<Scalars['String']>;
  created_contains_nocase?: InputMaybe<Scalars['String']>;
  created_not_contains?: InputMaybe<Scalars['String']>;
  created_not_contains_nocase?: InputMaybe<Scalars['String']>;
  created_starts_with?: InputMaybe<Scalars['String']>;
  created_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_starts_with?: InputMaybe<Scalars['String']>;
  created_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  created_ends_with?: InputMaybe<Scalars['String']>;
  created_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_not_ends_with?: InputMaybe<Scalars['String']>;
  created_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  created_?: InputMaybe<Event_filter>;
  removed?: InputMaybe<Scalars['String']>;
  removed_not?: InputMaybe<Scalars['String']>;
  removed_gt?: InputMaybe<Scalars['String']>;
  removed_lt?: InputMaybe<Scalars['String']>;
  removed_gte?: InputMaybe<Scalars['String']>;
  removed_lte?: InputMaybe<Scalars['String']>;
  removed_in?: InputMaybe<Array<Scalars['String']>>;
  removed_not_in?: InputMaybe<Array<Scalars['String']>>;
  removed_contains?: InputMaybe<Scalars['String']>;
  removed_contains_nocase?: InputMaybe<Scalars['String']>;
  removed_not_contains?: InputMaybe<Scalars['String']>;
  removed_not_contains_nocase?: InputMaybe<Scalars['String']>;
  removed_starts_with?: InputMaybe<Scalars['String']>;
  removed_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removed_not_starts_with?: InputMaybe<Scalars['String']>;
  removed_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removed_ends_with?: InputMaybe<Scalars['String']>;
  removed_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removed_not_ends_with?: InputMaybe<Scalars['String']>;
  removed_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removed_?: InputMaybe<Event_filter>;
  offerType?: InputMaybe<OfferType>;
  offerType_not?: InputMaybe<OfferType>;
  offerType_in?: InputMaybe<Array<OfferType>>;
  offerType_not_in?: InputMaybe<Array<OfferType>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Offer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Offer_filter>>>;
};

export type Offer_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'open'
  | 'amount'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'created'
  | 'created__id'
  | 'created__amount'
  | 'created__type'
  | 'created__logNumber'
  | 'created__blockNumber'
  | 'created__blockHash'
  | 'created__txHash'
  | 'created__timestamp'
  | 'removed'
  | 'removed__id'
  | 'removed__amount'
  | 'removed__type'
  | 'removed__logNumber'
  | 'removed__blockNumber'
  | 'removed__blockHash'
  | 'removed__txHash'
  | 'removed__timestamp'
  | 'offerType';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Punk = NFT & {
  /** Punk ID */
  id: Scalars['ID'];
  /** Account that received Punk */
  transferedTo?: Maybe<Account>;
  /** Account that claimed Punk */
  assignedTo?: Maybe<Account>;
  /** Punk buyers */
  purchasedBy?: Maybe<Account>;
  /** Punk metadata */
  metadata?: Maybe<MetaData>;
  /** Contract data */
  contract?: Maybe<Contract>;
  /** Punk tokenId */
  tokenId: Scalars['BigInt'];
  /** Current owner of Punk */
  owner: Account;
  /** Wrap Status */
  wrapped: Scalars['Boolean'];
  /** All Punk events */
  events: Array<Event>;
  /** Current Ask for Punk */
  currentAsk?: Maybe<Ask>;
  /** Current Bid for Punk */
  currentBid?: Maybe<Bid>;
  /** Current AskCreated event */
  currentAskCreated?: Maybe<AskCreated>;
  /** Current BidCreated event */
  currentBidCreated?: Maybe<BidCreated>;
  /** Number of times Punk has been transferred */
  numberOfTransfers: Scalars['BigInt'];
  /** Number of times Punk was sold */
  numberOfSales: Scalars['BigInt'];
  /** Current AskRemoved event */
  currentAskRemoved?: Maybe<AskRemoved>;
  /** Current BidRemoved event */
  currentBidRemoved?: Maybe<BidRemoved>;
  /** Total amount spent purchasing Punk across OpenSea & Rarible marketplaces */
  totalAmountSpentOnPunk: Scalars['BigInt'];
  /** Average price for Punk across OpenSea & Rarible marketplaces */
  averageSalePrice: Scalars['BigInt'];
};


export type PunkeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Event_filter>;
};

export type Punk_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferedTo?: InputMaybe<Scalars['String']>;
  transferedTo_not?: InputMaybe<Scalars['String']>;
  transferedTo_gt?: InputMaybe<Scalars['String']>;
  transferedTo_lt?: InputMaybe<Scalars['String']>;
  transferedTo_gte?: InputMaybe<Scalars['String']>;
  transferedTo_lte?: InputMaybe<Scalars['String']>;
  transferedTo_in?: InputMaybe<Array<Scalars['String']>>;
  transferedTo_not_in?: InputMaybe<Array<Scalars['String']>>;
  transferedTo_contains?: InputMaybe<Scalars['String']>;
  transferedTo_contains_nocase?: InputMaybe<Scalars['String']>;
  transferedTo_not_contains?: InputMaybe<Scalars['String']>;
  transferedTo_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transferedTo_starts_with?: InputMaybe<Scalars['String']>;
  transferedTo_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transferedTo_not_starts_with?: InputMaybe<Scalars['String']>;
  transferedTo_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transferedTo_ends_with?: InputMaybe<Scalars['String']>;
  transferedTo_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transferedTo_not_ends_with?: InputMaybe<Scalars['String']>;
  transferedTo_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transferedTo_?: InputMaybe<Account_filter>;
  assignedTo?: InputMaybe<Scalars['String']>;
  assignedTo_not?: InputMaybe<Scalars['String']>;
  assignedTo_gt?: InputMaybe<Scalars['String']>;
  assignedTo_lt?: InputMaybe<Scalars['String']>;
  assignedTo_gte?: InputMaybe<Scalars['String']>;
  assignedTo_lte?: InputMaybe<Scalars['String']>;
  assignedTo_in?: InputMaybe<Array<Scalars['String']>>;
  assignedTo_not_in?: InputMaybe<Array<Scalars['String']>>;
  assignedTo_contains?: InputMaybe<Scalars['String']>;
  assignedTo_contains_nocase?: InputMaybe<Scalars['String']>;
  assignedTo_not_contains?: InputMaybe<Scalars['String']>;
  assignedTo_not_contains_nocase?: InputMaybe<Scalars['String']>;
  assignedTo_starts_with?: InputMaybe<Scalars['String']>;
  assignedTo_starts_with_nocase?: InputMaybe<Scalars['String']>;
  assignedTo_not_starts_with?: InputMaybe<Scalars['String']>;
  assignedTo_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  assignedTo_ends_with?: InputMaybe<Scalars['String']>;
  assignedTo_ends_with_nocase?: InputMaybe<Scalars['String']>;
  assignedTo_not_ends_with?: InputMaybe<Scalars['String']>;
  assignedTo_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  assignedTo_?: InputMaybe<Account_filter>;
  purchasedBy?: InputMaybe<Scalars['String']>;
  purchasedBy_not?: InputMaybe<Scalars['String']>;
  purchasedBy_gt?: InputMaybe<Scalars['String']>;
  purchasedBy_lt?: InputMaybe<Scalars['String']>;
  purchasedBy_gte?: InputMaybe<Scalars['String']>;
  purchasedBy_lte?: InputMaybe<Scalars['String']>;
  purchasedBy_in?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_not_in?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_contains?: InputMaybe<Scalars['String']>;
  purchasedBy_contains_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_not_contains?: InputMaybe<Scalars['String']>;
  purchasedBy_not_contains_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_starts_with?: InputMaybe<Scalars['String']>;
  purchasedBy_starts_with_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_not_starts_with?: InputMaybe<Scalars['String']>;
  purchasedBy_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_ends_with?: InputMaybe<Scalars['String']>;
  purchasedBy_ends_with_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_not_ends_with?: InputMaybe<Scalars['String']>;
  purchasedBy_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_?: InputMaybe<Account_filter>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_?: InputMaybe<MetaData_filter>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  wrapped?: InputMaybe<Scalars['Boolean']>;
  wrapped_not?: InputMaybe<Scalars['Boolean']>;
  wrapped_in?: InputMaybe<Array<Scalars['Boolean']>>;
  wrapped_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  events_?: InputMaybe<Event_filter>;
  currentAsk?: InputMaybe<Scalars['String']>;
  currentAsk_not?: InputMaybe<Scalars['String']>;
  currentAsk_gt?: InputMaybe<Scalars['String']>;
  currentAsk_lt?: InputMaybe<Scalars['String']>;
  currentAsk_gte?: InputMaybe<Scalars['String']>;
  currentAsk_lte?: InputMaybe<Scalars['String']>;
  currentAsk_in?: InputMaybe<Array<Scalars['String']>>;
  currentAsk_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentAsk_contains?: InputMaybe<Scalars['String']>;
  currentAsk_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_not_contains?: InputMaybe<Scalars['String']>;
  currentAsk_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_starts_with?: InputMaybe<Scalars['String']>;
  currentAsk_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_not_starts_with?: InputMaybe<Scalars['String']>;
  currentAsk_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_ends_with?: InputMaybe<Scalars['String']>;
  currentAsk_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_not_ends_with?: InputMaybe<Scalars['String']>;
  currentAsk_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAsk_?: InputMaybe<Ask_filter>;
  currentBid?: InputMaybe<Scalars['String']>;
  currentBid_not?: InputMaybe<Scalars['String']>;
  currentBid_gt?: InputMaybe<Scalars['String']>;
  currentBid_lt?: InputMaybe<Scalars['String']>;
  currentBid_gte?: InputMaybe<Scalars['String']>;
  currentBid_lte?: InputMaybe<Scalars['String']>;
  currentBid_in?: InputMaybe<Array<Scalars['String']>>;
  currentBid_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentBid_contains?: InputMaybe<Scalars['String']>;
  currentBid_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBid_not_contains?: InputMaybe<Scalars['String']>;
  currentBid_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBid_starts_with?: InputMaybe<Scalars['String']>;
  currentBid_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_not_starts_with?: InputMaybe<Scalars['String']>;
  currentBid_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_ends_with?: InputMaybe<Scalars['String']>;
  currentBid_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_not_ends_with?: InputMaybe<Scalars['String']>;
  currentBid_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBid_?: InputMaybe<Bid_filter>;
  currentAskCreated?: InputMaybe<Scalars['String']>;
  currentAskCreated_not?: InputMaybe<Scalars['String']>;
  currentAskCreated_gt?: InputMaybe<Scalars['String']>;
  currentAskCreated_lt?: InputMaybe<Scalars['String']>;
  currentAskCreated_gte?: InputMaybe<Scalars['String']>;
  currentAskCreated_lte?: InputMaybe<Scalars['String']>;
  currentAskCreated_in?: InputMaybe<Array<Scalars['String']>>;
  currentAskCreated_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentAskCreated_contains?: InputMaybe<Scalars['String']>;
  currentAskCreated_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAskCreated_not_contains?: InputMaybe<Scalars['String']>;
  currentAskCreated_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAskCreated_starts_with?: InputMaybe<Scalars['String']>;
  currentAskCreated_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskCreated_not_starts_with?: InputMaybe<Scalars['String']>;
  currentAskCreated_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskCreated_ends_with?: InputMaybe<Scalars['String']>;
  currentAskCreated_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskCreated_not_ends_with?: InputMaybe<Scalars['String']>;
  currentAskCreated_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskCreated_?: InputMaybe<AskCreated_filter>;
  currentBidCreated?: InputMaybe<Scalars['String']>;
  currentBidCreated_not?: InputMaybe<Scalars['String']>;
  currentBidCreated_gt?: InputMaybe<Scalars['String']>;
  currentBidCreated_lt?: InputMaybe<Scalars['String']>;
  currentBidCreated_gte?: InputMaybe<Scalars['String']>;
  currentBidCreated_lte?: InputMaybe<Scalars['String']>;
  currentBidCreated_in?: InputMaybe<Array<Scalars['String']>>;
  currentBidCreated_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentBidCreated_contains?: InputMaybe<Scalars['String']>;
  currentBidCreated_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBidCreated_not_contains?: InputMaybe<Scalars['String']>;
  currentBidCreated_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBidCreated_starts_with?: InputMaybe<Scalars['String']>;
  currentBidCreated_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidCreated_not_starts_with?: InputMaybe<Scalars['String']>;
  currentBidCreated_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidCreated_ends_with?: InputMaybe<Scalars['String']>;
  currentBidCreated_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidCreated_not_ends_with?: InputMaybe<Scalars['String']>;
  currentBidCreated_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidCreated_?: InputMaybe<BidCreated_filter>;
  numberOfTransfers?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_not?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfSales?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_not?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfSales_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfSales_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentAskRemoved?: InputMaybe<Scalars['String']>;
  currentAskRemoved_not?: InputMaybe<Scalars['String']>;
  currentAskRemoved_gt?: InputMaybe<Scalars['String']>;
  currentAskRemoved_lt?: InputMaybe<Scalars['String']>;
  currentAskRemoved_gte?: InputMaybe<Scalars['String']>;
  currentAskRemoved_lte?: InputMaybe<Scalars['String']>;
  currentAskRemoved_in?: InputMaybe<Array<Scalars['String']>>;
  currentAskRemoved_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentAskRemoved_contains?: InputMaybe<Scalars['String']>;
  currentAskRemoved_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAskRemoved_not_contains?: InputMaybe<Scalars['String']>;
  currentAskRemoved_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentAskRemoved_starts_with?: InputMaybe<Scalars['String']>;
  currentAskRemoved_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskRemoved_not_starts_with?: InputMaybe<Scalars['String']>;
  currentAskRemoved_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskRemoved_ends_with?: InputMaybe<Scalars['String']>;
  currentAskRemoved_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskRemoved_not_ends_with?: InputMaybe<Scalars['String']>;
  currentAskRemoved_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentAskRemoved_?: InputMaybe<AskRemoved_filter>;
  currentBidRemoved?: InputMaybe<Scalars['String']>;
  currentBidRemoved_not?: InputMaybe<Scalars['String']>;
  currentBidRemoved_gt?: InputMaybe<Scalars['String']>;
  currentBidRemoved_lt?: InputMaybe<Scalars['String']>;
  currentBidRemoved_gte?: InputMaybe<Scalars['String']>;
  currentBidRemoved_lte?: InputMaybe<Scalars['String']>;
  currentBidRemoved_in?: InputMaybe<Array<Scalars['String']>>;
  currentBidRemoved_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentBidRemoved_contains?: InputMaybe<Scalars['String']>;
  currentBidRemoved_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBidRemoved_not_contains?: InputMaybe<Scalars['String']>;
  currentBidRemoved_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentBidRemoved_starts_with?: InputMaybe<Scalars['String']>;
  currentBidRemoved_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidRemoved_not_starts_with?: InputMaybe<Scalars['String']>;
  currentBidRemoved_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidRemoved_ends_with?: InputMaybe<Scalars['String']>;
  currentBidRemoved_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidRemoved_not_ends_with?: InputMaybe<Scalars['String']>;
  currentBidRemoved_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentBidRemoved_?: InputMaybe<BidRemoved_filter>;
  totalAmountSpentOnPunk?: InputMaybe<Scalars['BigInt']>;
  totalAmountSpentOnPunk_not?: InputMaybe<Scalars['BigInt']>;
  totalAmountSpentOnPunk_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmountSpentOnPunk_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmountSpentOnPunk_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmountSpentOnPunk_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmountSpentOnPunk_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountSpentOnPunk_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averageSalePrice?: InputMaybe<Scalars['BigInt']>;
  averageSalePrice_not?: InputMaybe<Scalars['BigInt']>;
  averageSalePrice_gt?: InputMaybe<Scalars['BigInt']>;
  averageSalePrice_lt?: InputMaybe<Scalars['BigInt']>;
  averageSalePrice_gte?: InputMaybe<Scalars['BigInt']>;
  averageSalePrice_lte?: InputMaybe<Scalars['BigInt']>;
  averageSalePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averageSalePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Punk_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Punk_filter>>>;
};

export type Punk_orderBy =
  | 'id'
  | 'transferedTo'
  | 'transferedTo__id'
  | 'transferedTo__numberOfPunksOwned'
  | 'transferedTo__numberOfPunksAssigned'
  | 'transferedTo__numberOfTransfers'
  | 'transferedTo__numberOfSales'
  | 'transferedTo__numberOfPurchases'
  | 'transferedTo__totalSpent'
  | 'transferedTo__totalEarned'
  | 'transferedTo__averageAmountSpent'
  | 'transferedTo__accountUrl'
  | 'assignedTo'
  | 'assignedTo__id'
  | 'assignedTo__numberOfPunksOwned'
  | 'assignedTo__numberOfPunksAssigned'
  | 'assignedTo__numberOfTransfers'
  | 'assignedTo__numberOfSales'
  | 'assignedTo__numberOfPurchases'
  | 'assignedTo__totalSpent'
  | 'assignedTo__totalEarned'
  | 'assignedTo__averageAmountSpent'
  | 'assignedTo__accountUrl'
  | 'purchasedBy'
  | 'purchasedBy__id'
  | 'purchasedBy__numberOfPunksOwned'
  | 'purchasedBy__numberOfPunksAssigned'
  | 'purchasedBy__numberOfTransfers'
  | 'purchasedBy__numberOfSales'
  | 'purchasedBy__numberOfPurchases'
  | 'purchasedBy__totalSpent'
  | 'purchasedBy__totalEarned'
  | 'purchasedBy__averageAmountSpent'
  | 'purchasedBy__accountUrl'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__tokenId'
  | 'metadata__tokenURI'
  | 'metadata__image'
  | 'metadata__svg'
  | 'metadata__contractURI'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'tokenId'
  | 'owner'
  | 'owner__id'
  | 'owner__numberOfPunksOwned'
  | 'owner__numberOfPunksAssigned'
  | 'owner__numberOfTransfers'
  | 'owner__numberOfSales'
  | 'owner__numberOfPurchases'
  | 'owner__totalSpent'
  | 'owner__totalEarned'
  | 'owner__averageAmountSpent'
  | 'owner__accountUrl'
  | 'wrapped'
  | 'events'
  | 'currentAsk'
  | 'currentAsk__id'
  | 'currentAsk__open'
  | 'currentAsk__amount'
  | 'currentAsk__offerType'
  | 'currentBid'
  | 'currentBid__id'
  | 'currentBid__open'
  | 'currentBid__amount'
  | 'currentBid__offerType'
  | 'currentAskCreated'
  | 'currentAskCreated__id'
  | 'currentAskCreated__amount'
  | 'currentAskCreated__logNumber'
  | 'currentAskCreated__type'
  | 'currentAskCreated__blockNumber'
  | 'currentAskCreated__blockHash'
  | 'currentAskCreated__txHash'
  | 'currentAskCreated__timestamp'
  | 'currentBidCreated'
  | 'currentBidCreated__id'
  | 'currentBidCreated__amount'
  | 'currentBidCreated__logNumber'
  | 'currentBidCreated__type'
  | 'currentBidCreated__blockNumber'
  | 'currentBidCreated__blockHash'
  | 'currentBidCreated__txHash'
  | 'currentBidCreated__timestamp'
  | 'numberOfTransfers'
  | 'numberOfSales'
  | 'currentAskRemoved'
  | 'currentAskRemoved__id'
  | 'currentAskRemoved__amount'
  | 'currentAskRemoved__logNumber'
  | 'currentAskRemoved__type'
  | 'currentAskRemoved__blockNumber'
  | 'currentAskRemoved__blockHash'
  | 'currentAskRemoved__txHash'
  | 'currentAskRemoved__timestamp'
  | 'currentBidRemoved'
  | 'currentBidRemoved__id'
  | 'currentBidRemoved__amount'
  | 'currentBidRemoved__logNumber'
  | 'currentBidRemoved__type'
  | 'currentBidRemoved__blockNumber'
  | 'currentBidRemoved__blockHash'
  | 'currentBidRemoved__txHash'
  | 'currentBidRemoved__timestamp'
  | 'totalAmountSpentOnPunk'
  | 'averageSalePrice';

export type Query = {
  account?: Maybe<Account>;
  accounts: Array<Account>;
  punk?: Maybe<Punk>;
  punks: Array<Punk>;
  metaData?: Maybe<MetaData>;
  metaDatas: Array<MetaData>;
  trait?: Maybe<Trait>;
  traits: Array<Trait>;
  ask?: Maybe<Ask>;
  asks: Array<Ask>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  assign?: Maybe<Assign>;
  assigns: Array<Assign>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  askCreated?: Maybe<AskCreated>;
  askCreateds: Array<AskCreated>;
  bidCreated?: Maybe<BidCreated>;
  bidCreateds: Array<BidCreated>;
  bidRemoved?: Maybe<BidRemoved>;
  bidRemoveds: Array<BidRemoved>;
  askRemoved?: Maybe<AskRemoved>;
  askRemoveds: Array<AskRemoved>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  ctoken?: Maybe<CToken>;
  ctokens: Array<CToken>;
  wrap?: Maybe<Wrap>;
  wraps: Array<Wrap>;
  unwrap?: Maybe<Unwrap>;
  unwraps: Array<Unwrap>;
  userProxy?: Maybe<UserProxy>;
  userProxies: Array<UserProxy>;
  epnsNotificationCounter?: Maybe<EpnsNotificationCounter>;
  epnsNotificationCounters: Array<EpnsNotificationCounter>;
  epnsPushNotification?: Maybe<EpnsPushNotification>;
  epnsPushNotifications: Array<EpnsPushNotification>;
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  event?: Maybe<Event>;
  events: Array<Event>;
  offer?: Maybe<Offer>;
  offers: Array<Offer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypunkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypunksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Punk_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Punk_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymetaDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymetaDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetaData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MetaData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytraitArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytraitsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trait_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Trait_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaskArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryasksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ask_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Ask_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Contract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryassignArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryassignsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Assign_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Assign_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaskCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaskCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AskCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AskCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BidCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidRemovedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BidRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaskRemovedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaskRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AskRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AskRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryctokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryctokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CToken_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CToken_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywrapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywrapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wrap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Wrap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunwrapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunwrapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Unwrap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unwrap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserProxyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserProxiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProxy_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserProxy_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepnsNotificationCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepnsNotificationCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpnsNotificationCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EpnsNotificationCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepnsPushNotificationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepnsPushNotificationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpnsPushNotification_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EpnsPushNotification_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryeventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Event_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryofferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Sale = Event & {
  id: Scalars['ID'];
  /** Punk buyer */
  to?: Maybe<Account>;
  /** Amount in ETH */
  amount?: Maybe<Scalars['BigInt']>;
  /** Punk seller */
  from?: Maybe<Account>;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk being sold */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type Sale_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<Sale_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Sale_filter>>>;
};

export type Sale_orderBy =
  | 'id'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type Subscription = {
  account?: Maybe<Account>;
  accounts: Array<Account>;
  punk?: Maybe<Punk>;
  punks: Array<Punk>;
  metaData?: Maybe<MetaData>;
  metaDatas: Array<MetaData>;
  trait?: Maybe<Trait>;
  traits: Array<Trait>;
  ask?: Maybe<Ask>;
  asks: Array<Ask>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  assign?: Maybe<Assign>;
  assigns: Array<Assign>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  askCreated?: Maybe<AskCreated>;
  askCreateds: Array<AskCreated>;
  bidCreated?: Maybe<BidCreated>;
  bidCreateds: Array<BidCreated>;
  bidRemoved?: Maybe<BidRemoved>;
  bidRemoveds: Array<BidRemoved>;
  askRemoved?: Maybe<AskRemoved>;
  askRemoveds: Array<AskRemoved>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  ctoken?: Maybe<CToken>;
  ctokens: Array<CToken>;
  wrap?: Maybe<Wrap>;
  wraps: Array<Wrap>;
  unwrap?: Maybe<Unwrap>;
  unwraps: Array<Unwrap>;
  userProxy?: Maybe<UserProxy>;
  userProxies: Array<UserProxy>;
  epnsNotificationCounter?: Maybe<EpnsNotificationCounter>;
  epnsNotificationCounters: Array<EpnsNotificationCounter>;
  epnsPushNotification?: Maybe<EpnsPushNotification>;
  epnsPushNotifications: Array<EpnsPushNotification>;
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  event?: Maybe<Event>;
  events: Array<Event>;
  offer?: Maybe<Offer>;
  offers: Array<Offer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpunkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpunksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Punk_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Punk_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmetaDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmetaDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetaData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MetaData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontraitArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontraitsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trait_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Trait_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaskArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionasksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ask_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Ask_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncontractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncontractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Contract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionassignArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionassignsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Assign_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Assign_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaskCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaskCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AskCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AskCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BidCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidRemovedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BidRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaskRemovedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaskRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AskRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AskRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionctokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionctokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CToken_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CToken_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwrapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwrapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wrap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Wrap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunwrapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunwrapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Unwrap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unwrap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserProxyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserProxiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProxy_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserProxy_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepnsNotificationCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepnsNotificationCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpnsNotificationCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EpnsNotificationCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepnsPushNotificationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepnsPushNotificationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpnsPushNotification_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EpnsPushNotification_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioneventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioneventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Event_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionofferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Trait = {
  /** Trait */
  id: Scalars['ID'];
  type: TraitType;
  metaDatas: Array<MetaData>;
  /** Number of Punks with this trait */
  numberOfNfts: Scalars['BigInt'];
};


export type TraitmetaDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetaData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MetaData_filter>;
};

export type TraitType =
  | 'TYPE'
  | 'ACCESSORY';

export type Trait_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<TraitType>;
  type_not?: InputMaybe<TraitType>;
  type_in?: InputMaybe<Array<TraitType>>;
  type_not_in?: InputMaybe<Array<TraitType>>;
  metaDatas_?: InputMaybe<MetaData_filter>;
  numberOfNfts?: InputMaybe<Scalars['BigInt']>;
  numberOfNfts_not?: InputMaybe<Scalars['BigInt']>;
  numberOfNfts_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfNfts_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfNfts_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfNfts_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfNfts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfNfts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Trait_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Trait_filter>>>;
};

export type Trait_orderBy =
  | 'id'
  | 'type'
  | 'metaDatas'
  | 'numberOfNfts';

export type Transfer = Event & {
  id: Scalars['ID'];
  /** Sender */
  from?: Maybe<Account>;
  /** Receiver */
  to?: Maybe<Account>;
  amount?: Maybe<Scalars['BigInt']>;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk being transferred */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
};

export type Transfer_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type Unwrap = Event & {
  id: Scalars['ID'];
  /** Account that unwrapped Punk */
  from?: Maybe<Account>;
  to?: Maybe<Account>;
  amount?: Maybe<Scalars['BigInt']>;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk being unwrapped */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type Unwrap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<Unwrap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Unwrap_filter>>>;
};

export type Unwrap_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type UserProxy = {
  /** Contract Address of UserProxy */
  id: Scalars['ID'];
  /** Account that owns the Proxy */
  user: Account;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type UserProxy_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<Account_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<UserProxy_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UserProxy_filter>>>;
};

export type UserProxy_orderBy =
  | 'id'
  | 'user'
  | 'user__id'
  | 'user__numberOfPunksOwned'
  | 'user__numberOfPunksAssigned'
  | 'user__numberOfTransfers'
  | 'user__numberOfSales'
  | 'user__numberOfPurchases'
  | 'user__totalSpent'
  | 'user__totalEarned'
  | 'user__averageAmountSpent'
  | 'user__accountUrl'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

export type Wrap = Event & {
  id: Scalars['ID'];
  /** Account that wrapped Punk */
  from?: Maybe<Account>;
  to?: Maybe<Account>;
  amount?: Maybe<Scalars['BigInt']>;
  /** Contract metadata */
  contract?: Maybe<Contract>;
  /** Punk being wrapped */
  nft?: Maybe<NFT>;
  logNumber: Scalars['BigInt'];
  type: EventType;
  /** Transaction details */
  blockNumber: Scalars['BigInt'];
  blockHash: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type Wrap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Account_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Account_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  logNumber?: InputMaybe<Scalars['BigInt']>;
  logNumber_not?: InputMaybe<Scalars['BigInt']>;
  logNumber_gt?: InputMaybe<Scalars['BigInt']>;
  logNumber_lt?: InputMaybe<Scalars['BigInt']>;
  logNumber_gte?: InputMaybe<Scalars['BigInt']>;
  logNumber_lte?: InputMaybe<Scalars['BigInt']>;
  logNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<EventType>;
  type_not?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not_in?: InputMaybe<Array<EventType>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<Wrap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Wrap_filter>>>;
};

export type Wrap_orderBy =
  | 'id'
  | 'from'
  | 'from__id'
  | 'from__numberOfPunksOwned'
  | 'from__numberOfPunksAssigned'
  | 'from__numberOfTransfers'
  | 'from__numberOfSales'
  | 'from__numberOfPurchases'
  | 'from__totalSpent'
  | 'from__totalEarned'
  | 'from__averageAmountSpent'
  | 'from__accountUrl'
  | 'to'
  | 'to__id'
  | 'to__numberOfPunksOwned'
  | 'to__numberOfPunksAssigned'
  | 'to__numberOfTransfers'
  | 'to__numberOfSales'
  | 'to__numberOfPurchases'
  | 'to__totalSpent'
  | 'to__totalEarned'
  | 'to__averageAmountSpent'
  | 'to__accountUrl'
  | 'amount'
  | 'contract'
  | 'contract__id'
  | 'contract__symbol'
  | 'contract__name'
  | 'contract__totalSupply'
  | 'contract__totalSales'
  | 'contract__totalAmountTraded'
  | 'contract__imageHash'
  | 'nft'
  | 'nft__id'
  | 'nft__numberOfTransfers'
  | 'nft__numberOfSales'
  | 'nft__tokenId'
  | 'logNumber'
  | 'type'
  | 'blockNumber'
  | 'blockHash'
  | 'txHash'
  | 'timestamp';

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
  account: InContextSdkMethod<Query['account'], QueryaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Query['accounts'], QueryaccountsArgs, MeshContext>,
  /** null **/
  punk: InContextSdkMethod<Query['punk'], QuerypunkArgs, MeshContext>,
  /** null **/
  punks: InContextSdkMethod<Query['punks'], QuerypunksArgs, MeshContext>,
  /** null **/
  metaData: InContextSdkMethod<Query['metaData'], QuerymetaDataArgs, MeshContext>,
  /** null **/
  metaDatas: InContextSdkMethod<Query['metaDatas'], QuerymetaDatasArgs, MeshContext>,
  /** null **/
  trait: InContextSdkMethod<Query['trait'], QuerytraitArgs, MeshContext>,
  /** null **/
  traits: InContextSdkMethod<Query['traits'], QuerytraitsArgs, MeshContext>,
  /** null **/
  ask: InContextSdkMethod<Query['ask'], QueryaskArgs, MeshContext>,
  /** null **/
  asks: InContextSdkMethod<Query['asks'], QueryasksArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Query['bid'], QuerybidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Query['bids'], QuerybidsArgs, MeshContext>,
  /** null **/
  contract: InContextSdkMethod<Query['contract'], QuerycontractArgs, MeshContext>,
  /** null **/
  contracts: InContextSdkMethod<Query['contracts'], QuerycontractsArgs, MeshContext>,
  /** null **/
  assign: InContextSdkMethod<Query['assign'], QueryassignArgs, MeshContext>,
  /** null **/
  assigns: InContextSdkMethod<Query['assigns'], QueryassignsArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Query['sale'], QuerysaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Query['sales'], QuerysalesArgs, MeshContext>,
  /** null **/
  askCreated: InContextSdkMethod<Query['askCreated'], QueryaskCreatedArgs, MeshContext>,
  /** null **/
  askCreateds: InContextSdkMethod<Query['askCreateds'], QueryaskCreatedsArgs, MeshContext>,
  /** null **/
  bidCreated: InContextSdkMethod<Query['bidCreated'], QuerybidCreatedArgs, MeshContext>,
  /** null **/
  bidCreateds: InContextSdkMethod<Query['bidCreateds'], QuerybidCreatedsArgs, MeshContext>,
  /** null **/
  bidRemoved: InContextSdkMethod<Query['bidRemoved'], QuerybidRemovedArgs, MeshContext>,
  /** null **/
  bidRemoveds: InContextSdkMethod<Query['bidRemoveds'], QuerybidRemovedsArgs, MeshContext>,
  /** null **/
  askRemoved: InContextSdkMethod<Query['askRemoved'], QueryaskRemovedArgs, MeshContext>,
  /** null **/
  askRemoveds: InContextSdkMethod<Query['askRemoveds'], QueryaskRemovedsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Query['transfer'], QuerytransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Query['transfers'], QuerytransfersArgs, MeshContext>,
  /** null **/
  ctoken: InContextSdkMethod<Query['ctoken'], QueryctokenArgs, MeshContext>,
  /** null **/
  ctokens: InContextSdkMethod<Query['ctokens'], QueryctokensArgs, MeshContext>,
  /** null **/
  wrap: InContextSdkMethod<Query['wrap'], QuerywrapArgs, MeshContext>,
  /** null **/
  wraps: InContextSdkMethod<Query['wraps'], QuerywrapsArgs, MeshContext>,
  /** null **/
  unwrap: InContextSdkMethod<Query['unwrap'], QueryunwrapArgs, MeshContext>,
  /** null **/
  unwraps: InContextSdkMethod<Query['unwraps'], QueryunwrapsArgs, MeshContext>,
  /** null **/
  userProxy: InContextSdkMethod<Query['userProxy'], QueryuserProxyArgs, MeshContext>,
  /** null **/
  userProxies: InContextSdkMethod<Query['userProxies'], QueryuserProxiesArgs, MeshContext>,
  /** null **/
  epnsNotificationCounter: InContextSdkMethod<Query['epnsNotificationCounter'], QueryepnsNotificationCounterArgs, MeshContext>,
  /** null **/
  epnsNotificationCounters: InContextSdkMethod<Query['epnsNotificationCounters'], QueryepnsNotificationCountersArgs, MeshContext>,
  /** null **/
  epnsPushNotification: InContextSdkMethod<Query['epnsPushNotification'], QueryepnsPushNotificationArgs, MeshContext>,
  /** null **/
  epnsPushNotifications: InContextSdkMethod<Query['epnsPushNotifications'], QueryepnsPushNotificationsArgs, MeshContext>,
  /** null **/
  nft: InContextSdkMethod<Query['nft'], QuerynftArgs, MeshContext>,
  /** null **/
  nfts: InContextSdkMethod<Query['nfts'], QuerynftsArgs, MeshContext>,
  /** null **/
  event: InContextSdkMethod<Query['event'], QueryeventArgs, MeshContext>,
  /** null **/
  events: InContextSdkMethod<Query['events'], QueryeventsArgs, MeshContext>,
  /** null **/
  offer: InContextSdkMethod<Query['offer'], QueryofferArgs, MeshContext>,
  /** null **/
  offers: InContextSdkMethod<Query['offers'], QueryoffersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  account: InContextSdkMethod<Subscription['account'], SubscriptionaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Subscription['accounts'], SubscriptionaccountsArgs, MeshContext>,
  /** null **/
  punk: InContextSdkMethod<Subscription['punk'], SubscriptionpunkArgs, MeshContext>,
  /** null **/
  punks: InContextSdkMethod<Subscription['punks'], SubscriptionpunksArgs, MeshContext>,
  /** null **/
  metaData: InContextSdkMethod<Subscription['metaData'], SubscriptionmetaDataArgs, MeshContext>,
  /** null **/
  metaDatas: InContextSdkMethod<Subscription['metaDatas'], SubscriptionmetaDatasArgs, MeshContext>,
  /** null **/
  trait: InContextSdkMethod<Subscription['trait'], SubscriptiontraitArgs, MeshContext>,
  /** null **/
  traits: InContextSdkMethod<Subscription['traits'], SubscriptiontraitsArgs, MeshContext>,
  /** null **/
  ask: InContextSdkMethod<Subscription['ask'], SubscriptionaskArgs, MeshContext>,
  /** null **/
  asks: InContextSdkMethod<Subscription['asks'], SubscriptionasksArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Subscription['bid'], SubscriptionbidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Subscription['bids'], SubscriptionbidsArgs, MeshContext>,
  /** null **/
  contract: InContextSdkMethod<Subscription['contract'], SubscriptioncontractArgs, MeshContext>,
  /** null **/
  contracts: InContextSdkMethod<Subscription['contracts'], SubscriptioncontractsArgs, MeshContext>,
  /** null **/
  assign: InContextSdkMethod<Subscription['assign'], SubscriptionassignArgs, MeshContext>,
  /** null **/
  assigns: InContextSdkMethod<Subscription['assigns'], SubscriptionassignsArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Subscription['sale'], SubscriptionsaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Subscription['sales'], SubscriptionsalesArgs, MeshContext>,
  /** null **/
  askCreated: InContextSdkMethod<Subscription['askCreated'], SubscriptionaskCreatedArgs, MeshContext>,
  /** null **/
  askCreateds: InContextSdkMethod<Subscription['askCreateds'], SubscriptionaskCreatedsArgs, MeshContext>,
  /** null **/
  bidCreated: InContextSdkMethod<Subscription['bidCreated'], SubscriptionbidCreatedArgs, MeshContext>,
  /** null **/
  bidCreateds: InContextSdkMethod<Subscription['bidCreateds'], SubscriptionbidCreatedsArgs, MeshContext>,
  /** null **/
  bidRemoved: InContextSdkMethod<Subscription['bidRemoved'], SubscriptionbidRemovedArgs, MeshContext>,
  /** null **/
  bidRemoveds: InContextSdkMethod<Subscription['bidRemoveds'], SubscriptionbidRemovedsArgs, MeshContext>,
  /** null **/
  askRemoved: InContextSdkMethod<Subscription['askRemoved'], SubscriptionaskRemovedArgs, MeshContext>,
  /** null **/
  askRemoveds: InContextSdkMethod<Subscription['askRemoveds'], SubscriptionaskRemovedsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Subscription['transfer'], SubscriptiontransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Subscription['transfers'], SubscriptiontransfersArgs, MeshContext>,
  /** null **/
  ctoken: InContextSdkMethod<Subscription['ctoken'], SubscriptionctokenArgs, MeshContext>,
  /** null **/
  ctokens: InContextSdkMethod<Subscription['ctokens'], SubscriptionctokensArgs, MeshContext>,
  /** null **/
  wrap: InContextSdkMethod<Subscription['wrap'], SubscriptionwrapArgs, MeshContext>,
  /** null **/
  wraps: InContextSdkMethod<Subscription['wraps'], SubscriptionwrapsArgs, MeshContext>,
  /** null **/
  unwrap: InContextSdkMethod<Subscription['unwrap'], SubscriptionunwrapArgs, MeshContext>,
  /** null **/
  unwraps: InContextSdkMethod<Subscription['unwraps'], SubscriptionunwrapsArgs, MeshContext>,
  /** null **/
  userProxy: InContextSdkMethod<Subscription['userProxy'], SubscriptionuserProxyArgs, MeshContext>,
  /** null **/
  userProxies: InContextSdkMethod<Subscription['userProxies'], SubscriptionuserProxiesArgs, MeshContext>,
  /** null **/
  epnsNotificationCounter: InContextSdkMethod<Subscription['epnsNotificationCounter'], SubscriptionepnsNotificationCounterArgs, MeshContext>,
  /** null **/
  epnsNotificationCounters: InContextSdkMethod<Subscription['epnsNotificationCounters'], SubscriptionepnsNotificationCountersArgs, MeshContext>,
  /** null **/
  epnsPushNotification: InContextSdkMethod<Subscription['epnsPushNotification'], SubscriptionepnsPushNotificationArgs, MeshContext>,
  /** null **/
  epnsPushNotifications: InContextSdkMethod<Subscription['epnsPushNotifications'], SubscriptionepnsPushNotificationsArgs, MeshContext>,
  /** null **/
  nft: InContextSdkMethod<Subscription['nft'], SubscriptionnftArgs, MeshContext>,
  /** null **/
  nfts: InContextSdkMethod<Subscription['nfts'], SubscriptionnftsArgs, MeshContext>,
  /** null **/
  event: InContextSdkMethod<Subscription['event'], SubscriptioneventArgs, MeshContext>,
  /** null **/
  events: InContextSdkMethod<Subscription['events'], SubscriptioneventsArgs, MeshContext>,
  /** null **/
  offer: InContextSdkMethod<Subscription['offer'], SubscriptionofferArgs, MeshContext>,
  /** null **/
  offers: InContextSdkMethod<Subscription['offers'], SubscriptionoffersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["cryptopunks"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
