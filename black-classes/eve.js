import * as r from '../black-readers.js'

export default function(map) {
  map.set('EveSpaceScene', new Map([
    ['ambientColor', r.color],
    ['backgroundEffect', r.object],
    ['backgroundObjects', r.array],
    ['backgroundRenderingEnabled', r.boolean],
    ['curveSets', r.array],
    ['enableShadows', r.boolean],
    ['envMap1ResPath', r.string],
    ['envMap2ResPath', r.string],
    ['envMapResPath', r.string],
    ['envMapRotation', r.vector4],
    ['externalParameters', r.array],
    ['fogColor', r.color],
    ['fogEnd', r.float],
    ['fogMax', r.float],
    ['fogStart', r.float],
    ['nebulaIntensity', r.float],
    ['objects', r.array],
    ['postProcessPath', r.string],
    ['selfShadowOnly', r.boolean],
    ['shadowFadeThreshold', r.float],
    ['shadowThreshold', r.float],
    ['shLightingManager', r.object],
    ['starfield', r.object],
    ['sunDiffuseColor', r.color],
    ['sunDiffuseColorWithDynamicLights', r.vector4],
    ['sunDirection', r.vector3],
    ['useSunDiffuseColorWithDynamicLights', r.boolean]
  ]))
}
