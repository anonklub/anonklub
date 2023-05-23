// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { EnsGovernanceTypes } from './sources/ens-governance/types';
import type { CryptopunksTypes } from './sources/cryptopunks/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Account: ResolverTypeWrapper<Account>;
  Account_filter: Account_filter;
  Account_orderBy: Account_orderBy;
  Ask: ResolverTypeWrapper<Ask>;
  AskCreated: ResolverTypeWrapper<AskCreated>;
  AskCreated_filter: AskCreated_filter;
  AskCreated_orderBy: AskCreated_orderBy;
  AskRemoved: ResolverTypeWrapper<AskRemoved>;
  AskRemoved_filter: AskRemoved_filter;
  AskRemoved_orderBy: AskRemoved_orderBy;
  Ask_filter: Ask_filter;
  Ask_orderBy: Ask_orderBy;
  Assign: ResolverTypeWrapper<Assign>;
  Assign_filter: Assign_filter;
  Assign_orderBy: Assign_orderBy;
  Bid: ResolverTypeWrapper<Bid>;
  BidCreated: ResolverTypeWrapper<BidCreated>;
  BidCreated_filter: BidCreated_filter;
  BidCreated_orderBy: BidCreated_orderBy;
  BidRemoved: ResolverTypeWrapper<BidRemoved>;
  BidRemoved_filter: BidRemoved_filter;
  BidRemoved_orderBy: BidRemoved_orderBy;
  Bid_filter: Bid_filter;
  Bid_orderBy: Bid_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  CToken: ResolverTypeWrapper<CToken>;
  CToken_filter: CToken_filter;
  CToken_orderBy: CToken_orderBy;
  Contract: ResolverTypeWrapper<Contract>;
  Contract_filter: Contract_filter;
  Contract_orderBy: Contract_orderBy;
  EpnsNotificationCounter: ResolverTypeWrapper<EpnsNotificationCounter>;
  EpnsNotificationCounter_filter: EpnsNotificationCounter_filter;
  EpnsNotificationCounter_orderBy: EpnsNotificationCounter_orderBy;
  EpnsPushNotification: ResolverTypeWrapper<EpnsPushNotification>;
  EpnsPushNotification_filter: EpnsPushNotification_filter;
  EpnsPushNotification_orderBy: EpnsPushNotification_orderBy;
  Event: ResolversTypes['AskCreated'] | ResolversTypes['AskRemoved'] | ResolversTypes['Assign'] | ResolversTypes['BidCreated'] | ResolversTypes['BidRemoved'] | ResolversTypes['Sale'] | ResolversTypes['Transfer'] | ResolversTypes['Unwrap'] | ResolversTypes['Wrap'];
  EventType: EventType;
  Event_filter: Event_filter;
  Event_orderBy: Event_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MetaData: ResolverTypeWrapper<MetaData>;
  MetaData_filter: MetaData_filter;
  MetaData_orderBy: MetaData_orderBy;
  NFT: ResolversTypes['Punk'];
  NFT_filter: NFT_filter;
  NFT_orderBy: NFT_orderBy;
  Offer: ResolversTypes['Ask'] | ResolversTypes['Bid'];
  OfferType: OfferType;
  Offer_filter: Offer_filter;
  Offer_orderBy: Offer_orderBy;
  OrderDirection: OrderDirection;
  Punk: ResolverTypeWrapper<Punk>;
  Punk_filter: Punk_filter;
  Punk_orderBy: Punk_orderBy;
  Sale: ResolverTypeWrapper<Sale>;
  Sale_filter: Sale_filter;
  Sale_orderBy: Sale_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Trait: ResolverTypeWrapper<Trait>;
  TraitType: TraitType;
  Trait_filter: Trait_filter;
  Trait_orderBy: Trait_orderBy;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_filter;
  Transfer_orderBy: Transfer_orderBy;
  Unwrap: ResolverTypeWrapper<Unwrap>;
  Unwrap_filter: Unwrap_filter;
  Unwrap_orderBy: Unwrap_orderBy;
  UserProxy: ResolverTypeWrapper<UserProxy>;
  UserProxy_filter: UserProxy_filter;
  UserProxy_orderBy: UserProxy_orderBy;
  Wrap: ResolverTypeWrapper<Wrap>;
  Wrap_filter: Wrap_filter;
  Wrap_orderBy: Wrap_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  Delegate: ResolverTypeWrapper<Delegate>;
  DelegateChange: ResolverTypeWrapper<DelegateChange>;
  DelegateChange_filter: DelegateChange_filter;
  DelegateChange_orderBy: DelegateChange_orderBy;
  DelegateVotingPowerChange: ResolverTypeWrapper<DelegateVotingPowerChange>;
  DelegateVotingPowerChange_filter: DelegateVotingPowerChange_filter;
  DelegateVotingPowerChange_orderBy: DelegateVotingPowerChange_orderBy;
  Delegate_filter: Delegate_filter;
  Delegate_orderBy: Delegate_orderBy;
  Governance: ResolverTypeWrapper<Governance>;
  GovernanceFramework: ResolverTypeWrapper<GovernanceFramework>;
  GovernanceFrameworkType: GovernanceFrameworkType;
  GovernanceFramework_filter: GovernanceFramework_filter;
  GovernanceFramework_orderBy: GovernanceFramework_orderBy;
  Governance_filter: Governance_filter;
  Governance_orderBy: Governance_orderBy;
  Proposal: ResolverTypeWrapper<Proposal>;
  ProposalState: ProposalState;
  Proposal_filter: Proposal_filter;
  Proposal_orderBy: Proposal_orderBy;
  TokenDailySnapshot: ResolverTypeWrapper<TokenDailySnapshot>;
  TokenDailySnapshot_filter: TokenDailySnapshot_filter;
  TokenDailySnapshot_orderBy: TokenDailySnapshot_orderBy;
  TokenHolder: ResolverTypeWrapper<TokenHolder>;
  TokenHolder_filter: TokenHolder_filter;
  TokenHolder_orderBy: TokenHolder_orderBy;
  Vote: ResolverTypeWrapper<Vote>;
  VoteChoice: VoteChoice;
  VoteDailySnapshot: ResolverTypeWrapper<VoteDailySnapshot>;
  VoteDailySnapshot_filter: VoteDailySnapshot_filter;
  VoteDailySnapshot_orderBy: VoteDailySnapshot_orderBy;
  Vote_filter: Vote_filter;
  Vote_orderBy: Vote_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  Account: Account;
  Account_filter: Account_filter;
  Ask: Ask;
  AskCreated: AskCreated;
  AskCreated_filter: AskCreated_filter;
  AskRemoved: AskRemoved;
  AskRemoved_filter: AskRemoved_filter;
  Ask_filter: Ask_filter;
  Assign: Assign;
  Assign_filter: Assign_filter;
  Bid: Bid;
  BidCreated: BidCreated;
  BidCreated_filter: BidCreated_filter;
  BidRemoved: BidRemoved;
  BidRemoved_filter: BidRemoved_filter;
  Bid_filter: Bid_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  CToken: CToken;
  CToken_filter: CToken_filter;
  Contract: Contract;
  Contract_filter: Contract_filter;
  EpnsNotificationCounter: EpnsNotificationCounter;
  EpnsNotificationCounter_filter: EpnsNotificationCounter_filter;
  EpnsPushNotification: EpnsPushNotification;
  EpnsPushNotification_filter: EpnsPushNotification_filter;
  Event: ResolversParentTypes['AskCreated'] | ResolversParentTypes['AskRemoved'] | ResolversParentTypes['Assign'] | ResolversParentTypes['BidCreated'] | ResolversParentTypes['BidRemoved'] | ResolversParentTypes['Sale'] | ResolversParentTypes['Transfer'] | ResolversParentTypes['Unwrap'] | ResolversParentTypes['Wrap'];
  Event_filter: Event_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MetaData: MetaData;
  MetaData_filter: MetaData_filter;
  NFT: ResolversParentTypes['Punk'];
  NFT_filter: NFT_filter;
  Offer: ResolversParentTypes['Ask'] | ResolversParentTypes['Bid'];
  Offer_filter: Offer_filter;
  Punk: Punk;
  Punk_filter: Punk_filter;
  Sale: Sale;
  Sale_filter: Sale_filter;
  String: Scalars['String'];
  Trait: Trait;
  Trait_filter: Trait_filter;
  Transfer: Transfer;
  Transfer_filter: Transfer_filter;
  Unwrap: Unwrap;
  Unwrap_filter: Unwrap_filter;
  UserProxy: UserProxy;
  UserProxy_filter: UserProxy_filter;
  Wrap: Wrap;
  Wrap_filter: Wrap_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  Delegate: Delegate;
  DelegateChange: DelegateChange;
  DelegateChange_filter: DelegateChange_filter;
  DelegateVotingPowerChange: DelegateVotingPowerChange;
  DelegateVotingPowerChange_filter: DelegateVotingPowerChange_filter;
  Delegate_filter: Delegate_filter;
  Governance: Governance;
  GovernanceFramework: GovernanceFramework;
  GovernanceFramework_filter: GovernanceFramework_filter;
  Governance_filter: Governance_filter;
  Proposal: Proposal;
  Proposal_filter: Proposal_filter;
  TokenDailySnapshot: TokenDailySnapshot;
  TokenDailySnapshot_filter: TokenDailySnapshot_filter;
  TokenHolder: TokenHolder;
  TokenHolder_filter: TokenHolder_filter;
  Vote: Vote;
  VoteDailySnapshot: VoteDailySnapshot;
  VoteDailySnapshot_filter: VoteDailySnapshot_filter;
  Vote_filter: Vote_filter;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  punk?: Resolver<Maybe<ResolversTypes['Punk']>, ParentType, ContextType, RequireFields<QuerypunkArgs, 'id' | 'subgraphError'>>;
  punks?: Resolver<Array<ResolversTypes['Punk']>, ParentType, ContextType, RequireFields<QuerypunksArgs, 'skip' | 'first' | 'subgraphError'>>;
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<QuerymetaDataArgs, 'id' | 'subgraphError'>>;
  metaDatas?: Resolver<Array<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<QuerymetaDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  trait?: Resolver<Maybe<ResolversTypes['Trait']>, ParentType, ContextType, RequireFields<QuerytraitArgs, 'id' | 'subgraphError'>>;
  traits?: Resolver<Array<ResolversTypes['Trait']>, ParentType, ContextType, RequireFields<QuerytraitsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ask?: Resolver<Maybe<ResolversTypes['Ask']>, ParentType, ContextType, RequireFields<QueryaskArgs, 'id' | 'subgraphError'>>;
  asks?: Resolver<Array<ResolversTypes['Ask']>, ParentType, ContextType, RequireFields<QueryasksArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidArgs, 'id' | 'subgraphError'>>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<QuerycontractArgs, 'id' | 'subgraphError'>>;
  contracts?: Resolver<Array<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<QuerycontractsArgs, 'skip' | 'first' | 'subgraphError'>>;
  assign?: Resolver<Maybe<ResolversTypes['Assign']>, ParentType, ContextType, RequireFields<QueryassignArgs, 'id' | 'subgraphError'>>;
  assigns?: Resolver<Array<ResolversTypes['Assign']>, ParentType, ContextType, RequireFields<QueryassignsArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysaleArgs, 'id' | 'subgraphError'>>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  askCreated?: Resolver<Maybe<ResolversTypes['AskCreated']>, ParentType, ContextType, RequireFields<QueryaskCreatedArgs, 'id' | 'subgraphError'>>;
  askCreateds?: Resolver<Array<ResolversTypes['AskCreated']>, ParentType, ContextType, RequireFields<QueryaskCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidCreated?: Resolver<Maybe<ResolversTypes['BidCreated']>, ParentType, ContextType, RequireFields<QuerybidCreatedArgs, 'id' | 'subgraphError'>>;
  bidCreateds?: Resolver<Array<ResolversTypes['BidCreated']>, ParentType, ContextType, RequireFields<QuerybidCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidRemoved?: Resolver<Maybe<ResolversTypes['BidRemoved']>, ParentType, ContextType, RequireFields<QuerybidRemovedArgs, 'id' | 'subgraphError'>>;
  bidRemoveds?: Resolver<Array<ResolversTypes['BidRemoved']>, ParentType, ContextType, RequireFields<QuerybidRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  askRemoved?: Resolver<Maybe<ResolversTypes['AskRemoved']>, ParentType, ContextType, RequireFields<QueryaskRemovedArgs, 'id' | 'subgraphError'>>;
  askRemoveds?: Resolver<Array<ResolversTypes['AskRemoved']>, ParentType, ContextType, RequireFields<QueryaskRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  ctoken?: Resolver<Maybe<ResolversTypes['CToken']>, ParentType, ContextType, RequireFields<QueryctokenArgs, 'id' | 'subgraphError'>>;
  ctokens?: Resolver<Array<ResolversTypes['CToken']>, ParentType, ContextType, RequireFields<QueryctokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  wrap?: Resolver<Maybe<ResolversTypes['Wrap']>, ParentType, ContextType, RequireFields<QuerywrapArgs, 'id' | 'subgraphError'>>;
  wraps?: Resolver<Array<ResolversTypes['Wrap']>, ParentType, ContextType, RequireFields<QuerywrapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unwrap?: Resolver<Maybe<ResolversTypes['Unwrap']>, ParentType, ContextType, RequireFields<QueryunwrapArgs, 'id' | 'subgraphError'>>;
  unwraps?: Resolver<Array<ResolversTypes['Unwrap']>, ParentType, ContextType, RequireFields<QueryunwrapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userProxy?: Resolver<Maybe<ResolversTypes['UserProxy']>, ParentType, ContextType, RequireFields<QueryuserProxyArgs, 'id' | 'subgraphError'>>;
  userProxies?: Resolver<Array<ResolversTypes['UserProxy']>, ParentType, ContextType, RequireFields<QueryuserProxiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  epnsNotificationCounter?: Resolver<Maybe<ResolversTypes['EpnsNotificationCounter']>, ParentType, ContextType, RequireFields<QueryepnsNotificationCounterArgs, 'id' | 'subgraphError'>>;
  epnsNotificationCounters?: Resolver<Array<ResolversTypes['EpnsNotificationCounter']>, ParentType, ContextType, RequireFields<QueryepnsNotificationCountersArgs, 'skip' | 'first' | 'subgraphError'>>;
  epnsPushNotification?: Resolver<Maybe<ResolversTypes['EpnsPushNotification']>, ParentType, ContextType, RequireFields<QueryepnsPushNotificationArgs, 'id' | 'subgraphError'>>;
  epnsPushNotifications?: Resolver<Array<ResolversTypes['EpnsPushNotification']>, ParentType, ContextType, RequireFields<QueryepnsPushNotificationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftArgs, 'id' | 'subgraphError'>>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryeventArgs, 'id' | 'subgraphError'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryeventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  offer?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<QueryofferArgs, 'id' | 'subgraphError'>>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<QueryoffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
  delegateChange?: Resolver<Maybe<ResolversTypes['DelegateChange']>, ParentType, ContextType, RequireFields<QuerydelegateChangeArgs, 'id' | 'subgraphError'>>;
  delegateChanges?: Resolver<Array<ResolversTypes['DelegateChange']>, ParentType, ContextType, RequireFields<QuerydelegateChangesArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegateVotingPowerChange?: Resolver<Maybe<ResolversTypes['DelegateVotingPowerChange']>, ParentType, ContextType, RequireFields<QuerydelegateVotingPowerChangeArgs, 'id' | 'subgraphError'>>;
  delegateVotingPowerChanges?: Resolver<Array<ResolversTypes['DelegateVotingPowerChange']>, ParentType, ContextType, RequireFields<QuerydelegateVotingPowerChangesArgs, 'skip' | 'first' | 'subgraphError'>>;
  governance?: Resolver<Maybe<ResolversTypes['Governance']>, ParentType, ContextType, RequireFields<QuerygovernanceArgs, 'id' | 'subgraphError'>>;
  governances?: Resolver<Array<ResolversTypes['Governance']>, ParentType, ContextType, RequireFields<QuerygovernancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  governanceFramework?: Resolver<Maybe<ResolversTypes['GovernanceFramework']>, ParentType, ContextType, RequireFields<QuerygovernanceFrameworkArgs, 'id' | 'subgraphError'>>;
  governanceFrameworks?: Resolver<Array<ResolversTypes['GovernanceFramework']>, ParentType, ContextType, RequireFields<QuerygovernanceFrameworksArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<QueryproposalArgs, 'id' | 'subgraphError'>>;
  proposals?: Resolver<Array<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<QueryproposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<QueryvoteArgs, 'id' | 'subgraphError'>>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<QueryvotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenHolder?: Resolver<Maybe<ResolversTypes['TokenHolder']>, ParentType, ContextType, RequireFields<QuerytokenHolderArgs, 'id' | 'subgraphError'>>;
  tokenHolders?: Resolver<Array<ResolversTypes['TokenHolder']>, ParentType, ContextType, RequireFields<QuerytokenHoldersArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegate?: Resolver<Maybe<ResolversTypes['Delegate']>, ParentType, ContextType, RequireFields<QuerydelegateArgs, 'id' | 'subgraphError'>>;
  delegates?: Resolver<Array<ResolversTypes['Delegate']>, ParentType, ContextType, RequireFields<QuerydelegatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenDailySnapshot?: Resolver<Maybe<ResolversTypes['TokenDailySnapshot']>, ParentType, ContextType, RequireFields<QuerytokenDailySnapshotArgs, 'id' | 'subgraphError'>>;
  tokenDailySnapshots?: Resolver<Array<ResolversTypes['TokenDailySnapshot']>, ParentType, ContextType, RequireFields<QuerytokenDailySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteDailySnapshot?: Resolver<Maybe<ResolversTypes['VoteDailySnapshot']>, ParentType, ContextType, RequireFields<QueryvoteDailySnapshotArgs, 'id' | 'subgraphError'>>;
  voteDailySnapshots?: Resolver<Array<ResolversTypes['VoteDailySnapshot']>, ParentType, ContextType, RequireFields<QueryvoteDailySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  account?: SubscriptionResolver<Maybe<ResolversTypes['Account']>, "account", ParentType, ContextType, RequireFields<SubscriptionaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: SubscriptionResolver<Array<ResolversTypes['Account']>, "accounts", ParentType, ContextType, RequireFields<SubscriptionaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  punk?: SubscriptionResolver<Maybe<ResolversTypes['Punk']>, "punk", ParentType, ContextType, RequireFields<SubscriptionpunkArgs, 'id' | 'subgraphError'>>;
  punks?: SubscriptionResolver<Array<ResolversTypes['Punk']>, "punks", ParentType, ContextType, RequireFields<SubscriptionpunksArgs, 'skip' | 'first' | 'subgraphError'>>;
  metaData?: SubscriptionResolver<Maybe<ResolversTypes['MetaData']>, "metaData", ParentType, ContextType, RequireFields<SubscriptionmetaDataArgs, 'id' | 'subgraphError'>>;
  metaDatas?: SubscriptionResolver<Array<ResolversTypes['MetaData']>, "metaDatas", ParentType, ContextType, RequireFields<SubscriptionmetaDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  trait?: SubscriptionResolver<Maybe<ResolversTypes['Trait']>, "trait", ParentType, ContextType, RequireFields<SubscriptiontraitArgs, 'id' | 'subgraphError'>>;
  traits?: SubscriptionResolver<Array<ResolversTypes['Trait']>, "traits", ParentType, ContextType, RequireFields<SubscriptiontraitsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ask?: SubscriptionResolver<Maybe<ResolversTypes['Ask']>, "ask", ParentType, ContextType, RequireFields<SubscriptionaskArgs, 'id' | 'subgraphError'>>;
  asks?: SubscriptionResolver<Array<ResolversTypes['Ask']>, "asks", ParentType, ContextType, RequireFields<SubscriptionasksArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: SubscriptionResolver<Maybe<ResolversTypes['Bid']>, "bid", ParentType, ContextType, RequireFields<SubscriptionbidArgs, 'id' | 'subgraphError'>>;
  bids?: SubscriptionResolver<Array<ResolversTypes['Bid']>, "bids", ParentType, ContextType, RequireFields<SubscriptionbidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  contract?: SubscriptionResolver<Maybe<ResolversTypes['Contract']>, "contract", ParentType, ContextType, RequireFields<SubscriptioncontractArgs, 'id' | 'subgraphError'>>;
  contracts?: SubscriptionResolver<Array<ResolversTypes['Contract']>, "contracts", ParentType, ContextType, RequireFields<SubscriptioncontractsArgs, 'skip' | 'first' | 'subgraphError'>>;
  assign?: SubscriptionResolver<Maybe<ResolversTypes['Assign']>, "assign", ParentType, ContextType, RequireFields<SubscriptionassignArgs, 'id' | 'subgraphError'>>;
  assigns?: SubscriptionResolver<Array<ResolversTypes['Assign']>, "assigns", ParentType, ContextType, RequireFields<SubscriptionassignsArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: SubscriptionResolver<Maybe<ResolversTypes['Sale']>, "sale", ParentType, ContextType, RequireFields<SubscriptionsaleArgs, 'id' | 'subgraphError'>>;
  sales?: SubscriptionResolver<Array<ResolversTypes['Sale']>, "sales", ParentType, ContextType, RequireFields<SubscriptionsalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  askCreated?: SubscriptionResolver<Maybe<ResolversTypes['AskCreated']>, "askCreated", ParentType, ContextType, RequireFields<SubscriptionaskCreatedArgs, 'id' | 'subgraphError'>>;
  askCreateds?: SubscriptionResolver<Array<ResolversTypes['AskCreated']>, "askCreateds", ParentType, ContextType, RequireFields<SubscriptionaskCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidCreated?: SubscriptionResolver<Maybe<ResolversTypes['BidCreated']>, "bidCreated", ParentType, ContextType, RequireFields<SubscriptionbidCreatedArgs, 'id' | 'subgraphError'>>;
  bidCreateds?: SubscriptionResolver<Array<ResolversTypes['BidCreated']>, "bidCreateds", ParentType, ContextType, RequireFields<SubscriptionbidCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidRemoved?: SubscriptionResolver<Maybe<ResolversTypes['BidRemoved']>, "bidRemoved", ParentType, ContextType, RequireFields<SubscriptionbidRemovedArgs, 'id' | 'subgraphError'>>;
  bidRemoveds?: SubscriptionResolver<Array<ResolversTypes['BidRemoved']>, "bidRemoveds", ParentType, ContextType, RequireFields<SubscriptionbidRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  askRemoved?: SubscriptionResolver<Maybe<ResolversTypes['AskRemoved']>, "askRemoved", ParentType, ContextType, RequireFields<SubscriptionaskRemovedArgs, 'id' | 'subgraphError'>>;
  askRemoveds?: SubscriptionResolver<Array<ResolversTypes['AskRemoved']>, "askRemoveds", ParentType, ContextType, RequireFields<SubscriptionaskRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: SubscriptionResolver<Maybe<ResolversTypes['Transfer']>, "transfer", ParentType, ContextType, RequireFields<SubscriptiontransferArgs, 'id' | 'subgraphError'>>;
  transfers?: SubscriptionResolver<Array<ResolversTypes['Transfer']>, "transfers", ParentType, ContextType, RequireFields<SubscriptiontransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  ctoken?: SubscriptionResolver<Maybe<ResolversTypes['CToken']>, "ctoken", ParentType, ContextType, RequireFields<SubscriptionctokenArgs, 'id' | 'subgraphError'>>;
  ctokens?: SubscriptionResolver<Array<ResolversTypes['CToken']>, "ctokens", ParentType, ContextType, RequireFields<SubscriptionctokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  wrap?: SubscriptionResolver<Maybe<ResolversTypes['Wrap']>, "wrap", ParentType, ContextType, RequireFields<SubscriptionwrapArgs, 'id' | 'subgraphError'>>;
  wraps?: SubscriptionResolver<Array<ResolversTypes['Wrap']>, "wraps", ParentType, ContextType, RequireFields<SubscriptionwrapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unwrap?: SubscriptionResolver<Maybe<ResolversTypes['Unwrap']>, "unwrap", ParentType, ContextType, RequireFields<SubscriptionunwrapArgs, 'id' | 'subgraphError'>>;
  unwraps?: SubscriptionResolver<Array<ResolversTypes['Unwrap']>, "unwraps", ParentType, ContextType, RequireFields<SubscriptionunwrapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userProxy?: SubscriptionResolver<Maybe<ResolversTypes['UserProxy']>, "userProxy", ParentType, ContextType, RequireFields<SubscriptionuserProxyArgs, 'id' | 'subgraphError'>>;
  userProxies?: SubscriptionResolver<Array<ResolversTypes['UserProxy']>, "userProxies", ParentType, ContextType, RequireFields<SubscriptionuserProxiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  epnsNotificationCounter?: SubscriptionResolver<Maybe<ResolversTypes['EpnsNotificationCounter']>, "epnsNotificationCounter", ParentType, ContextType, RequireFields<SubscriptionepnsNotificationCounterArgs, 'id' | 'subgraphError'>>;
  epnsNotificationCounters?: SubscriptionResolver<Array<ResolversTypes['EpnsNotificationCounter']>, "epnsNotificationCounters", ParentType, ContextType, RequireFields<SubscriptionepnsNotificationCountersArgs, 'skip' | 'first' | 'subgraphError'>>;
  epnsPushNotification?: SubscriptionResolver<Maybe<ResolversTypes['EpnsPushNotification']>, "epnsPushNotification", ParentType, ContextType, RequireFields<SubscriptionepnsPushNotificationArgs, 'id' | 'subgraphError'>>;
  epnsPushNotifications?: SubscriptionResolver<Array<ResolversTypes['EpnsPushNotification']>, "epnsPushNotifications", ParentType, ContextType, RequireFields<SubscriptionepnsPushNotificationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nft?: SubscriptionResolver<Maybe<ResolversTypes['NFT']>, "nft", ParentType, ContextType, RequireFields<SubscriptionnftArgs, 'id' | 'subgraphError'>>;
  nfts?: SubscriptionResolver<Array<ResolversTypes['NFT']>, "nfts", ParentType, ContextType, RequireFields<SubscriptionnftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  event?: SubscriptionResolver<Maybe<ResolversTypes['Event']>, "event", ParentType, ContextType, RequireFields<SubscriptioneventArgs, 'id' | 'subgraphError'>>;
  events?: SubscriptionResolver<Array<ResolversTypes['Event']>, "events", ParentType, ContextType, RequireFields<SubscriptioneventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  offer?: SubscriptionResolver<Maybe<ResolversTypes['Offer']>, "offer", ParentType, ContextType, RequireFields<SubscriptionofferArgs, 'id' | 'subgraphError'>>;
  offers?: SubscriptionResolver<Array<ResolversTypes['Offer']>, "offers", ParentType, ContextType, RequireFields<SubscriptionoffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
  delegateChange?: SubscriptionResolver<Maybe<ResolversTypes['DelegateChange']>, "delegateChange", ParentType, ContextType, RequireFields<SubscriptiondelegateChangeArgs, 'id' | 'subgraphError'>>;
  delegateChanges?: SubscriptionResolver<Array<ResolversTypes['DelegateChange']>, "delegateChanges", ParentType, ContextType, RequireFields<SubscriptiondelegateChangesArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegateVotingPowerChange?: SubscriptionResolver<Maybe<ResolversTypes['DelegateVotingPowerChange']>, "delegateVotingPowerChange", ParentType, ContextType, RequireFields<SubscriptiondelegateVotingPowerChangeArgs, 'id' | 'subgraphError'>>;
  delegateVotingPowerChanges?: SubscriptionResolver<Array<ResolversTypes['DelegateVotingPowerChange']>, "delegateVotingPowerChanges", ParentType, ContextType, RequireFields<SubscriptiondelegateVotingPowerChangesArgs, 'skip' | 'first' | 'subgraphError'>>;
  governance?: SubscriptionResolver<Maybe<ResolversTypes['Governance']>, "governance", ParentType, ContextType, RequireFields<SubscriptiongovernanceArgs, 'id' | 'subgraphError'>>;
  governances?: SubscriptionResolver<Array<ResolversTypes['Governance']>, "governances", ParentType, ContextType, RequireFields<SubscriptiongovernancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  governanceFramework?: SubscriptionResolver<Maybe<ResolversTypes['GovernanceFramework']>, "governanceFramework", ParentType, ContextType, RequireFields<SubscriptiongovernanceFrameworkArgs, 'id' | 'subgraphError'>>;
  governanceFrameworks?: SubscriptionResolver<Array<ResolversTypes['GovernanceFramework']>, "governanceFrameworks", ParentType, ContextType, RequireFields<SubscriptiongovernanceFrameworksArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposal?: SubscriptionResolver<Maybe<ResolversTypes['Proposal']>, "proposal", ParentType, ContextType, RequireFields<SubscriptionproposalArgs, 'id' | 'subgraphError'>>;
  proposals?: SubscriptionResolver<Array<ResolversTypes['Proposal']>, "proposals", ParentType, ContextType, RequireFields<SubscriptionproposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  vote?: SubscriptionResolver<Maybe<ResolversTypes['Vote']>, "vote", ParentType, ContextType, RequireFields<SubscriptionvoteArgs, 'id' | 'subgraphError'>>;
  votes?: SubscriptionResolver<Array<ResolversTypes['Vote']>, "votes", ParentType, ContextType, RequireFields<SubscriptionvotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenHolder?: SubscriptionResolver<Maybe<ResolversTypes['TokenHolder']>, "tokenHolder", ParentType, ContextType, RequireFields<SubscriptiontokenHolderArgs, 'id' | 'subgraphError'>>;
  tokenHolders?: SubscriptionResolver<Array<ResolversTypes['TokenHolder']>, "tokenHolders", ParentType, ContextType, RequireFields<SubscriptiontokenHoldersArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegate?: SubscriptionResolver<Maybe<ResolversTypes['Delegate']>, "delegate", ParentType, ContextType, RequireFields<SubscriptiondelegateArgs, 'id' | 'subgraphError'>>;
  delegates?: SubscriptionResolver<Array<ResolversTypes['Delegate']>, "delegates", ParentType, ContextType, RequireFields<SubscriptiondelegatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenDailySnapshot?: SubscriptionResolver<Maybe<ResolversTypes['TokenDailySnapshot']>, "tokenDailySnapshot", ParentType, ContextType, RequireFields<SubscriptiontokenDailySnapshotArgs, 'id' | 'subgraphError'>>;
  tokenDailySnapshots?: SubscriptionResolver<Array<ResolversTypes['TokenDailySnapshot']>, "tokenDailySnapshots", ParentType, ContextType, RequireFields<SubscriptiontokenDailySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteDailySnapshot?: SubscriptionResolver<Maybe<ResolversTypes['VoteDailySnapshot']>, "voteDailySnapshot", ParentType, ContextType, RequireFields<SubscriptionvoteDailySnapshotArgs, 'id' | 'subgraphError'>>;
  voteDailySnapshots?: SubscriptionResolver<Array<ResolversTypes['VoteDailySnapshot']>, "voteDailySnapshots", ParentType, ContextType, RequireFields<SubscriptionvoteDailySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type AccountResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  punksOwned?: Resolver<Maybe<Array<ResolversTypes['Punk']>>, ParentType, ContextType, RequireFields<AccountpunksOwnedArgs, 'skip' | 'first'>>;
  bought?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<AccountboughtArgs, 'skip' | 'first'>>;
  nftsOwned?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<AccountnftsOwnedArgs, 'skip' | 'first'>>;
  assigned?: Resolver<Array<ResolversTypes['Assign']>, ParentType, ContextType, RequireFields<AccountassignedArgs, 'skip' | 'first'>>;
  sent?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<AccountsentArgs, 'skip' | 'first'>>;
  received?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<AccountreceivedArgs, 'skip' | 'first'>>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<AccountbidsArgs, 'skip' | 'first'>>;
  asks?: Resolver<Array<ResolversTypes['Ask']>, ParentType, ContextType, RequireFields<AccountasksArgs, 'skip' | 'first'>>;
  numberOfPunksOwned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numberOfPunksAssigned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numberOfTransfers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numberOfSales?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numberOfPurchases?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSpent?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalEarned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  averageAmountSpent?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  accountUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AskResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Ask'] = ResolversParentTypes['Ask']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  removed?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  offerType?: Resolver<ResolversTypes['OfferType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AskCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AskCreated'] = ResolversParentTypes['AskCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  ask?: Resolver<Maybe<ResolversTypes['Ask']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AskRemovedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AskRemoved'] = ResolversParentTypes['AskRemoved']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ask?: Resolver<ResolversTypes['Ask'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssignResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Assign'] = ResolversParentTypes['Assign']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bid'] = ResolversParentTypes['Bid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  removed?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  offerType?: Resolver<ResolversTypes['OfferType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BidCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BidCreated'] = ResolversParentTypes['BidCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  bid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BidRemovedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BidRemoved'] = ResolversParentTypes['BidRemoved']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  bid?: Resolver<ResolversTypes['Bid'], ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CTokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CToken'] = ResolversParentTypes['CToken']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  punkId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  referenceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContractResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Contract'] = ResolversParentTypes['Contract']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSales?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalAmountTraded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  imageHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EpnsNotificationCounterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['EpnsNotificationCounter'] = ResolversParentTypes['EpnsNotificationCounter']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EpnsPushNotificationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['EpnsPushNotification'] = ResolversParentTypes['EpnsPushNotification']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notificationNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notification?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AskCreated' | 'AskRemoved' | 'Assign' | 'BidCreated' | 'BidRemoved' | 'Sale' | 'Transfer' | 'Unwrap' | 'Wrap', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
}>;

