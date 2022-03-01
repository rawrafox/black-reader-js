import * as r from "../black-readers.js"
import { typeSymbol } from "../black.js"

class ConstantParameter {
  constructor(name, value) {
    this[typeSymbol] = "Tr2Vector4Parameter"
    this.name = name
    this.value = value
  }
  
  static readStruct(reader) {
    let name = r.string(reader)

    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")

    let value = r.vector4(reader)

    return new ConstantParameter(name, value)
  }
}

class EffectOption {
  constructor(name, value) {
    this.name = name
    this.value = value
  }

  static readStruct(reader) {
    let name = r.string(reader)

    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")

    let value = r.string(reader)

    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")

    return new EffectOption(name, value)
  }
}

class Key {
  static readStruct(reader) {
    let result = new Key()

    result[typeSymbol] = "Tr2CurveScalarKey"
    result.time = reader.readF32()
    result.value = reader.readF32()
    result.startTangent = reader.readF32()
    result.endTangent = reader.readF32()
    result.index = reader.readU16()
    result.interpolation = reader.readU8()
    result.extrapolation = reader.readU8()

    return result
  }
}


export default {

  "Tr2ActionAnimateCurveSet": {
    curveSet: r.object,
    value: r.string
  },

  "Tr2ActionAnimateValue": {
    attribute: r.string,
    curve: r.object,
    path: r.path,
    value: r.string
  },

  "Tr2ActionChildEffect": {
    childName: r.string,
    path: r.path,
    removeOnStop: r.boolean
  },

  "Tr2ActionOverlay": {
    path: r.path
  },

  "Tr2ActionPlayCurveSet": {
    curveSetName: r.string,
    rangeName: r.string,
    syncToRange: r.boolean
  },

  "Tr2ActionPlayMeshAnimation": {
    animation: r.string,
    loops: r.uint,
    mask: r.string
  },

  "Tr2ActionPlaySound": {
    bypassPrefix: r.boolean,
    emitter: r.string,
    event: r.string,
  },

  "Tr2ActionResetClipSphereCenter": {

  },

  "Tr2ActionSetValue": {
    attribute: r.string,
    delayBinding: r.boolean,
    path: r.path,
    value: r.string
  },

  "Tr2ActionSpawnParticles": {

  },

  "Tr2TranslationAdapter": {
    curve: r.object,
    value: r.vector3
  },

  "Tr2RotationAdapter": {
    curve: r.object,
    value: r.vector4
  },

  "Tr2RandomIntegerAttributeGenerator": {
    customName: r.string,
    minRange: r.vector4,
    maxRange: r.vector4
  },

  "Tr2RandomUniformAttributeGenerator": {
    customName: r.string,
    elementType: r.uint,
    minRange: r.vector4,
    maxRange: r.vector4
  },

  "Tr2SphereShapeAttributeGenerator": {
    customName: r.string,
    distributionExponent: r.float,
    maxPhi: r.float,
    maxRadius: r.float,
    maxSpeed: r.float,
    maxTheta: r.float,
    minPhi: r.float,
    minRadius: r.float,
    minSpeed: r.float,
    minTheta: r.float,
    parentVelocityFactor: r.float,
    position: r.vector3,
    rotation: r.quaternion
  },

  "Tr2PlaneConstraint": {
    reflectionNoise: r.float,
    generators: r.array
  },

  "Tr2Controller": {
    isShared: r.boolean,
    stateMachines: r.array,
    name: r.string,
    variables: r.array
  },

  "Tr2ControllerReference": {
    path: r.path
  },

  "Tr2ControllerFloatVariable": {
    name: r.string,
    defaultValue: r.float,
    enumValues: r.string,
    variableType: r.uint
  },

  "Tr2BoneMatrixCurve": {
    name: r.string
  },

  "Tr2CurveColor": {
    name: r.string,
    r: r.rawObject,
    g: r.rawObject,
    b: r.rawObject,
    a: r.rawObject,
    srgbOutput: r.boolean
  },

  "Tr2CurveConstant": {
    name: r.string,
    value: r.vector4
  },

  "Tr2CurveEulerRotation": {
    name: r.string,
    pitch: r.rawObject,
    roll: r.rawObject,
    yaw: r.rawObject
  },

  "Tr2CurveScalar": {
    name: r.string,
    timeOffset: r.float,
    timeScale: r.float,
    extrapolationAfter: r.uint,
    extrapolationBefore: r.uint,
    keys: r.structList(Key)
  },

  "Tr2CurveVector3": {
    name: r.string,
    x: r.rawObject,
    y: r.rawObject,
    z: r.rawObject
  },

  "Tr2CurveEulerRotationExpression": {
    input1: r.float,
    inputs: r.array,
    name: r.string,
    expressionYaw: r.string,
    expressionPitch: r.string,
    expressionRoll: r.string
  },

  "Tr2CurveScalarExpression": {
    inputs: r.array,
    name: r.string,
    expression: r.string,
    input1: r.float,
    input2: r.float,
    input3: r.float
  },

  "Tr2ScalarExprKey": {
    input1: r.float,
    input2: r.float,
    input3: r.float,
    interpolation: r.uint,
    left: r.float,
    right: r.float,
    time: r.float,
    timeExpression: r.string,
    value: r.float
  },

  "Tr2ScalarExprKeyCurve": {
    interpolation: r.uint,
    keys: r.array,
    name: r.string
  },

  "Tr2CurveVector3Expression": {
    inputs: r.array,
    name: r.string,
    expressionX: r.string,
    expressionY: r.string,
    expressionZ: r.string
  },

  "Tr2CurveSetRange": {
    endTime: r.float,
    looped: r.boolean,
    name: r.string,
    startTime: r.float
  },

  "Tr2DistanceTracker": {
    name: r.string,
    direction: r.vector3,
    targetPosition: r.vector3
  },

  "Tr2Effect": {
    effectFilePath: r.path,
    name: r.string,
    parameters: r.array,
    resources: r.array,
    constParameters: r.structList(ConstantParameter),
    options: r.structList(EffectOption),
    samplerOverrides: (reader) => { throw "lulz" }
  },

  "Tr2DynamicEmitter": {
    name: r.string,
    particleSystem: r.object,
    generators: r.array,
    maxParticles: r.uint,
    rate: r.float
  },

  "Tr2GpuSharedEmitter": {
    name: r.string,
    particleSystem: r.object,
    angle: r.float,
    attractorPosition: r.vector3,
    attractorStrength: r.float,
    color0: r.color,
    color1: r.color,
    color2: r.color,
    color3: r.color,
    colorMidpoint: r.float,
    continuousEmitter: r.boolean,
    direction: r.vector3,
    drag: r.float,
    emissionDensity: r.float,
    gravity: r.float,
    maxDisplacement: r.float,
    maxEmissionDensity: r.float,
    maxLifeTime: r.float,
    maxSpeed: r.float,
    minLifeTime: r.float,
    minSpeed: r.float,
    position: r.vector3,
    inheritVelocity: r.float,
    innerAngle: r.float,
    radius: r.float,
    rate: r.float,
    sizeVariance: r.float,
    sizes: r.vector3,
    scaledByParent: r.boolean,
    textureIndex: r.uint,
    turbulenceAmplitude: r.float,
    turbulenceFrequency: r.float,
    velocityStretchRotation: r.float
  },

  "Tr2GpuUniqueEmitter": {
    name: r.string,
    particleSystem: r.object,
    angle: r.float,
    attractorPosition: r.vector3,
    attractorStrength: r.float,
    color0: r.color,
    color1: r.color,
    color2: r.color,
    color3: r.color,
    colorMidpoint: r.float,
    continuousEmitter: r.boolean,
    direction: r.vector3,
    drag: r.float,
    emissionDensity: r.float,
    gravity: r.float,
    maxDisplacement: r.float,
    maxEmissionDensity: r.float,
    maxLifeTime: r.float,
    maxSpeed: r.float,
    minLifeTime: r.float,
    minSpeed: r.float,
    position: r.vector3,
    inheritVelocity: r.float,
    innerAngle: r.float,
    radius: r.float,
    rate: r.float,
    sizeVariance: r.float,
    sizes: r.vector3,
    scaledByParent: r.boolean,
    textureIndex: r.uint,
    turbulenceAmplitude: r.float,
    turbulenceFrequency: r.float,
    velocityStretchRotation: r.float
  },

  "Tr2ForceSphereVolume": {
    forces: r.array,
    radius: r.float
  },

  "Tr2GStateAnimation": {
    resPath_: r.string,
    gStateResPath_: r.string,
    parameters: r.array
  },

  "Tr2GStateParameter" : {
    name: r.string,
    value: r.float,
    nodename: r.string
  },

  "Tr2InstancedMesh": {
    additiveAreas: r.array,
    boundsMethod: r.object,
    decalAreas: r.array,
    depthAreas: r.array,
    distortionAreas: r.array,
    geometryResPath: r.path,
    instanceGeometryResPath: r.path,
    instanceGeometryResource: r.object,
    instanceMeshIndex: r.uint,
    maxInstanceSize: r.uint,
    minBounds: r.vector3,
    maxBounds: r.vector3,
    opaqueAreas: r.array,
    transparentAreas: r.array
  },

  "Tr2InteriorPlaceable": {
    placeableResPath: r.path,
    transform: r.rawObject
  },

  "Tr2InteriorScene": {
    curveSets: r.array,
    dynamics: r.array,
    lights: r.array,
  },

  "Tr2InteriorLightSource": {
    color: r.color,
    coneAlphaInner: r.float,
    coneAlphaOuter: r.float,
    coneDirection: r.vector3,
    falloff: r.float,
    importanceBias: r.float,
    importanceScale: r.float,
    kelvinColor: r.object,
    name: r.string,
    position: r.vector3,
    primaryLighting: r.boolean,
    radius: r.float,
    specularIntensity: r.float,
    useKelvinColor: r.boolean
  },

  "Tr2IntSkinnedObject": {
    curveSets: r.array,
    transform: r.rawObject,
    visualModel: r.object
  },

  "Tr2KelvinColor": {
    temperature: r.float,
    tint: r.float
  },

  "Tr2Model": {
    meshes: r.array
  },

  "Tr2PointLight": {
    name: r.string,
    boneIndex: r.uint,
    brightness: r.float,
    color: r.color,
    innerRadius: r.float,
    noiseAmplitude: r.float,
    noiseFrequency: r.float,
    noiseOctaves: r.float,
    position: r.vector3,
    radius: r.float
  },

  "Tr2LodResource": {
    name: r.string,
    highDetailResPath: r.path,
    lowDetailResPath: r.path,
    mediumDetailResPath: r.path
  },

  "Tr2Mesh": {
    additiveAreas: r.array,
    decalAreas: r.array,
    deferGeometryLoad: r.boolean,
    depthAreas: r.array,
    depthNormalAreas: r.array,
    distortionAreas: r.array,
    geometryResPath: r.path,
    meshIndex: r.uint,
    name: r.string,
    opaqueAreas: r.array,
    opaquePrepassAreas: r.array,
    pickableAreas: r.array,
    transparentAreas: r.array
  },

  "Tr2MeshArea": {
    count: r.uint,
    effect: r.object,
    index: r.uint,
    name: r.string,
    reversed: r.boolean,
    useSHLighting: r.boolean
  },

  "Tr2MeshLod": {
    additiveAreas: r.array,
    associatedResources: r.array,
    decalAreas: r.array,
    depthAreas: r.array,
    distortionAreas: r.array,
    geometryRes: r.object,
    name: r.string,
    opaqueAreas: r.array,
    pickableAreas: r.array,
    transparentAreas: r.array
  },

  "Tr2ExternalParameter": {
    name: r.string,
    destinationObject: r.object,
    destinationAttribute: r.string
  },

  "Tr2FloatParameter": {
    name: r.string,
    value: r.float
  },

  "Tr2Matrix4Parameter": {
    name: r.string,
    value: r.matrix4
  },

  "Tr2SpotLight" : {
    name: r.string,
    brightness: r.float,
    color: r.color,
    innerAngle: r.float,
    innerRadius: r.float,
    noiseAmplitude: r.float,
    noiseFrequency: r.float,
    outerAngle: r.float,
    position: r.vector3,
    radius: r.float,
    rotation: r.quaternion
  },

  "Tr2StaticEmitter": {
    name: r.string,
    particleSystem: r.object,
    geometryResourcePath: r.path,
    meshIndex: r.uint
  },

  "Tr2Texture2dLodParameter": {
    name: r.string,
    lodResource: r.object
  },

  "Tr2Vector4Parameter": {
    name: r.string,
    value: r.vector4
  },

  "Tr2ParticleElementDeclaration": {
    customName: r.string,
    dimension: r.uint,
    elementType: r.uint,
    usageIndex: r.uint,
    usedByGPU: r.boolean
  },

  "Tr2ParticleAttractorForce": {
    magnitude: r.float,
    position: r.vector3
  },

  "Tr2ParticleDirectForce": {
    force: r.vector3
  },

  "Tr2ParticleDragForce": {
    drag: r.float
  },

  "Tr2ParticleFluidDragForce": {
    drag: r.float
  },

  "Tr2ParticleTurbulenceForce": {
    amplitude: r.vector3,
    frequency: r.vector4,
    noiseLevel: r.float,
    noiseRatio: r.float
  },

  "Tr2ParticleVortexForce": {
    axis: r.vector3,
    magnitude: r.float,
    position: r.vector3
  },

  "Tr2ParticleSpring": {
    position: r.vector3,
    springConstant: r.float
  },

  "Tr2ParticleSystem": {
    constraints: r.array,
    name: r.string,
    applyAging: r.boolean,
    applyForce: r.boolean,
    elements: r.array,
    emitParticleDuringLifeEmitter: r.object,
    emitParticleOnDeathEmitter: r.object,
    forces: r.array,
    maxParticleCount: r.uint,
    requiresSorting: r.boolean,
    updateBoundingBox: r.boolean,
    updateSimulation: r.boolean,
    useSimTimeRebase: r.boolean
  },

  "Tr2GpuParticleSystem": {
    clear: r.object,
    emit: r.object,
    render: r.object,
    setDrawParameters: r.object,
    setSortParameters: r.object,
    sort: r.object,
    sortInner: r.object,
    sortStep: r.object,
    update: r.object
  },

  "Tr2PostProcess": {
    stages: r.array
  },

  "Tr2PostProcess2": {
    bloom: r.object,
    dynamicExposure: r.object,
    desaturate: r.object,
    fade: r.object,
    fidelityFX: r.object,
    filmGrain: r.object,
    fog: r.object,
    godRays: r.object,
    lut: r.object,
    signalLoss: r.object,
    vignette: r.object
  },

  "Tr2PPBloomEffect": {

  },

  "Tr2PPDesaturateEffect": {
    intensity: r.float
  },

  "Tr2PPDynamicExposureEffect": {
    adjustment: r.float,
    influence: r.float,
    middleValue: r.float
  },

  "Tr2PPFadeEffect": {

  },

  "Tr2PPFidelityFXEffect": {

  },

  "Tr2PPFilmGrainEffect": {

  },

  "Tr2PPFogEffect": {
    areaCenter: r.vector3,
    blendAmount0: r.float,
    blendAmount1: r.float,
    blendAmount2: r.float,
    blendBias0: r.float,
    blendBias1: r.float,
    blendBias2: r.float,
    blendDistance0: r.float,
    blendDistance1: r.float,
    blendDistance2: r.float,
    blendPower0: r.float,
    blendPower1: r.float,
    blendPower2: r.float,
    color: r.color,
    colorInfluence: r.float,
    intensity: r.float,
    nebulaInfluence: r.float
  },

  "Tr2PPGodRaysEffect": {
    noiseTexturePath: r.path
  },

  "Tr2PPLutEffect": {
    path: r.path,
    influence: r.float
  },

  "Tr2PPSignalLossEffect": {

  },

  "Tr2PPVignetteEffect": {
    sineFrequency: r.float
  },

  "Tr2RuntimeInstanceData": {

  },

  "Tr2ShLightingManager": {
    primaryIntensity: r.float,
    secondaryIntensity: r.float
  },

  "Tr2SkinnedModel": {
    geometryResPath: r.path,
    meshes: r.array,
    name: r.string,
    skeletonName: r.string
  },

  "Tr2StateMachine": {
    name: r.string,
    states: r.array,
    startState: r.uint
  },

  "Tr2StateMachineState": {
    actions: r.array,
    finalizer: r.object,
    name: r.string,
    transitions: r.array
  },

  "Tr2StateMachineTransition": {
    condition: r.string,
    name: r.string
  },

  "Tr2SyncToAnimation": {

  }

}
