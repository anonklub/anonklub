// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace EnsGovernanceTypes {
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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Delegate = {
  /** A Delegate is any address that has been delegated with voting tokens by a token holder, id is the blockchain address of said delegate */
  id: Scalars['String'];
  /** Amount of votes delegated to this delegate to be used on proposal votings expressed in the smallest unit of the token */
  delegatedVotesRaw: Scalars['BigInt'];
  /** Amount of votes delegated to this delegate to be used on proposal votings expressed as a BigDecimal normalized value */
  delegatedVotes: Scalars['BigDecimal'];
  /** Total token holders that this delegate represents */
  tokenHoldersRepresentedAmount: Scalars['Int'];
  /** Token holders that this delegate represents */
  tokenHoldersRepresented: Array<TokenHolder>;
  /** Votes that a delegate has made in different proposals */
  votes: Array<Vote>;
  /** Number of proposals voted on */
  numberVotes: Scalars['Int'];
  /** Proposals that the delegate has created */
  proposals: Array<Proposal>;
};


export type DelegatetokenHoldersRepresentedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHolder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenHolder_filter>;
};


export type DelegatevotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};


export type DelegateproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
};

export type DelegateChange = {
  /** Unique entity used to keep track of delegate changes */
  id: Scalars['ID'];
  /** Token addresss */
  tokenAddress?: Maybe<Scalars['String']>;
  /** Token address for delegator */
  delegator: Scalars['String'];
  /** Token address for delegate */
  delegate: Scalars['String'];
  /** Token address for previous delegate */
  previousDelegate: Scalars['String'];
  /** Block time change happened */
  blockTimestamp: Scalars['BigInt'];
  /** Transaction hash of the delegate change event */
  txnHash: Scalars['String'];
  /** Log index for delegate change */
  logIndex: Scalars['BigInt'];
  /** Block number of event */
  blockNumber: Scalars['BigInt'];
};

export type DelegateChange_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenAddress?: InputMaybe<Scalars['String']>;
  tokenAddress_not?: InputMaybe<Scalars['String']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']>;
  tokenAddress_lt?: InputMaybe<Scalars['String']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate?: InputMaybe<Scalars['String']>;
  previousDelegate_not?: InputMaybe<Scalars['String']>;
  previousDelegate_gt?: InputMaybe<Scalars['String']>;
  previousDelegate_lt?: InputMaybe<Scalars['String']>;
  previousDelegate_gte?: InputMaybe<Scalars['String']>;
  previousDelegate_lte?: InputMaybe<Scalars['String']>;
  previousDelegate_in?: InputMaybe<Array<Scalars['String']>>;
  previousDelegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  previousDelegate_contains?: InputMaybe<Scalars['String']>;
  previousDelegate_contains_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_not_contains?: InputMaybe<Scalars['String']>;
  previousDelegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_starts_with?: InputMaybe<Scalars['String']>;
  previousDelegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_not_starts_with?: InputMaybe<Scalars['String']>;
  previousDelegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_ends_with?: InputMaybe<Scalars['String']>;
  previousDelegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_not_ends_with?: InputMaybe<Scalars['String']>;
  previousDelegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txnHash?: InputMaybe<Scalars['String']>;
  txnHash_not?: InputMaybe<Scalars['String']>;
  txnHash_gt?: InputMaybe<Scalars['String']>;
  txnHash_lt?: InputMaybe<Scalars['String']>;
  txnHash_gte?: InputMaybe<Scalars['String']>;
  txnHash_lte?: InputMaybe<Scalars['String']>;
  txnHash_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_contains?: InputMaybe<Scalars['String']>;
  txnHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_contains?: InputMaybe<Scalars['String']>;
  txnHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DelegateChange_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DelegateChange_filter>>>;
};

export type DelegateChange_orderBy =
  | 'id'
  | 'tokenAddress'
  | 'delegator'
  | 'delegate'
  | 'previousDelegate'
  | 'blockTimestamp'
  | 'txnHash'
  | 'logIndex'
  | 'blockNumber';

export type DelegateVotingPowerChange = {
  /** Unique entity used to keep track of voting power delta */
  id: Scalars['ID'];
  /** Token addresss */
  tokenAddress?: Maybe<Scalars['String']>;
  /** Token address for delegate */
  delegate: Scalars['String'];
  /** Previous voting power of delegate */
  previousBalance: Scalars['BigInt'];
  /** New voting power of delegate */
  newBalance: Scalars['BigInt'];
  /** Block time change happened */
  blockTimestamp: Scalars['BigInt'];
  /** Transaction hash of the voting power change */
  txnHash: Scalars['String'];
  /** Log index for delegate voting power change */
  logIndex: Scalars['BigInt'];
  /** Block number of event */
  blockNumber: Scalars['BigInt'];
};

export type DelegateVotingPowerChange_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenAddress?: InputMaybe<Scalars['String']>;
  tokenAddress_not?: InputMaybe<Scalars['String']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']>;
  tokenAddress_lt?: InputMaybe<Scalars['String']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousBalance?: InputMaybe<Scalars['BigInt']>;
  previousBalance_not?: InputMaybe<Scalars['BigInt']>;
  previousBalance_gt?: InputMaybe<Scalars['BigInt']>;
  previousBalance_lt?: InputMaybe<Scalars['BigInt']>;
  previousBalance_gte?: InputMaybe<Scalars['BigInt']>;
  previousBalance_lte?: InputMaybe<Scalars['BigInt']>;
  previousBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  previousBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newBalance?: InputMaybe<Scalars['BigInt']>;
  newBalance_not?: InputMaybe<Scalars['BigInt']>;
  newBalance_gt?: InputMaybe<Scalars['BigInt']>;
  newBalance_lt?: InputMaybe<Scalars['BigInt']>;
  newBalance_gte?: InputMaybe<Scalars['BigInt']>;
  newBalance_lte?: InputMaybe<Scalars['BigInt']>;
  newBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txnHash?: InputMaybe<Scalars['String']>;
  txnHash_not?: InputMaybe<Scalars['String']>;
  txnHash_gt?: InputMaybe<Scalars['String']>;
  txnHash_lt?: InputMaybe<Scalars['String']>;
  txnHash_gte?: InputMaybe<Scalars['String']>;
  txnHash_lte?: InputMaybe<Scalars['String']>;
  txnHash_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_contains?: InputMaybe<Scalars['String']>;
  txnHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_contains?: InputMaybe<Scalars['String']>;
  txnHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DelegateVotingPowerChange_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DelegateVotingPowerChange_filter>>>;
};

export type DelegateVotingPowerChange_orderBy =
  | 'id'
  | 'tokenAddress'
  | 'delegate'
  | 'previousBalance'
  | 'newBalance'
  | 'blockTimestamp'
  | 'txnHash'
  | 'logIndex'
  | 'blockNumber';

export type Delegate_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegatedVotesRaw?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_not?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotes?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_not?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_gt?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_lt?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_gte?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_lte?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  delegatedVotes_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenHoldersRepresentedAmount?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_not?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_gt?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_lt?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_gte?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_lte?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenHoldersRepresentedAmount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenHoldersRepresented_?: InputMaybe<TokenHolder_filter>;
  votes_?: InputMaybe<Vote_filter>;
  numberVotes?: InputMaybe<Scalars['Int']>;
  numberVotes_not?: InputMaybe<Scalars['Int']>;
  numberVotes_gt?: InputMaybe<Scalars['Int']>;
  numberVotes_lt?: InputMaybe<Scalars['Int']>;
  numberVotes_gte?: InputMaybe<Scalars['Int']>;
  numberVotes_lte?: InputMaybe<Scalars['Int']>;
  numberVotes_in?: InputMaybe<Array<Scalars['Int']>>;
  numberVotes_not_in?: InputMaybe<Array<Scalars['Int']>>;
  proposals_?: InputMaybe<Proposal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Delegate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Delegate_filter>>>;
};