export type MetaDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MetaData'] = ResolversParentTypes['MetaData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  svg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  punk?: Resolver<ResolversTypes['Punk'], ParentType, ContextType>;
  traits?: Resolver<Array<ResolversTypes['Trait']>, ParentType, ContextType, RequireFields<MetaDatatraitsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NFTResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NFT'] = ResolversParentTypes['NFT']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Punk', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  numberOfTransfers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numberOfSales?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<NFTeventsArgs, 'skip' | 'first'>>;
  currentAsk?: Resolver<Maybe<ResolversTypes['Ask']>, ParentType, ContextType>;
  currentBid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType>;
}>;

export type OfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Ask' | 'Bid', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  removed?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  offerType?: Resolver<ResolversTypes['OfferType'], ParentType, ContextType>;
}>;

export type PunkResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Punk'] = ResolversParentTypes['Punk']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transferedTo?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  assignedTo?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  purchasedBy?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  wrapped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<PunkeventsArgs, 'skip' | 'first'>>;
  currentAsk?: Resolver<Maybe<ResolversTypes['Ask']>, ParentType, ContextType>;
  currentBid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType>;
  currentAskCreated?: Resolver<Maybe<ResolversTypes['AskCreated']>, ParentType, ContextType>;
  currentBidCreated?: Resolver<Maybe<ResolversTypes['BidCreated']>, ParentType, ContextType>;
  numberOfTransfers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numberOfSales?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentAskRemoved?: Resolver<Maybe<ResolversTypes['AskRemoved']>, ParentType, ContextType>;
  currentBidRemoved?: Resolver<Maybe<ResolversTypes['BidRemoved']>, ParentType, ContextType>;
  totalAmountSpentOnPunk?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  averageSalePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TraitResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Trait'] = ResolversParentTypes['Trait']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TraitType'], ParentType, ContextType>;
  metaDatas?: Resolver<Array<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<TraitmetaDatasArgs, 'skip' | 'first'>>;
  numberOfNfts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnwrapResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Unwrap'] = ResolversParentTypes['Unwrap']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserProxyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserProxy'] = ResolversParentTypes['UserProxy']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WrapResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Wrap'] = ResolversParentTypes['Wrap']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  logNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Delegate'] = ResolversParentTypes['Delegate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  delegatedVotesRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatedVotes?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  tokenHoldersRepresentedAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tokenHoldersRepresented?: Resolver<Array<ResolversTypes['TokenHolder']>, ParentType, ContextType, RequireFields<DelegatetokenHoldersRepresentedArgs, 'skip' | 'first'>>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<DelegatevotesArgs, 'skip' | 'first'>>;
  numberVotes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  proposals?: Resolver<Array<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<DelegateproposalsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegateChangeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DelegateChange'] = ResolversParentTypes['DelegateChange']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  previousDelegate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txnHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegateVotingPowerChangeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DelegateVotingPowerChange'] = ResolversParentTypes['DelegateVotingPowerChange']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  previousBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  newBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txnHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GovernanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Governance'] = ResolversParentTypes['Governance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalTokenSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentTokenHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokenHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentDelegates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDelegates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatedVotesRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatedVotes?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  proposals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalsQueued?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalsExecuted?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalsCanceled?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GovernanceFrameworkResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GovernanceFramework'] = ResolversParentTypes['GovernanceFramework']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['GovernanceFrameworkType'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timelockAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votingDelay?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  votingPeriod?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalThreshold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quorumVotes?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  quorumNumerator?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  quorumDenominator?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Proposal'] = ResolversParentTypes['Proposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  txnHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  governanceFramework?: Resolver<ResolversTypes['GovernanceFramework'], ParentType, ContextType>;
  proposer?: Resolver<ResolversTypes['Delegate'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['ProposalState'], ParentType, ContextType>;
  quorumVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenHoldersAtStart?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatesAtStart?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  againstDelegateVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  forDelegateVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  abstainDelegateVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDelegateVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  againstWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  forWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  abstainWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<ProposalvotesArgs, 'skip' | 'first'>>;
  creationBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creationTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  startBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queueTxnHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  queueBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  queueTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executionETA?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executionTxnHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  executionBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executionTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  cancellationTxnHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancellationBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  cancellationTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  targets?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['BigInt']>>, ParentType, ContextType>;
  signatures?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  calldatas?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenDailySnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenDailySnapshot'] = ResolversParentTypes['TokenDailySnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenHolderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenHolder'] = ResolversParentTypes['TokenHolder']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  delegate?: Resolver<Maybe<ResolversTypes['Delegate']>, ParentType, ContextType>;
  tokenBalanceRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalTokensHeldRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensHeld?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  choice?: Resolver<ResolversTypes['VoteChoice'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voter?: Resolver<ResolversTypes['Delegate'], ParentType, ContextType>;
  proposal?: Resolver<ResolversTypes['Proposal'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txnHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteDailySnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VoteDailySnapshot'] = ResolversParentTypes['VoteDailySnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proposal?: Resolver<ResolversTypes['Proposal'], ParentType, ContextType>;
  forWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  againstWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  abstainWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalWeightedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  Ask?: AskResolvers<ContextType>;
  AskCreated?: AskCreatedResolvers<ContextType>;
  AskRemoved?: AskRemovedResolvers<ContextType>;
  Assign?: AssignResolvers<ContextType>;
  Bid?: BidResolvers<ContextType>;
  BidCreated?: BidCreatedResolvers<ContextType>;
  BidRemoved?: BidRemovedResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  CToken?: CTokenResolvers<ContextType>;
  Contract?: ContractResolvers<ContextType>;
  EpnsNotificationCounter?: EpnsNotificationCounterResolvers<ContextType>;
  EpnsPushNotification?: EpnsPushNotificationResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  MetaData?: MetaDataResolvers<ContextType>;
  NFT?: NFTResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  Punk?: PunkResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  Trait?: TraitResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  Unwrap?: UnwrapResolvers<ContextType>;
  UserProxy?: UserProxyResolvers<ContextType>;
  Wrap?: WrapResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  Delegate?: DelegateResolvers<ContextType>;
  DelegateChange?: DelegateChangeResolvers<ContextType>;
  DelegateVotingPowerChange?: DelegateVotingPowerChangeResolvers<ContextType>;
  Governance?: GovernanceResolvers<ContextType>;
  GovernanceFramework?: GovernanceFrameworkResolvers<ContextType>;
  Proposal?: ProposalResolvers<ContextType>;
  TokenDailySnapshot?: TokenDailySnapshotResolvers<ContextType>;
  TokenHolder?: TokenHolderResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  VoteDailySnapshot?: VoteDailySnapshotResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = CryptopunksTypes.Context & EnsGovernanceTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/cryptopunks/introspectionSchema":
      return import("./sources/cryptopunks/introspectionSchema") as T;
    
    case ".graphclient/sources/ens-governance/introspectionSchema":
      return import("./sources/ens-governance/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const ensGovernanceTransforms = [];
const cryptopunksTransforms = [];
const additionalTypeDefs = [] as any[];
const ensGovernanceHandler = new GraphqlHandler({
              name: "ens-governance",
              config: {"endpoint":"https://gateway.thegraph.com/api/6d6a8d42c02bc22a2bc7a972ffc40d54/subgraphs/id/F7MznC87sv5y5jNUaBSrKFgCqTqP9Vgc11xcreZQpX7e"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("ens-governance"),
              logger: logger.child("ens-governance"),
              importFn,
            });
const cryptopunksHandler = new GraphqlHandler({
              name: "cryptopunks",
              config: {"endpoint":"https://gateway.thegraph.com/api/6d6a8d42c02bc22a2bc7a972ffc40d54/subgraphs/id/YqMJatbgbqy1GodtbYZv4U9NzyaScCgSF7CAE5ivAM7"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("cryptopunks"),
              logger: logger.child("cryptopunks"),
              importFn,
            });
sources[0] = {
          name: 'ens-governance',
          handler: ensGovernanceHandler,
          transforms: ensGovernanceTransforms
        }
sources[1] = {
          name: 'cryptopunks',
          handler: cryptopunksHandler,
          transforms: cryptopunksTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: VotersPerProposalDocument,
        get rawSDL() {
          return printWithCache(VotersPerProposalDocument);
        },
        location: 'VotersPerProposalDocument.graphql'
      },{
        document: PunkOwnersDocument,
        get rawSDL() {
          return printWithCache(PunkOwnersDocument);
        },
        location: 'PunkOwnersDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type VotersPerProposalQueryVariables = Exact<{
  id: Scalars['ID'];
  choice?: InputMaybe<VoteChoice>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type VotersPerProposalQuery = { proposal?: Maybe<(
    Pick<Proposal, 'state'>
    & { votes: Array<{ voter: Pick<Delegate, 'id'> }> }
  )> };

export type PunkOwnersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PunkOwnersQuery = { punks: Array<{ owner: Pick<Account, 'id'> }> };


export const VotersPerProposalDocument = gql`
    query VotersPerProposal($id: ID!, $choice: VoteChoice, $skip: Int) {
  proposal(id: $id) {
    state
    votes(first: 1000, skip: $skip, where: {choice: $choice}) {
      voter {
        id
      }
    }
  }
}
    ` as unknown as DocumentNode<VotersPerProposalQuery, VotersPerProposalQueryVariables>;
export const PunkOwnersDocument = gql`
    query PunkOwners($skip: Int) {
  punks(first: 1000, skip: $skip) {
    owner {
      id
    }
  }
}
    ` as unknown as DocumentNode<PunkOwnersQuery, PunkOwnersQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    VotersPerProposal(variables: VotersPerProposalQueryVariables, options?: C): Promise<VotersPerProposalQuery> {
      return requester<VotersPerProposalQuery, VotersPerProposalQueryVariables>(VotersPerProposalDocument, variables, options) as Promise<VotersPerProposalQuery>;
    },
    PunkOwners(variables?: PunkOwnersQueryVariables, options?: C): Promise<PunkOwnersQuery> {
      return requester<PunkOwnersQuery, PunkOwnersQueryVariables>(PunkOwnersDocument, variables, options) as Promise<PunkOwnersQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;