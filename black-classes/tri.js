import * as r from "../black-readers.js"

export default {

  "TriColorSequencer": {
    functions: r.array,
    name: r.string,
    value: r.color
  },

  "TriCurveSet": {
    bindings: r.array,
    curves: r.array,
    name: r.string,
    playOnLoad: r.boolean,
    ranges: r.array,
    scale: r.float,
    useSimTimeRebase: r.boolean
  },

  "TriEventCurve": {
    extrapolation: r.uint,
    name: r.string,
    keys: r.array,
    value: r.ushort
  },

  "TriEventKey": {
    time: r.float,
    value: r.ushort
  },

  "TriFloat": {
    value: r.float
  },

  "TriGeometryRes": {

  },

  "TriMatrix": {
    _11: r.float,
    _12: r.float,
    _13: r.float,
    _14: r.float,
    _21: r.float,
    _22: r.float,
    _23: r.float,
    _24: r.float,
    _31: r.float,
    _32: r.float,
    _33: r.float,
    _34: r.float,
    _41: r.float,
    _42: r.float,
    _43: r.float,
    _44: r.float
  },

  "TriObserverLocal": {
    front: r.vector3,
    name: r.string,
    observer: r.object,
    position: r.vector3
  },

  "TriPerlinCurve": {
    alpha: r.float,
    beta: r.float,
    N: r.uint,
    name: r.string,
    offset: r.float,
    scale: r.float,
    speed: r.float,
    value: r.float
  },

  "TriTextureParameter": {
    name: r.string,
    resourcePath: r.path
  },

  "TriTransformParameter": {
    name: r.string,
    rotation: r.quaternion
  },

  "TriValueBinding": {
    destinationObject: r.object,
    destinationAttribute: r.string,
    name: r.string,
    offset: r.vector4,
    scale: r.float,
    sourceObject: r.object,
    sourceAttribute: r.string
  },

  "TriVariableParameter": {
    name: r.string,
    variableName: r.string
  }

}