export type Delegate_orderBy =
  | 'id'
  | 'delegatedVotesRaw'
  | 'delegatedVotes'
  | 'tokenHoldersRepresentedAmount'
  | 'tokenHoldersRepresented'
  | 'votes'
  | 'numberVotes'
  | 'proposals';

export type Governance = {
  /** Unique entity used to keep track of common aggregated data */
  id: Scalars['ID'];
  /** Total Supply of token */
  totalTokenSupply: Scalars['BigInt'];
  /** Total number of token holders currently */
  currentTokenHolders: Scalars['BigInt'];
  /** Total number of token holders */
  totalTokenHolders: Scalars['BigInt'];
  /** Total number of delegates participating on the governance currently */
  currentDelegates: Scalars['BigInt'];
  /** Total number of delegates that held delegated votes */
  totalDelegates: Scalars['BigInt'];
  /** Total number of votes delegated expressed in the smallest unit of the token */
  delegatedVotesRaw: Scalars['BigInt'];
  /** Total number of votes delegated expressed as a BigDecimal normalized value for the token */
  delegatedVotes: Scalars['BigDecimal'];
  /** Total number of proposals created */
  proposals: Scalars['BigInt'];
  /** Number of proposals currently queued for execution */
  proposalsQueued: Scalars['BigInt'];
  /** Number of proposals currently executed */
  proposalsExecuted: Scalars['BigInt'];
  /** Number of proposals currently canceled */
  proposalsCanceled: Scalars['BigInt'];
};

export type GovernanceFramework = {
  /** Governance framework contract address */
  id: Scalars['String'];
  /** Name of the governance framework */
  name: Scalars['String'];
  /** Type of governance framework */
  type: GovernanceFrameworkType;
  /** Version of the governance framework */
  version: Scalars['String'];
  /** Governance framework contract address */
  contractAddress: Scalars['String'];
  /** The contract address associated with the governance token used for voting on the governance framework proposals */
  tokenAddress: Scalars['String'];
  /** The contract address associated with the contract that manages the delay of administrative actions for the governance framework */
  timelockAddress: Scalars['String'];
  /** The delay before voting on a proposal may take place in blocks */
  votingDelay: Scalars['BigInt'];
  /** The duration of voting on a proposal in blocks */
  votingPeriod: Scalars['BigInt'];
  /** The number of votes required in order for a voter to become a proposer */
  proposalThreshold: Scalars['BigInt'];
  /** The number of votes for a proposal to succeed. */
  quorumVotes?: Maybe<Scalars['BigInt']>;
  /** Quorum fraction numerator value. (OZ: quorum = totalSupply * numerator / denominator) */
  quorumNumerator?: Maybe<Scalars['BigInt']>;
  /** Quorum fraction denominator value. (OZ: quorum = totalSupply * numerator / denominator) */
  quorumDenominator?: Maybe<Scalars['BigInt']>;
};

export type GovernanceFrameworkType =
  | 'GovernorAlpha'
  | 'GovernorBravo'
  | 'OZGovernor';

export type GovernanceFramework_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  type?: InputMaybe<GovernanceFrameworkType>;
  type_not?: InputMaybe<GovernanceFrameworkType>;
  type_in?: InputMaybe<Array<GovernanceFrameworkType>>;
  type_not_in?: InputMaybe<Array<GovernanceFrameworkType>>;
  version?: InputMaybe<Scalars['String']>;
  version_not?: InputMaybe<Scalars['String']>;
  version_gt?: InputMaybe<Scalars['String']>;
  version_lt?: InputMaybe<Scalars['String']>;
  version_gte?: InputMaybe<Scalars['String']>;
  version_lte?: InputMaybe<Scalars['String']>;
  version_in?: InputMaybe<Array<Scalars['String']>>;
  version_not_in?: InputMaybe<Array<Scalars['String']>>;
  version_contains?: InputMaybe<Scalars['String']>;
  version_contains_nocase?: InputMaybe<Scalars['String']>;
  version_not_contains?: InputMaybe<Scalars['String']>;
  version_not_contains_nocase?: InputMaybe<Scalars['String']>;
  version_starts_with?: InputMaybe<Scalars['String']>;
  version_starts_with_nocase?: InputMaybe<Scalars['String']>;
  version_not_starts_with?: InputMaybe<Scalars['String']>;
  version_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  version_ends_with?: InputMaybe<Scalars['String']>;
  version_ends_with_nocase?: InputMaybe<Scalars['String']>;
  version_not_ends_with?: InputMaybe<Scalars['String']>;
  version_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress?: InputMaybe<Scalars['String']>;
  contractAddress_not?: InputMaybe<Scalars['String']>;
  contractAddress_gt?: InputMaybe<Scalars['String']>;
  contractAddress_lt?: InputMaybe<Scalars['String']>;
  contractAddress_gte?: InputMaybe<Scalars['String']>;
  contractAddress_lte?: InputMaybe<Scalars['String']>;
  contractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_contains?: InputMaybe<Scalars['String']>;
  contractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress?: InputMaybe<Scalars['String']>;
  tokenAddress_not?: InputMaybe<Scalars['String']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']>;
  tokenAddress_lt?: InputMaybe<Scalars['String']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timelockAddress?: InputMaybe<Scalars['String']>;
  timelockAddress_not?: InputMaybe<Scalars['String']>;
  timelockAddress_gt?: InputMaybe<Scalars['String']>;
  timelockAddress_lt?: InputMaybe<Scalars['String']>;
  timelockAddress_gte?: InputMaybe<Scalars['String']>;
  timelockAddress_lte?: InputMaybe<Scalars['String']>;
  timelockAddress_in?: InputMaybe<Array<Scalars['String']>>;
  timelockAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  timelockAddress_contains?: InputMaybe<Scalars['String']>;
  timelockAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  timelockAddress_not_contains?: InputMaybe<Scalars['String']>;
  timelockAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  timelockAddress_starts_with?: InputMaybe<Scalars['String']>;
  timelockAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timelockAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  timelockAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timelockAddress_ends_with?: InputMaybe<Scalars['String']>;
  timelockAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timelockAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  timelockAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  votingDelay?: InputMaybe<Scalars['BigInt']>;
  votingDelay_not?: InputMaybe<Scalars['BigInt']>;
  votingDelay_gt?: InputMaybe<Scalars['BigInt']>;
  votingDelay_lt?: InputMaybe<Scalars['BigInt']>;
  votingDelay_gte?: InputMaybe<Scalars['BigInt']>;
  votingDelay_lte?: InputMaybe<Scalars['BigInt']>;
  votingDelay_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingDelay_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalThreshold?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_not?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_gt?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_lt?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_gte?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_lte?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumVotes?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_not?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumNumerator?: InputMaybe<Scalars['BigInt']>;
  quorumNumerator_not?: InputMaybe<Scalars['BigInt']>;
  quorumNumerator_gt?: InputMaybe<Scalars['BigInt']>;
  quorumNumerator_lt?: InputMaybe<Scalars['BigInt']>;
  quorumNumerator_gte?: InputMaybe<Scalars['BigInt']>;
  quorumNumerator_lte?: InputMaybe<Scalars['BigInt']>;
  quorumNumerator_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumNumerator_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumDenominator?: InputMaybe<Scalars['BigInt']>;
  quorumDenominator_not?: InputMaybe<Scalars['BigInt']>;
  quorumDenominator_gt?: InputMaybe<Scalars['BigInt']>;
  quorumDenominator_lt?: InputMaybe<Scalars['BigInt']>;
  quorumDenominator_gte?: InputMaybe<Scalars['BigInt']>;
  quorumDenominator_lte?: InputMaybe<Scalars['BigInt']>;
  quorumDenominator_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumDenominator_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GovernanceFramework_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GovernanceFramework_filter>>>;
};

