import * as r from "../black-readers.js"

export default {

  "AudEmitter": {
    name: r.string,
    normalizeAttenuationScaling: r.boolean,
    maxNormalizedScalingFactor: r.float
  },

  "AudEventKey": {
    value: r.ushort,
    time: r.float
  },

  "AudEventCurve": {
    name: r.string,
    extrapolation: r.uint,
    keys: r.array,
    sourceTriObserver: r.object
  }

}
