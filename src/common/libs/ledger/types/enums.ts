/**
 * transaction types
 */

/**
 * Genuine transaction types
 * @enum {string}
 */
export enum TransactionTypes {
    Payment = 'Payment',
    TrustSet = 'TrustSet',
    AccountDelete = 'AccountDelete',
    AccountSet = 'AccountSet',
    OfferCreate = 'OfferCreate',
    OfferCancel = 'OfferCancel',
    EscrowCreate = 'EscrowCreate',
    EscrowCancel = 'EscrowCancel',
    EscrowFinish = 'EscrowFinish',
    SetRegularKey = 'SetRegularKey',
    SignerListSet = 'SignerListSet',
    DepositPreauth = 'DepositPreauth',
    CheckCreate = 'CheckCreate',
    CheckCash = 'CheckCash',
    CheckCancel = 'CheckCancel',
    TicketCreate = 'TicketCreate',
    PaymentChannelCreate = 'PaymentChannelCreate',
    PaymentChannelClaim = 'PaymentChannelClaim',
    PaymentChannelFund = 'PaymentChannelFund',
    NFTokenMint = 'NFTokenMint',
    NFTokenBurn = 'NFTokenBurn',
    NFTokenCreateOffer = 'NFTokenCreateOffer',
    NFTokenAcceptOffer = 'NFTokenAcceptOffer',
    NFTokenCancelOffer = 'NFTokenCancelOffer',
    SetHook = 'SetHook',
    ClaimReward = 'ClaimReward',
    Invoke = 'Invoke',
    Import = 'Import',
    URITokenMint = 'URITokenMint',
    URITokenBurn = 'URITokenBurn',
    URITokenBuy = 'URITokenBuy',
    URITokenCreateSellOffer = 'URITokenCreateSellOffer',
    URITokenCancelSellOffer = 'URITokenCancelSellOffer',
    GenesisMint = 'GenesisMint',
    EnableAmendment = 'EnableAmendment',
    AMMBid = 'AMMBid',
    AMMCreate = 'AMMCreate',
    AMMDelete = 'AMMDelete',
    AMMDeposit = 'AMMDeposit',
    AMMVote = 'AMMVote',
    AMMWithdraw = 'AMMWithdraw',
    Remit = 'Remit',
}

/**
 * Pseudo transaction types
 * @enum {string}
 */
export enum PseudoTransactionTypes {
    SignIn = 'SignIn',
    PaymentChannelAuthorize = 'PaymentChannelAuthorize',
}

/**
 * Fallback enum types
 * @enum {string}
 */
export enum FallbackTypes {
    FallbackTransaction = '__falback_transactions',
}

/**
 * Ledger entry object types
 * @enum {string}
 */
export enum LedgerEntryTypes {
    AccountRoot = 'AccountRoot',
    Amendments = 'Amendments',
    AMM = 'AMM',
    Check = 'Check',
    DepositPreauth = 'DepositPreauth',
    DirectoryNode = 'DirectoryNode',
    Escrow = 'Escrow',
    FeeSettings = 'FeeSettings',
    LedgerHashes = 'LedgerHashes',
    NegativeUNL = 'NegativeUNL',
    NFTokenOffer = 'NFTokenOffer',
    NFTokenPage = 'NFTokenPage',
    Offer = 'Offer',
    Ticket = 'Ticket',
    PayChannel = 'PayChannel',
    RippleState = 'RippleState',
    SignerList = 'SignerList',
}

/**
 * Enum representing various types of class instances.
 * @enum {string}
 */
export enum InstanceTypes {
    GenuineTransaction = 'GenuineTransaction', // know transaction type,
    FallbackTransaction = 'FallbackTransaction', // any other transaction types
    PseudoTransaction = 'PseudoTransaction', // pseudo transactions, which doesn't contain field TransactionType
    LedgerObject = 'LedgerObject', // known Ledger object instances
}