export type GovernanceFramework_orderBy =
  | 'id'
  | 'name'
  | 'type'
  | 'version'
  | 'contractAddress'
  | 'tokenAddress'
  | 'timelockAddress'
  | 'votingDelay'
  | 'votingPeriod'
  | 'proposalThreshold'
  | 'quorumVotes'
  | 'quorumNumerator'
  | 'quorumDenominator';

export type Governance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalTokenSupply?: InputMaybe<Scalars['BigInt']>;
  totalTokenSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalTokenSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalTokenSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalTokenSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalTokenSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentTokenHolders?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_not?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_gt?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_lt?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_gte?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_lte?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentTokenHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokenHolders?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_not?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_gt?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_lt?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_gte?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_lte?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokenHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentDelegates?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_not?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_gt?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_lt?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_gte?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_lte?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentDelegates_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDelegates?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_not?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_gt?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_lt?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_gte?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_lte?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDelegates_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotesRaw?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_not?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotes?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_not?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_gt?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_lt?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_gte?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_lte?: InputMaybe<Scalars['BigDecimal']>;
  delegatedVotes_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  delegatedVotes_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  proposals?: InputMaybe<Scalars['BigInt']>;
  proposals_not?: InputMaybe<Scalars['BigInt']>;
  proposals_gt?: InputMaybe<Scalars['BigInt']>;
  proposals_lt?: InputMaybe<Scalars['BigInt']>;
  proposals_gte?: InputMaybe<Scalars['BigInt']>;
  proposals_lte?: InputMaybe<Scalars['BigInt']>;
  proposals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsQueued?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_not?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_gt?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_lt?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_gte?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_lte?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsQueued_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsExecuted?: InputMaybe<Scalars['BigInt']>;
  proposalsExecuted_not?: InputMaybe<Scalars['BigInt']>;
  proposalsExecuted_gt?: InputMaybe<Scalars['BigInt']>;
  proposalsExecuted_lt?: InputMaybe<Scalars['BigInt']>;
  proposalsExecuted_gte?: InputMaybe<Scalars['BigInt']>;
  proposalsExecuted_lte?: InputMaybe<Scalars['BigInt']>;
  proposalsExecuted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsExecuted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsCanceled?: InputMaybe<Scalars['BigInt']>;
  proposalsCanceled_not?: InputMaybe<Scalars['BigInt']>;
  proposalsCanceled_gt?: InputMaybe<Scalars['BigInt']>;
  proposalsCanceled_lt?: InputMaybe<Scalars['BigInt']>;
  proposalsCanceled_gte?: InputMaybe<Scalars['BigInt']>;
  proposalsCanceled_lte?: InputMaybe<Scalars['BigInt']>;
  proposalsCanceled_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsCanceled_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Governance_filter>>>;
};

export type Governance_orderBy =
  | 'id'
  | 'totalTokenSupply'
  | 'currentTokenHolders'
  | 'totalTokenHolders'
  | 'currentDelegates'
  | 'totalDelegates'
  | 'delegatedVotesRaw'
  | 'delegatedVotes'
  | 'proposals'
  | 'proposalsQueued'
  | 'proposalsExecuted'
  | 'proposalsCanceled';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Proposal = {
  /** Internal proposal ID, in this implementation it seems to be a autoincremental id */
  id: Scalars['ID'];
  /** Transaction hash of the proposal creation */
  txnHash: Scalars['String'];
  /** Proposal description in markdown format */
  description: Scalars['String'];
  /** Governance Framework that proposal is part of */
  governanceFramework: GovernanceFramework;
  /** Delegate that proposed the proposal */
  proposer: Delegate;
  /** State of the proposal */
  state: ProposalState;
  /** The number of votes for a proposal to succeed. */
  quorumVotes: Scalars['BigInt'];
  /** Number of tokenholders at start of voting */
  tokenHoldersAtStart: Scalars['BigInt'];
  /** Number of delegates at start of voting */
  delegatesAtStart: Scalars['BigInt'];
  /** Number of delegates that voted against the proposal */
  againstDelegateVotes: Scalars['BigInt'];
  /** Number of delegates that voted for the proposal */
  forDelegateVotes: Scalars['BigInt'];
  /** Number of delegates that voted abstain to the proposal */
  abstainDelegateVotes: Scalars['BigInt'];
  /** Total number of delegates that voted on the proposal */
  totalDelegateVotes: Scalars['BigInt'];
  /** Weighted votes against the proposal */
  againstWeightedVotes: Scalars['BigInt'];
  /** Weighted votes for the proposal */
  forWeightedVotes: Scalars['BigInt'];
  /** Weighted votes abstaining to the proposal */
  abstainWeightedVotes: Scalars['BigInt'];
  /** Total weighted for/against/abstaining votes */
  totalWeightedVotes: Scalars['BigInt'];
  /** Votes associated to this proposal */
  votes: Array<Vote>;
  /** Block number proposal was created in */
  creationBlock: Scalars['BigInt'];
  /** Timestamp of block proposal was created in */
  creationTime: Scalars['BigInt'];
  /** Block number from where the voting starts */
  startBlock: Scalars['BigInt'];
  /** Block number from where the voting ends */
  endBlock: Scalars['BigInt'];
  /** Transaction hash of the proposal being queued */
  queueTxnHash?: Maybe<Scalars['String']>;
  /** Block number proposal was queued in */
  queueBlock?: Maybe<Scalars['BigInt']>;
  /** Timestamp of block proposal was queued in */
  queueTime?: Maybe<Scalars['BigInt']>;
  /** Once the proposal is queued for execution it will have an ETA of the execution */
  executionETA?: Maybe<Scalars['BigInt']>;
  /** Transaction hash of the proposal execution */
  executionTxnHash?: Maybe<Scalars['String']>;
  /** Block number proposal was executed in */
  executionBlock?: Maybe<Scalars['BigInt']>;
  /** Timestamp of block proposal was executed in */
  executionTime?: Maybe<Scalars['BigInt']>;
  /** Transaction hash of the proposal cancellation */
  cancellationTxnHash?: Maybe<Scalars['String']>;
  /** Block number proposal was canceled in */
  cancellationBlock?: Maybe<Scalars['BigInt']>;
  /** Timestamp of block proposal was canceled in */
  cancellationTime?: Maybe<Scalars['BigInt']>;
  /** Targets data for the change */
  targets?: Maybe<Array<Scalars['String']>>;
  /** Values data for the change */
  values?: Maybe<Array<Scalars['BigInt']>>;
  /** Signature data for the change */
  signatures?: Maybe<Array<Scalars['String']>>;
  /** Call data for the change */
  calldatas?: Maybe<Array<Scalars['Bytes']>>;
};


export type ProposalvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};

export type ProposalState =
  | 'PENDING'
  | 'ACTIVE'
  | 'CANCELED'
  | 'DEFEATED'
  | 'SUCCEEDED'
  | 'QUEUED'
  | 'EXPIRED'
  | 'EXECUTED';

