import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'businesses.index': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.store': { paramsTuple?: []; params?: {} }
    'businesses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.register_new': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'businesses.index': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'businesses.index': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'businesses.store': { paramsTuple?: []; params?: {} }
    'businesses.register_new': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'businesses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}