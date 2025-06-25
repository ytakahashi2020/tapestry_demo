export interface BaseTokenInfo {
  interface: string
  id: string
  content: {
    $schema?: string
    json_uri?: string
    files?: Array<{
      uri: string
      cdn_uri?: string
      type: string
    }>
    metadata: {
      name: string
      symbol: string
      description: string
      attributes?: Array<{
        trait_type: string
        value: string
      }>
    }
    links?: {
      image?: string
      external_url?: string
    }
  }
  authorities: Array<{
    address: string
    scopes: string[]
  }>
  ownership: {
    owner: string
    delegate: string | null
    frozen: boolean
    delegated: boolean
    ownership_model: string
  }
  compression?: {
    eligible: boolean
    compressed: boolean
    data_hash: string
    creator_hash: string
    asset_hash: string
    tree: string
    seq: number
    leaf_id: number
  }
  grouping?: Array<{
    group_key: string
    group_value: string
  }>
  royalty?: {
    royalty_model: string
    target: string | null
    percent: number
    basis_points: number
    primary_sale_happened: boolean
    locked: boolean
  }
  creators?: Array<{
    address: string
    verified?: boolean
    share?: number
  }>
  supply: any | null
  mutable: boolean
  burnt: boolean
  plugins?: Record<string, any>
  mpl_core_info?: {
    plugins_json_version: number
  }
  external_plugins?: any[]
}

export interface NFTTokenInfo extends BaseTokenInfo {
  interface:
    | 'MplCoreAsset'
    | 'V1_NFT'
    | 'V2_NFT'
    | 'LEGACY_NFT'
    | 'ProgrammableNFT'
}

export interface FungibleTokenInfo extends BaseTokenInfo {
  interface: 'FungibleToken' | 'FungibleAsset'
  token_info: {
    symbol: string
    supply: number
    decimals: number
    token_program: string
    price_info?: {
      price_per_token: number
      currency: string
      volume_24h?: number
    }
  }
}

export interface TokenResponse {
  jsonrpc: string
  result: NFTTokenInfo | FungibleTokenInfo
  id: string
}

export interface RPCResponse {
  jsonrpc: string
  id: string
  error?: {
    message: string
    code: number
  }
  result?: TokenResponse['result']
}

export type TokenInfo = {
  result?: NFTTokenInfo | FungibleTokenInfo
}