export type Proposal_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  txnHash?: InputMaybe<Scalars['String']>;
  txnHash_not?: InputMaybe<Scalars['String']>;
  txnHash_gt?: InputMaybe<Scalars['String']>;
  txnHash_lt?: InputMaybe<Scalars['String']>;
  txnHash_gte?: InputMaybe<Scalars['String']>;
  txnHash_lte?: InputMaybe<Scalars['String']>;
  txnHash_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_contains?: InputMaybe<Scalars['String']>;
  txnHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_contains?: InputMaybe<Scalars['String']>;
  txnHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  governanceFramework?: InputMaybe<Scalars['String']>;
  governanceFramework_not?: InputMaybe<Scalars['String']>;
  governanceFramework_gt?: InputMaybe<Scalars['String']>;
  governanceFramework_lt?: InputMaybe<Scalars['String']>;
  governanceFramework_gte?: InputMaybe<Scalars['String']>;
  governanceFramework_lte?: InputMaybe<Scalars['String']>;
  governanceFramework_in?: InputMaybe<Array<Scalars['String']>>;
  governanceFramework_not_in?: InputMaybe<Array<Scalars['String']>>;
  governanceFramework_contains?: InputMaybe<Scalars['String']>;
  governanceFramework_contains_nocase?: InputMaybe<Scalars['String']>;
  governanceFramework_not_contains?: InputMaybe<Scalars['String']>;
  governanceFramework_not_contains_nocase?: InputMaybe<Scalars['String']>;
  governanceFramework_starts_with?: InputMaybe<Scalars['String']>;
  governanceFramework_starts_with_nocase?: InputMaybe<Scalars['String']>;
  governanceFramework_not_starts_with?: InputMaybe<Scalars['String']>;
  governanceFramework_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  governanceFramework_ends_with?: InputMaybe<Scalars['String']>;
  governanceFramework_ends_with_nocase?: InputMaybe<Scalars['String']>;
  governanceFramework_not_ends_with?: InputMaybe<Scalars['String']>;
  governanceFramework_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  governanceFramework_?: InputMaybe<GovernanceFramework_filter>;
  proposer?: InputMaybe<Scalars['String']>;
  proposer_not?: InputMaybe<Scalars['String']>;
  proposer_gt?: InputMaybe<Scalars['String']>;
  proposer_lt?: InputMaybe<Scalars['String']>;
  proposer_gte?: InputMaybe<Scalars['String']>;
  proposer_lte?: InputMaybe<Scalars['String']>;
  proposer_in?: InputMaybe<Array<Scalars['String']>>;
  proposer_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposer_contains?: InputMaybe<Scalars['String']>;
  proposer_contains_nocase?: InputMaybe<Scalars['String']>;
  proposer_not_contains?: InputMaybe<Scalars['String']>;
  proposer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposer_starts_with?: InputMaybe<Scalars['String']>;
  proposer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_not_starts_with?: InputMaybe<Scalars['String']>;
  proposer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_ends_with?: InputMaybe<Scalars['String']>;
  proposer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_not_ends_with?: InputMaybe<Scalars['String']>;
  proposer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_?: InputMaybe<Delegate_filter>;
  state?: InputMaybe<ProposalState>;
  state_not?: InputMaybe<ProposalState>;
  state_in?: InputMaybe<Array<ProposalState>>;
  state_not_in?: InputMaybe<Array<ProposalState>>;
  quorumVotes?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_not?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenHoldersAtStart?: InputMaybe<Scalars['BigInt']>;
  tokenHoldersAtStart_not?: InputMaybe<Scalars['BigInt']>;
  tokenHoldersAtStart_gt?: InputMaybe<Scalars['BigInt']>;
  tokenHoldersAtStart_lt?: InputMaybe<Scalars['BigInt']>;
  tokenHoldersAtStart_gte?: InputMaybe<Scalars['BigInt']>;
  tokenHoldersAtStart_lte?: InputMaybe<Scalars['BigInt']>;
  tokenHoldersAtStart_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenHoldersAtStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatesAtStart?: InputMaybe<Scalars['BigInt']>;
  delegatesAtStart_not?: InputMaybe<Scalars['BigInt']>;
  delegatesAtStart_gt?: InputMaybe<Scalars['BigInt']>;
  delegatesAtStart_lt?: InputMaybe<Scalars['BigInt']>;
  delegatesAtStart_gte?: InputMaybe<Scalars['BigInt']>;
  delegatesAtStart_lte?: InputMaybe<Scalars['BigInt']>;
  delegatesAtStart_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatesAtStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstDelegateVotes?: InputMaybe<Scalars['BigInt']>;
  againstDelegateVotes_not?: InputMaybe<Scalars['BigInt']>;
  againstDelegateVotes_gt?: InputMaybe<Scalars['BigInt']>;
  againstDelegateVotes_lt?: InputMaybe<Scalars['BigInt']>;
  againstDelegateVotes_gte?: InputMaybe<Scalars['BigInt']>;
  againstDelegateVotes_lte?: InputMaybe<Scalars['BigInt']>;
  againstDelegateVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstDelegateVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forDelegateVotes?: InputMaybe<Scalars['BigInt']>;
  forDelegateVotes_not?: InputMaybe<Scalars['BigInt']>;
  forDelegateVotes_gt?: InputMaybe<Scalars['BigInt']>;
  forDelegateVotes_lt?: InputMaybe<Scalars['BigInt']>;
  forDelegateVotes_gte?: InputMaybe<Scalars['BigInt']>;
  forDelegateVotes_lte?: InputMaybe<Scalars['BigInt']>;
  forDelegateVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forDelegateVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainDelegateVotes?: InputMaybe<Scalars['BigInt']>;
  abstainDelegateVotes_not?: InputMaybe<Scalars['BigInt']>;
  abstainDelegateVotes_gt?: InputMaybe<Scalars['BigInt']>;
  abstainDelegateVotes_lt?: InputMaybe<Scalars['BigInt']>;
  abstainDelegateVotes_gte?: InputMaybe<Scalars['BigInt']>;
  abstainDelegateVotes_lte?: InputMaybe<Scalars['BigInt']>;
  abstainDelegateVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainDelegateVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDelegateVotes?: InputMaybe<Scalars['BigInt']>;
  totalDelegateVotes_not?: InputMaybe<Scalars['BigInt']>;
  totalDelegateVotes_gt?: InputMaybe<Scalars['BigInt']>;
  totalDelegateVotes_lt?: InputMaybe<Scalars['BigInt']>;
  totalDelegateVotes_gte?: InputMaybe<Scalars['BigInt']>;
  totalDelegateVotes_lte?: InputMaybe<Scalars['BigInt']>;
  totalDelegateVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDelegateVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votes_?: InputMaybe<Vote_filter>;
  creationBlock?: InputMaybe<Scalars['BigInt']>;
  creationBlock_not?: InputMaybe<Scalars['BigInt']>;
  creationBlock_gt?: InputMaybe<Scalars['BigInt']>;
  creationBlock_lt?: InputMaybe<Scalars['BigInt']>;
  creationBlock_gte?: InputMaybe<Scalars['BigInt']>;
  creationBlock_lte?: InputMaybe<Scalars['BigInt']>;
  creationBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTime?: InputMaybe<Scalars['BigInt']>;
  creationTime_not?: InputMaybe<Scalars['BigInt']>;
  creationTime_gt?: InputMaybe<Scalars['BigInt']>;
  creationTime_lt?: InputMaybe<Scalars['BigInt']>;
  creationTime_gte?: InputMaybe<Scalars['BigInt']>;
  creationTime_lte?: InputMaybe<Scalars['BigInt']>;
  creationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startBlock?: InputMaybe<Scalars['BigInt']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock?: InputMaybe<Scalars['BigInt']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  queueTxnHash?: InputMaybe<Scalars['String']>;
  queueTxnHash_not?: InputMaybe<Scalars['String']>;
  queueTxnHash_gt?: InputMaybe<Scalars['String']>;
  queueTxnHash_lt?: InputMaybe<Scalars['String']>;
  queueTxnHash_gte?: InputMaybe<Scalars['String']>;
  queueTxnHash_lte?: InputMaybe<Scalars['String']>;
  queueTxnHash_in?: InputMaybe<Array<Scalars['String']>>;
  queueTxnHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  queueTxnHash_contains?: InputMaybe<Scalars['String']>;
  queueTxnHash_contains_nocase?: InputMaybe<Scalars['String']>;
  queueTxnHash_not_contains?: InputMaybe<Scalars['String']>;
  queueTxnHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  queueTxnHash_starts_with?: InputMaybe<Scalars['String']>;
  queueTxnHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  queueTxnHash_not_starts_with?: InputMaybe<Scalars['String']>;
  queueTxnHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  queueTxnHash_ends_with?: InputMaybe<Scalars['String']>;
  queueTxnHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  queueTxnHash_not_ends_with?: InputMaybe<Scalars['String']>;
  queueTxnHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  queueBlock?: InputMaybe<Scalars['BigInt']>;
  queueBlock_not?: InputMaybe<Scalars['BigInt']>;
  queueBlock_gt?: InputMaybe<Scalars['BigInt']>;
  queueBlock_lt?: InputMaybe<Scalars['BigInt']>;
  queueBlock_gte?: InputMaybe<Scalars['BigInt']>;
  queueBlock_lte?: InputMaybe<Scalars['BigInt']>;
  queueBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  queueBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  queueTime?: InputMaybe<Scalars['BigInt']>;
  queueTime_not?: InputMaybe<Scalars['BigInt']>;
  queueTime_gt?: InputMaybe<Scalars['BigInt']>;
  queueTime_lt?: InputMaybe<Scalars['BigInt']>;
  queueTime_gte?: InputMaybe<Scalars['BigInt']>;
  queueTime_lte?: InputMaybe<Scalars['BigInt']>;
  queueTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  queueTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executionETA?: InputMaybe<Scalars['BigInt']>;
  executionETA_not?: InputMaybe<Scalars['BigInt']>;
  executionETA_gt?: InputMaybe<Scalars['BigInt']>;
  executionETA_lt?: InputMaybe<Scalars['BigInt']>;
  executionETA_gte?: InputMaybe<Scalars['BigInt']>;
  executionETA_lte?: InputMaybe<Scalars['BigInt']>;
  executionETA_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executionETA_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executionTxnHash?: InputMaybe<Scalars['String']>;
  executionTxnHash_not?: InputMaybe<Scalars['String']>;
  executionTxnHash_gt?: InputMaybe<Scalars['String']>;
  executionTxnHash_lt?: InputMaybe<Scalars['String']>;
  executionTxnHash_gte?: InputMaybe<Scalars['String']>;
  executionTxnHash_lte?: InputMaybe<Scalars['String']>;
  executionTxnHash_in?: InputMaybe<Array<Scalars['String']>>;
  executionTxnHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  executionTxnHash_contains?: InputMaybe<Scalars['String']>;
  executionTxnHash_contains_nocase?: InputMaybe<Scalars['String']>;
  executionTxnHash_not_contains?: InputMaybe<Scalars['String']>;
  executionTxnHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  executionTxnHash_starts_with?: InputMaybe<Scalars['String']>;
  executionTxnHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  executionTxnHash_not_starts_with?: InputMaybe<Scalars['String']>;
  executionTxnHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  executionTxnHash_ends_with?: InputMaybe<Scalars['String']>;
  executionTxnHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  executionTxnHash_not_ends_with?: InputMaybe<Scalars['String']>;
  executionTxnHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  executionBlock?: InputMaybe<Scalars['BigInt']>;
  executionBlock_not?: InputMaybe<Scalars['BigInt']>;
  executionBlock_gt?: InputMaybe<Scalars['BigInt']>;
  executionBlock_lt?: InputMaybe<Scalars['BigInt']>;
  executionBlock_gte?: InputMaybe<Scalars['BigInt']>;
  executionBlock_lte?: InputMaybe<Scalars['BigInt']>;
  executionBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executionBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executionTime?: InputMaybe<Scalars['BigInt']>;
  executionTime_not?: InputMaybe<Scalars['BigInt']>;
  executionTime_gt?: InputMaybe<Scalars['BigInt']>;
  executionTime_lt?: InputMaybe<Scalars['BigInt']>;
  executionTime_gte?: InputMaybe<Scalars['BigInt']>;
  executionTime_lte?: InputMaybe<Scalars['BigInt']>;
  executionTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executionTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancellationTxnHash?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_not?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_gt?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_lt?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_gte?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_lte?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_in?: InputMaybe<Array<Scalars['String']>>;
  cancellationTxnHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  cancellationTxnHash_contains?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_contains_nocase?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_not_contains?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_starts_with?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_not_starts_with?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_ends_with?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_not_ends_with?: InputMaybe<Scalars['String']>;
  cancellationTxnHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cancellationBlock?: InputMaybe<Scalars['BigInt']>;
  cancellationBlock_not?: InputMaybe<Scalars['BigInt']>;
  cancellationBlock_gt?: InputMaybe<Scalars['BigInt']>;
  cancellationBlock_lt?: InputMaybe<Scalars['BigInt']>;
  cancellationBlock_gte?: InputMaybe<Scalars['BigInt']>;
  cancellationBlock_lte?: InputMaybe<Scalars['BigInt']>;
  cancellationBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancellationBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancellationTime?: InputMaybe<Scalars['BigInt']>;
  cancellationTime_not?: InputMaybe<Scalars['BigInt']>;
  cancellationTime_gt?: InputMaybe<Scalars['BigInt']>;
  cancellationTime_lt?: InputMaybe<Scalars['BigInt']>;
  cancellationTime_gte?: InputMaybe<Scalars['BigInt']>;
  cancellationTime_lte?: InputMaybe<Scalars['BigInt']>;
  cancellationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancellationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  targets?: InputMaybe<Array<Scalars['String']>>;
  targets_not?: InputMaybe<Array<Scalars['String']>>;
  targets_contains?: InputMaybe<Array<Scalars['String']>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  targets_not_contains?: InputMaybe<Array<Scalars['String']>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  values?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  signatures?: InputMaybe<Array<Scalars['String']>>;
  signatures_not?: InputMaybe<Array<Scalars['String']>>;
  signatures_contains?: InputMaybe<Array<Scalars['String']>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  signatures_not_contains?: InputMaybe<Array<Scalars['String']>>;
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  calldatas?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_not?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proposal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Proposal_filter>>>;
};

