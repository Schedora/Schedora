import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'businesses.index': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.store': { paramsTuple?: []; params?: {} }
    'businesses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.register_new': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.upload_images': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.set_cover': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'imageId': ParamValue} }
    'businesses.set_banner': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'imageId': ParamValue} }
    'businesses.delete_image': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'imageId': ParamValue} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'businesses.index': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'businesses.index': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'businesses.store': { paramsTuple?: []; params?: {} }
    'businesses.register_new': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.upload_images': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'businesses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.set_cover': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'imageId': ParamValue} }
    'businesses.set_banner': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'imageId': ParamValue} }
  }
  DELETE: {
    'businesses.delete_image': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'imageId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}