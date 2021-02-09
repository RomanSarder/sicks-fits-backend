/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CartItemItemIdUserIdCompoundUniqueInput: { // input type
    itemId: number; // Int!
    userId: number; // Int!
  }
  CartItemWhereUniqueInput: { // input type
    id?: number | null; // Int
    itemId_userId?: NexusGenInputs['CartItemItemIdUserIdCompoundUniqueInput'] | null; // CartItemItemIdUserIdCompoundUniqueInput
  }
  ItemOrderByInput: { // input type
    createdAt?: NexusGenEnums['OrderBy'] | null; // OrderBy
  }
  ItemWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  OrderItemWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  OrderWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  OrderBy: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  CartItem: { // root type
    id: number; // Int!
    itemId: number; // Int!
    quantity: number; // Int!
    userId: number; // Int!
  }
  Item: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    image?: string | null; // String
    largeImage?: string | null; // String
    price: number; // Int!
    title: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Mutation: {};
  Order: { // root type
    charge: string; // String!
    id: number; // Int!
    total: number; // Int!
    userId: number; // Int!
  }
  OrderItem: { // root type
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    price: number; // Int!
    quantity: number; // Int!
    title: string; // String!
  }
  Query: {};
  Role: { // root type
    canManageCart: boolean; // Boolean!
    canManageOrders: boolean; // Boolean!
    canManageProducts: boolean; // Boolean!
    canManageRoles: boolean; // Boolean!
    canManageUsers: boolean; // Boolean!
    canSeeOtherUsers: boolean; // Boolean!
    id: number; // Int!
    name: string; // String!
  }
  SucessMessage: { // root type
    message?: string | null; // String
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  CartItem: { // field return type
    id: number; // Int!
    item: NexusGenRootTypes['Item']; // Item!
    itemId: number; // Int!
    quantity: number; // Int!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  Item: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    image: string | null; // String
    largeImage: string | null; // String
    price: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Mutation: { // field return type
    addToCart: NexusGenRootTypes['CartItem'] | null; // CartItem
    checkout: NexusGenRootTypes['Order']; // Order!
    createItem: NexusGenRootTypes['Item']; // Item!
    deleteCartItem: NexusGenRootTypes['CartItem']; // CartItem!
    deleteItem: NexusGenRootTypes['Item']; // Item!
    requestPasswordReset: NexusGenRootTypes['SucessMessage'] | null; // SucessMessage
    resetPassword: NexusGenRootTypes['User'] | null; // User
    signin: NexusGenRootTypes['User'] | null; // User
    signout: NexusGenRootTypes['SucessMessage'] | null; // SucessMessage
    signup: NexusGenRootTypes['User'] | null; // User
    updateItem: NexusGenRootTypes['Item']; // Item!
  }
  Order: { // field return type
    charge: string; // String!
    id: number; // Int!
    items: NexusGenRootTypes['OrderItem'][]; // [OrderItem!]!
    label: string | null; // String
    total: number; // Int!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  OrderItem: { // field return type
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    order: NexusGenRootTypes['Order']; // Order!
    price: number; // Int!
    quantity: number; // Int!
    title: string; // String!
  }
  Query: { // field return type
    allOrders: NexusGenRootTypes['Order'][] | null; // [Order!]
    getMyCart: Array<NexusGenRootTypes['CartItem'] | null> | null; // [CartItem]
    item: NexusGenRootTypes['Item'] | null; // Item
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    itemsCount: number; // Int!
    me: NexusGenRootTypes['User'] | null; // User
    order: NexusGenRootTypes['Order'] | null; // Order
    searchItems: NexusGenRootTypes['Item'][] | null; // [Item!]
    user: NexusGenRootTypes['User'] | null; // User
  }
  Role: { // field return type
    assignedTo: NexusGenRootTypes['User'][]; // [User!]!
    canManageCart: boolean; // Boolean!
    canManageOrders: boolean; // Boolean!
    canManageProducts: boolean; // Boolean!
    canManageRoles: boolean; // Boolean!
    canManageUsers: boolean; // Boolean!
    canSeeOtherUsers: boolean; // Boolean!
    id: number; // Int!
    name: string; // String!
  }
  SucessMessage: { // field return type
    message: string | null; // String
  }
  User: { // field return type
    cart: NexusGenRootTypes['CartItem'][]; // [CartItem!]!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    orders: NexusGenRootTypes['Order'][]; // [Order!]!
    role: NexusGenRootTypes['Role']; // Role!
  }
}

export interface NexusGenFieldTypeNames {
  CartItem: { // field return type name
    id: 'Int'
    item: 'Item'
    itemId: 'Int'
    quantity: 'Int'
    user: 'User'
    userId: 'Int'
  }
  Item: { // field return type name
    createdAt: 'DateTime'
    description: 'String'
    id: 'Int'
    image: 'String'
    largeImage: 'String'
    price: 'Int'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    addToCart: 'CartItem'
    checkout: 'Order'
    createItem: 'Item'
    deleteCartItem: 'CartItem'
    deleteItem: 'Item'
    requestPasswordReset: 'SucessMessage'
    resetPassword: 'User'
    signin: 'User'
    signout: 'SucessMessage'
    signup: 'User'
    updateItem: 'Item'
  }
  Order: { // field return type name
    charge: 'String'
    id: 'Int'
    items: 'OrderItem'
    label: 'String'
    total: 'Int'
    user: 'User'
    userId: 'Int'
  }
  OrderItem: { // field return type name
    description: 'String'
    id: 'Int'
    image: 'String'
    order: 'Order'
    price: 'Int'
    quantity: 'Int'
    title: 'String'
  }
  Query: { // field return type name
    allOrders: 'Order'
    getMyCart: 'CartItem'
    item: 'Item'
    items: 'Item'
    itemsCount: 'Int'
    me: 'User'
    order: 'Order'
    searchItems: 'Item'
    user: 'User'
  }
  Role: { // field return type name
    assignedTo: 'User'
    canManageCart: 'Boolean'
    canManageOrders: 'Boolean'
    canManageProducts: 'Boolean'
    canManageRoles: 'Boolean'
    canManageUsers: 'Boolean'
    canSeeOtherUsers: 'Boolean'
    id: 'Int'
    name: 'String'
  }
  SucessMessage: { // field return type name
    message: 'String'
  }
  User: { // field return type name
    cart: 'CartItem'
    email: 'String'
    id: 'Int'
    name: 'String'
    orders: 'Order'
    role: 'Role'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addToCart: { // args
      itemId: number; // Int!
    }
    checkout: { // args
      token: string; // String!
    }
    createItem: { // args
      description: string; // String!
      image?: string | null; // String
      largeImage?: string | null; // String
      price: number; // Int!
      title: string; // String!
    }
    deleteCartItem: { // args
      id: number; // Int!
    }
    deleteItem: { // args
      id: number; // Int!
    }
    requestPasswordReset: { // args
      email: string; // String!
    }
    resetPassword: { // args
      confirmPassword: string; // String!
      password: string; // String!
      resetToken: string; // String!
    }
    signin: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    updateItem: { // args
      description?: string | null; // String
      id: number; // Int!
      image?: string | null; // String
      largeImage?: string | null; // String
      price?: number | null; // Int
      title?: string | null; // String
    }
  }
  Order: {
    items: { // args
      after?: NexusGenInputs['OrderItemWhereUniqueInput'] | null; // OrderItemWhereUniqueInput
      before?: NexusGenInputs['OrderItemWhereUniqueInput'] | null; // OrderItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Query: {
    item: { // args
      where: NexusGenInputs['ItemWhereUniqueInput']; // ItemWhereUniqueInput!
    }
    items: { // args
      orderBy?: NexusGenInputs['ItemOrderByInput'] | null; // ItemOrderByInput
      search?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    order: { // args
      where: NexusGenInputs['OrderWhereUniqueInput']; // OrderWhereUniqueInput!
    }
    searchItems: { // args
      searchString: string; // String!
    }
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
  }
  Role: {
    assignedTo: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  User: {
    cart: { // args
      after?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      before?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    orders: { // args
      after?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      before?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}