export type Proposal_orderBy =
  | 'id'
  | 'txnHash'
  | 'description'
  | 'governanceFramework'
  | 'governanceFramework__id'
  | 'governanceFramework__name'
  | 'governanceFramework__type'
  | 'governanceFramework__version'
  | 'governanceFramework__contractAddress'
  | 'governanceFramework__tokenAddress'
  | 'governanceFramework__timelockAddress'
  | 'governanceFramework__votingDelay'
  | 'governanceFramework__votingPeriod'
  | 'governanceFramework__proposalThreshold'
  | 'governanceFramework__quorumVotes'
  | 'governanceFramework__quorumNumerator'
  | 'governanceFramework__quorumDenominator'
  | 'proposer'
  | 'proposer__id'
  | 'proposer__delegatedVotesRaw'
  | 'proposer__delegatedVotes'
  | 'proposer__tokenHoldersRepresentedAmount'
  | 'proposer__numberVotes'
  | 'state'
  | 'quorumVotes'
  | 'tokenHoldersAtStart'
  | 'delegatesAtStart'
  | 'againstDelegateVotes'
  | 'forDelegateVotes'
  | 'abstainDelegateVotes'
  | 'totalDelegateVotes'
  | 'againstWeightedVotes'
  | 'forWeightedVotes'
  | 'abstainWeightedVotes'
  | 'totalWeightedVotes'
  | 'votes'
  | 'creationBlock'
  | 'creationTime'
  | 'startBlock'
  | 'endBlock'
  | 'queueTxnHash'
  | 'queueBlock'
  | 'queueTime'
  | 'executionETA'
  | 'executionTxnHash'
  | 'executionBlock'
  | 'executionTime'
  | 'cancellationTxnHash'
  | 'cancellationBlock'
  | 'cancellationTime'
  | 'targets'
  | 'values'
  | 'signatures'
  | 'calldatas';

