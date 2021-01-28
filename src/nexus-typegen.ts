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
  ItemOrderByInput: { // input type
    createdAt?: NexusGenEnums['OrderBy'] | null; // OrderBy
  }
  ItemWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  OrderBy: "asc" | "desc"
  Permission: "ADMIN" | "ITEMCREATE" | "ITEMDELETE" | "ITEMUPDATE" | "PERMISSIONUPDATE" | "USER"
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
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
    permissions: NexusGenEnums['Permission'][]; // [Permission!]!
    resetToken?: string | null; // String
    resetTokenExpiry?: number | null; // Float
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
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
    createItem: NexusGenRootTypes['Item']; // Item!
    deleteItem: NexusGenRootTypes['Item']; // Item!
    signup: NexusGenRootTypes['User'] | null; // User
    updateItem: NexusGenRootTypes['Item']; // Item!
  }
  Query: { // field return type
    item: NexusGenRootTypes['Item'] | null; // Item
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    itemsCount: number; // Int!
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
    permissions: NexusGenEnums['Permission'][]; // [Permission!]!
    resetToken: string | null; // String
    resetTokenExpiry: number | null; // Float
  }
}

export interface NexusGenFieldTypeNames {
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
    createItem: 'Item'
    deleteItem: 'Item'
    signup: 'User'
    updateItem: 'Item'
  }
  Query: { // field return type name
    item: 'Item'
    items: 'Item'
    itemsCount: 'Int'
    user: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    password: 'String'
    permissions: 'Permission'
    resetToken: 'String'
    resetTokenExpiry: 'Float'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createItem: { // args
      description: string; // String!
      image?: string | null; // String
      largeImage?: string | null; // String
      price: number; // Int!
      title: string; // String!
    }
    deleteItem: { // args
      id: number; // Int!
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
  Query: {
    item: { // args
      where: NexusGenInputs['ItemWhereUniqueInput']; // ItemWhereUniqueInput!
    }
    items: { // args
      orderBy?: NexusGenInputs['ItemOrderByInput'] | null; // ItemOrderByInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
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