export type Query = {
  delegateChange?: Maybe<DelegateChange>;
  delegateChanges: Array<DelegateChange>;
  delegateVotingPowerChange?: Maybe<DelegateVotingPowerChange>;
  delegateVotingPowerChanges: Array<DelegateVotingPowerChange>;
  governance?: Maybe<Governance>;
  governances: Array<Governance>;
  governanceFramework?: Maybe<GovernanceFramework>;
  governanceFrameworks: Array<GovernanceFramework>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
  tokenHolder?: Maybe<TokenHolder>;
  tokenHolders: Array<TokenHolder>;
  delegate?: Maybe<Delegate>;
  delegates: Array<Delegate>;
  tokenDailySnapshot?: Maybe<TokenDailySnapshot>;
  tokenDailySnapshots: Array<TokenDailySnapshot>;
  voteDailySnapshot?: Maybe<VoteDailySnapshot>;
  voteDailySnapshots: Array<VoteDailySnapshot>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerydelegateChangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateChangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateChange_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegateChange_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateVotingPowerChangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateVotingPowerChangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateVotingPowerChange_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegateVotingPowerChange_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Governance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Governance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernanceFrameworkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernanceFrameworksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GovernanceFramework_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GovernanceFramework_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenHolderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenHoldersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHolder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenHolder_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDailySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDailySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDailySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDailySnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteDailySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteDailySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VoteDailySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteDailySnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  delegateChange?: Maybe<DelegateChange>;
  delegateChanges: Array<DelegateChange>;
  delegateVotingPowerChange?: Maybe<DelegateVotingPowerChange>;
  delegateVotingPowerChanges: Array<DelegateVotingPowerChange>;
  governance?: Maybe<Governance>;
  governances: Array<Governance>;
  governanceFramework?: Maybe<GovernanceFramework>;
  governanceFrameworks: Array<GovernanceFramework>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
  tokenHolder?: Maybe<TokenHolder>;
  tokenHolders: Array<TokenHolder>;
  delegate?: Maybe<Delegate>;
  delegates: Array<Delegate>;
  tokenDailySnapshot?: Maybe<TokenDailySnapshot>;
  tokenDailySnapshots: Array<TokenDailySnapshot>;
  voteDailySnapshot?: Maybe<VoteDailySnapshot>;
  voteDailySnapshots: Array<VoteDailySnapshot>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptiondelegateChangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateChangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateChange_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegateChange_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateVotingPowerChangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateVotingPowerChangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateVotingPowerChange_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegateVotingPowerChange_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Governance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Governance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernanceFrameworkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernanceFrameworksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GovernanceFramework_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GovernanceFramework_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenHolderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenHoldersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHolder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenHolder_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenDailySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenDailySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDailySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDailySnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteDailySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteDailySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VoteDailySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteDailySnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TokenDailySnapshot = {
  /** Number of days from Unix epoch time */
  id: Scalars['ID'];
  /** Total Supply at snapshot */
  totalSupply: Scalars['BigInt'];
  /** Number of tokenholders at snapshot */
  tokenHolders: Scalars['BigInt'];
  /** Number of delegates at snapshot */
  delegates: Scalars['BigInt'];
  /** Block number of last block in snapshot */
  blockNumber: Scalars['BigInt'];
  /** Timestamp of snapshot */
  timestamp: Scalars['BigInt'];
};

export type TokenDailySnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenHolders?: InputMaybe<Scalars['BigInt']>;
  tokenHolders_not?: InputMaybe<Scalars['BigInt']>;
  tokenHolders_gt?: InputMaybe<Scalars['BigInt']>;
  tokenHolders_lt?: InputMaybe<Scalars['BigInt']>;
  tokenHolders_gte?: InputMaybe<Scalars['BigInt']>;
  tokenHolders_lte?: InputMaybe<Scalars['BigInt']>;
  tokenHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegates?: InputMaybe<Scalars['BigInt']>;
  delegates_not?: InputMaybe<Scalars['BigInt']>;
  delegates_gt?: InputMaybe<Scalars['BigInt']>;
  delegates_lt?: InputMaybe<Scalars['BigInt']>;
  delegates_gte?: InputMaybe<Scalars['BigInt']>;
  delegates_lte?: InputMaybe<Scalars['BigInt']>;
  delegates_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegates_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  and?: InputMaybe<Array<InputMaybe<TokenDailySnapshot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenDailySnapshot_filter>>>;
};

export type TokenDailySnapshot_orderBy =
  | 'id'
  | 'totalSupply'
  | 'tokenHolders'
  | 'delegates'
  | 'blockNumber'
  | 'timestamp';

export type TokenHolder = {
  /** A TokenHolder is any address that holds any amount of tokens, the id used is the blockchain address. */
  id: Scalars['String'];
  /** Delegate address of the token holder which will participate in votings. Delegates don't need to hold any tokens and can even be the token holder itself. */
  delegate?: Maybe<Delegate>;
  /** Token balance of this address expressed in the smallest unit of the token */
  tokenBalanceRaw: Scalars['BigInt'];
  /** Token balance of this address expressed as a BigDecimal normalized value */
  tokenBalance: Scalars['BigDecimal'];
  /** Total amount of tokens ever held by this address expressed in the smallest unit of the token */
  totalTokensHeldRaw: Scalars['BigInt'];
  /** Total amount of tokens ever held by this address expressed as a BigDecimal normalized value */
  totalTokensHeld: Scalars['BigDecimal'];
};

export type TokenHolder_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Delegate_filter>;
  tokenBalanceRaw?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_not?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_gt?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_lt?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_gte?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_lte?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBalanceRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBalance?: InputMaybe<Scalars['BigDecimal']>;
  tokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  tokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  tokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  tokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  tokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  tokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalTokensHeldRaw?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_not?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_gt?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_lt?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_gte?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_lte?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokensHeldRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokensHeld?: InputMaybe<Scalars['BigDecimal']>;
  totalTokensHeld_not?: InputMaybe<Scalars['BigDecimal']>;
  totalTokensHeld_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalTokensHeld_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalTokensHeld_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalTokensHeld_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalTokensHeld_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalTokensHeld_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenHolder_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenHolder_filter>>>;
};

export type TokenHolder_orderBy =
  | 'id'
  | 'delegate'
  | 'delegate__id'
  | 'delegate__delegatedVotesRaw'
  | 'delegate__delegatedVotes'
  | 'delegate__tokenHoldersRepresentedAmount'
  | 'delegate__numberVotes'
  | 'tokenBalanceRaw'
  | 'tokenBalance'
  | 'totalTokensHeldRaw'
  | 'totalTokensHeld';

export type Vote = {
  /** Delegate ID + Proposal ID */
  id: Scalars['ID'];
  /** Whether the vote is in favour, against or abstaining to the proposal */
  choice: VoteChoice;
  /** Voting weight expressed in the vote */
  weight: Scalars['BigInt'];
  /** Reason for voting choice */
  reason?: Maybe<Scalars['String']>;
  /** Delegate that emitted the vote */
  voter: Delegate;
  /** Proposal that is being voted on */
  proposal: Proposal;
  /** Block number vote is cast in */
  block: Scalars['BigInt'];
  /** Timestamp of block vote was cast in */
  blockTime: Scalars['BigInt'];
  /** Transaction hash of the vote */
  txnHash: Scalars['String'];
};

export type VoteChoice =
  | 'FOR'
  | 'AGAINST'
  | 'ABSTAIN';

export type VoteDailySnapshot = {
  /** Number of days from Unix epoch time */
  id: Scalars['ID'];
  /** Proposal this snapshot is associated with */
  proposal: Proposal;
  /** Weighted votes against the proposal at snapshot */
  forWeightedVotes: Scalars['BigInt'];
  /** Weighted votes abstaining to the proposal at snapshot */
  againstWeightedVotes: Scalars['BigInt'];
  /** Weighted votes for the proposal at snapshot */
  abstainWeightedVotes: Scalars['BigInt'];
  /** Total weighted for/against/abstaining votes at snapshot */
  totalWeightedVotes: Scalars['BigInt'];
  /** Block number of last block in snapshot */
  blockNumber: Scalars['BigInt'];
  /** Timestamp of snapshot */
  timestamp: Scalars['BigInt'];
};

export type VoteDailySnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_?: InputMaybe<Proposal_filter>;
  forWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  forWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  againstWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  abstainWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalWeightedVotes?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_not?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  totalWeightedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalWeightedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  and?: InputMaybe<Array<InputMaybe<VoteDailySnapshot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VoteDailySnapshot_filter>>>;
};

export type VoteDailySnapshot_orderBy =
  | 'id'
  | 'proposal'
  | 'proposal__id'
  | 'proposal__txnHash'
  | 'proposal__description'
  | 'proposal__state'
  | 'proposal__quorumVotes'
  | 'proposal__tokenHoldersAtStart'
  | 'proposal__delegatesAtStart'
  | 'proposal__againstDelegateVotes'
  | 'proposal__forDelegateVotes'
  | 'proposal__abstainDelegateVotes'
  | 'proposal__totalDelegateVotes'
  | 'proposal__againstWeightedVotes'
  | 'proposal__forWeightedVotes'
  | 'proposal__abstainWeightedVotes'
  | 'proposal__totalWeightedVotes'
  | 'proposal__creationBlock'
  | 'proposal__creationTime'
  | 'proposal__startBlock'
  | 'proposal__endBlock'
  | 'proposal__queueTxnHash'
  | 'proposal__queueBlock'
  | 'proposal__queueTime'
  | 'proposal__executionETA'
  | 'proposal__executionTxnHash'
  | 'proposal__executionBlock'
  | 'proposal__executionTime'
  | 'proposal__cancellationTxnHash'
  | 'proposal__cancellationBlock'
  | 'proposal__cancellationTime'
  | 'forWeightedVotes'
  | 'againstWeightedVotes'
  | 'abstainWeightedVotes'
  | 'totalWeightedVotes'
  | 'blockNumber'
  | 'timestamp';

export type Vote_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  choice?: InputMaybe<VoteChoice>;
  choice_not?: InputMaybe<VoteChoice>;
  choice_in?: InputMaybe<Array<VoteChoice>>;
  choice_not_in?: InputMaybe<Array<VoteChoice>>;
  weight?: InputMaybe<Scalars['BigInt']>;
  weight_not?: InputMaybe<Scalars['BigInt']>;
  weight_gt?: InputMaybe<Scalars['BigInt']>;
  weight_lt?: InputMaybe<Scalars['BigInt']>;
  weight_gte?: InputMaybe<Scalars['BigInt']>;
  weight_lte?: InputMaybe<Scalars['BigInt']>;
  weight_in?: InputMaybe<Array<Scalars['BigInt']>>;
  weight_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reason?: InputMaybe<Scalars['String']>;
  reason_not?: InputMaybe<Scalars['String']>;
  reason_gt?: InputMaybe<Scalars['String']>;
  reason_lt?: InputMaybe<Scalars['String']>;
  reason_gte?: InputMaybe<Scalars['String']>;
  reason_lte?: InputMaybe<Scalars['String']>;
  reason_in?: InputMaybe<Array<Scalars['String']>>;
  reason_not_in?: InputMaybe<Array<Scalars['String']>>;
  reason_contains?: InputMaybe<Scalars['String']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']>;
  reason_not_contains?: InputMaybe<Scalars['String']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  reason_starts_with?: InputMaybe<Scalars['String']>;
  reason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reason_not_starts_with?: InputMaybe<Scalars['String']>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reason_ends_with?: InputMaybe<Scalars['String']>;
  reason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reason_not_ends_with?: InputMaybe<Scalars['String']>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter?: InputMaybe<Scalars['String']>;
  voter_not?: InputMaybe<Scalars['String']>;
  voter_gt?: InputMaybe<Scalars['String']>;
  voter_lt?: InputMaybe<Scalars['String']>;
  voter_gte?: InputMaybe<Scalars['String']>;
  voter_lte?: InputMaybe<Scalars['String']>;
  voter_in?: InputMaybe<Array<Scalars['String']>>;
  voter_not_in?: InputMaybe<Array<Scalars['String']>>;
  voter_contains?: InputMaybe<Scalars['String']>;
  voter_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_not_contains?: InputMaybe<Scalars['String']>;
  voter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_starts_with?: InputMaybe<Scalars['String']>;
  voter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_starts_with?: InputMaybe<Scalars['String']>;
  voter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_ends_with?: InputMaybe<Scalars['String']>;
  voter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_ends_with?: InputMaybe<Scalars['String']>;
  voter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter_?: InputMaybe<Delegate_filter>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTime?: InputMaybe<Scalars['BigInt']>;
  blockTime_not?: InputMaybe<Scalars['BigInt']>;
  blockTime_gt?: InputMaybe<Scalars['BigInt']>;
  blockTime_lt?: InputMaybe<Scalars['BigInt']>;
  blockTime_gte?: InputMaybe<Scalars['BigInt']>;
  blockTime_lte?: InputMaybe<Scalars['BigInt']>;
  blockTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txnHash?: InputMaybe<Scalars['String']>;
  txnHash_not?: InputMaybe<Scalars['String']>;
  txnHash_gt?: InputMaybe<Scalars['String']>;
  txnHash_lt?: InputMaybe<Scalars['String']>;
  txnHash_gte?: InputMaybe<Scalars['String']>;
  txnHash_lte?: InputMaybe<Scalars['String']>;
  txnHash_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txnHash_contains?: InputMaybe<Scalars['String']>;
  txnHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_contains?: InputMaybe<Scalars['String']>;
  txnHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txnHash_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txnHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txnHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Vote_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Vote_filter>>>;
};

export type Vote_orderBy =
  | 'id'
  | 'choice'
  | 'weight'
  | 'reason'
  | 'voter'
  | 'voter__id'
  | 'voter__delegatedVotesRaw'
  | 'voter__delegatedVotes'
  | 'voter__tokenHoldersRepresentedAmount'
  | 'voter__numberVotes'
  | 'proposal'
  | 'proposal__id'
  | 'proposal__txnHash'
  | 'proposal__description'
  | 'proposal__state'
  | 'proposal__quorumVotes'
  | 'proposal__tokenHoldersAtStart'
  | 'proposal__delegatesAtStart'
  | 'proposal__againstDelegateVotes'
  | 'proposal__forDelegateVotes'
  | 'proposal__abstainDelegateVotes'
  | 'proposal__totalDelegateVotes'
  | 'proposal__againstWeightedVotes'
  | 'proposal__forWeightedVotes'
  | 'proposal__abstainWeightedVotes'
  | 'proposal__totalWeightedVotes'
  | 'proposal__creationBlock'
  | 'proposal__creationTime'
  | 'proposal__startBlock'
  | 'proposal__endBlock'
  | 'proposal__queueTxnHash'
  | 'proposal__queueBlock'
  | 'proposal__queueTime'
  | 'proposal__executionETA'
  | 'proposal__executionTxnHash'
  | 'proposal__executionBlock'
  | 'proposal__executionTime'
  | 'proposal__cancellationTxnHash'
  | 'proposal__cancellationBlock'
  | 'proposal__cancellationTime'
  | 'block'
  | 'blockTime'
  | 'txnHash';

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
  delegateChange: InContextSdkMethod<Query['delegateChange'], QuerydelegateChangeArgs, MeshContext>,
  /** null **/
  delegateChanges: InContextSdkMethod<Query['delegateChanges'], QuerydelegateChangesArgs, MeshContext>,
  /** null **/
  delegateVotingPowerChange: InContextSdkMethod<Query['delegateVotingPowerChange'], QuerydelegateVotingPowerChangeArgs, MeshContext>,
  /** null **/
  delegateVotingPowerChanges: InContextSdkMethod<Query['delegateVotingPowerChanges'], QuerydelegateVotingPowerChangesArgs, MeshContext>,
  /** null **/
  governance: InContextSdkMethod<Query['governance'], QuerygovernanceArgs, MeshContext>,
  /** null **/
  governances: InContextSdkMethod<Query['governances'], QuerygovernancesArgs, MeshContext>,
  /** null **/
  governanceFramework: InContextSdkMethod<Query['governanceFramework'], QuerygovernanceFrameworkArgs, MeshContext>,
  /** null **/
  governanceFrameworks: InContextSdkMethod<Query['governanceFrameworks'], QuerygovernanceFrameworksArgs, MeshContext>,
  /** null **/
  proposal: InContextSdkMethod<Query['proposal'], QueryproposalArgs, MeshContext>,
  /** null **/
  proposals: InContextSdkMethod<Query['proposals'], QueryproposalsArgs, MeshContext>,
  /** null **/
  vote: InContextSdkMethod<Query['vote'], QueryvoteArgs, MeshContext>,
  /** null **/
  votes: InContextSdkMethod<Query['votes'], QueryvotesArgs, MeshContext>,
  /** null **/
  tokenHolder: InContextSdkMethod<Query['tokenHolder'], QuerytokenHolderArgs, MeshContext>,
  /** null **/
  tokenHolders: InContextSdkMethod<Query['tokenHolders'], QuerytokenHoldersArgs, MeshContext>,
  /** null **/
  delegate: InContextSdkMethod<Query['delegate'], QuerydelegateArgs, MeshContext>,
  /** null **/
  delegates: InContextSdkMethod<Query['delegates'], QuerydelegatesArgs, MeshContext>,
  /** null **/
  tokenDailySnapshot: InContextSdkMethod<Query['tokenDailySnapshot'], QuerytokenDailySnapshotArgs, MeshContext>,
  /** null **/
  tokenDailySnapshots: InContextSdkMethod<Query['tokenDailySnapshots'], QuerytokenDailySnapshotsArgs, MeshContext>,
  /** null **/
  voteDailySnapshot: InContextSdkMethod<Query['voteDailySnapshot'], QueryvoteDailySnapshotArgs, MeshContext>,
  /** null **/
  voteDailySnapshots: InContextSdkMethod<Query['voteDailySnapshots'], QueryvoteDailySnapshotsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  delegateChange: InContextSdkMethod<Subscription['delegateChange'], SubscriptiondelegateChangeArgs, MeshContext>,
  /** null **/
  delegateChanges: InContextSdkMethod<Subscription['delegateChanges'], SubscriptiondelegateChangesArgs, MeshContext>,
  /** null **/
  delegateVotingPowerChange: InContextSdkMethod<Subscription['delegateVotingPowerChange'], SubscriptiondelegateVotingPowerChangeArgs, MeshContext>,
  /** null **/
  delegateVotingPowerChanges: InContextSdkMethod<Subscription['delegateVotingPowerChanges'], SubscriptiondelegateVotingPowerChangesArgs, MeshContext>,
  /** null **/
  governance: InContextSdkMethod<Subscription['governance'], SubscriptiongovernanceArgs, MeshContext>,
  /** null **/
  governances: InContextSdkMethod<Subscription['governances'], SubscriptiongovernancesArgs, MeshContext>,
  /** null **/
  governanceFramework: InContextSdkMethod<Subscription['governanceFramework'], SubscriptiongovernanceFrameworkArgs, MeshContext>,
  /** null **/
  governanceFrameworks: InContextSdkMethod<Subscription['governanceFrameworks'], SubscriptiongovernanceFrameworksArgs, MeshContext>,
  /** null **/
  proposal: InContextSdkMethod<Subscription['proposal'], SubscriptionproposalArgs, MeshContext>,
  /** null **/
  proposals: InContextSdkMethod<Subscription['proposals'], SubscriptionproposalsArgs, MeshContext>,
  /** null **/
  vote: InContextSdkMethod<Subscription['vote'], SubscriptionvoteArgs, MeshContext>,
  /** null **/
  votes: InContextSdkMethod<Subscription['votes'], SubscriptionvotesArgs, MeshContext>,
  /** null **/
  tokenHolder: InContextSdkMethod<Subscription['tokenHolder'], SubscriptiontokenHolderArgs, MeshContext>,
  /** null **/
  tokenHolders: InContextSdkMethod<Subscription['tokenHolders'], SubscriptiontokenHoldersArgs, MeshContext>,
  /** null **/
  delegate: InContextSdkMethod<Subscription['delegate'], SubscriptiondelegateArgs, MeshContext>,
  /** null **/
  delegates: InContextSdkMethod<Subscription['delegates'], SubscriptiondelegatesArgs, MeshContext>,
  /** null **/
  tokenDailySnapshot: InContextSdkMethod<Subscription['tokenDailySnapshot'], SubscriptiontokenDailySnapshotArgs, MeshContext>,
  /** null **/
  tokenDailySnapshots: InContextSdkMethod<Subscription['tokenDailySnapshots'], SubscriptiontokenDailySnapshotsArgs, MeshContext>,
  /** null **/
  voteDailySnapshot: InContextSdkMethod<Subscription['voteDailySnapshot'], SubscriptionvoteDailySnapshotArgs, MeshContext>,
  /** null **/
  voteDailySnapshots: InContextSdkMethod<Subscription['voteDailySnapshots'], SubscriptionvoteDailySnapshotsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["ens-governance"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
