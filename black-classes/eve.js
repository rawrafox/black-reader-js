import * as r from "../black-readers.js"

class Locator {
  constructor(position, direction) {
    this.position = position
    this.direction = direction
  }
  
  static readStruct(reader) {
    return new Locator(r.vector4(reader), r.vector4(reader))
  }
}

// TODO: Figure out property names and values
class Transition {
  static readStruct(reader) {
    let result = new Transition()

    // Not sure of property name
    result.state = reader.readStringU16()

    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")

    // Not sure of property name
    result.transition = reader.readStringU16();

    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")
    reader.expectU8(0, "unknown content")


    return result
  }
}

export default {
  
  "EveAnimation": {
    name: r.string,
    loops: r.uint
  },
  
  "EveAnimationCommand": {
    command: r.uint
  },
  
  "EveAnimationState": {
    name: r.string,
    animation: r.object,
    curves: r.array,
    commands: r.array,
    initCommands: r.array,
    transitions: r.structList(Transition)
  },
    
  "EveAnimationStateMachine": {
    name: r.string,
    autoPlayDefault: r.boolean,
    states: r.array,
    transitions: r.array,
    trackMask: r.string,
    defaultAnimation: r.string
  },

  "EveBezierCurve": {
    billboardObjects: r.boolean,
    bezierPoint: r.vector3,
    lineWidth: r.float,
    lineSet: r.object,
    movementScale: r.float,
    movementSpeed: r.float,
    name: r.string,
    objectScale: r.vector3,
    point1: r.vector3,
    point2: r.vector3,
    rotation: r.quaternion,
    scaleEndpoints: r.boolean,
    scaleSegmentsByCompleteness: r.boolean,
    segments: r.uint,
    translation: r.vector3,
  },
    
  "EveBoosterSet2": {
    alwaysOn: r.boolean,
    alwaysOnIntensity: r.float,
    effect: r.object,
    glows: r.object,
    glowColor: r.color,
    glowScale: r.float,
    haloColor: r.color,
    haloScaleX: r.float,
    haloScaleY: r.float,
    lightFlickerAmplitude: r.float,
    lightFlickerColor: r.color,
    lightFlickerFrequency: r.float,
    lightFlickerRadius: r.float,
    lightColor: r.color,
    lightRadius: r.float,
    lightWarpColor: r.color,
    lightWarpRadius: r.float,
    symHaloScale: r.float,
    trails: r.object,
    warpGlowColor: r.color,
    warpHaloColor: r.color
  },

  "EveCameraFxAttributes" : {
    fxAttributes: r.array,
  },

  "EveCamera": {
    fieldOfView: r.float,
    friction: r.float,
    frontClip: r.float,
    idleMove: r.boolean,
    idleScale: r.float,
    idleSpeed: r.float,
    intr: r.vector3,
    pitch: r.float,
    pos: r.vector3,
    maxSpeed: r.float,
    noiseScale: r.float,
    noiseScaleCurve: r.object,
    rotationAroundParent: r.quaternion,
    translationFromParent: r.float,
    yaw: r.float,
    zoomCurve: r.object
  },

  "EveChildBulletStorm": {
    effect: r.object,
    multiplier: r.uint,
    range: r.float,
    speed: r.float,
    sourceLocatorSet: r.string
  },

  "EveChildCloud": {
    cellScreenSize: r.float,
    sortingModifier: r.float,
    effect: r.object,
    name: r.string,
    preTesselationLevel: r.uint,
    rotation: r.quaternion,
    scaling: r.vector3,
    translation: r.vector3
  },

  "EveChildContainer": {
    alwaysOn: r.boolean,
    boneIndex: r.uint,
    controllers: r.array,
    display: r.boolean,
    displayFilter: r.object,
    localTransform: r.matrix4,
    name: r.string,
    curveSets: r.array,
    hideOnLowQuality: r.boolean,
    inheritProperties: r.object,
    lights: r.array,
    fxAttributes: r.array,
    observers: r.array,
    objects: r.array,
    rotation: r.quaternion,
    scaling: r.vector3,
    staticTransform: r.boolean,
    transformModifiers: r.array,
    translation: r.vector3
  },

  "EveChildEffectPropagator": {
    name: r.string,
    durationPerEffect: r.float,
    effect: r.object,
    effectScaling: r.vector3,
    frequency: r.float,
    localLocators: r.object,
    locatorSetName: r.string,
    propagationType: r.uint,
    randScaleMax: r.float,
    skipCleanup: r.boolean,
    stopToClearDelay: r.float,
    stopAfterNumTriggers: r.uint,
    triggerMethood: r.object,
    triggerSphereOffset:  r.vector3,
    triggerSphereRadiusCurve: r.object
  },

  "EveChildExplosion": {
    globalDuration: r.float,
    globalExplosion: r.object,
    globalExplosionDelay: r.float,
    globalExplosions: r.array,
    globalScaling: r.vector3,
    localDuration: r.float,
    localExplosion: r.object,
    localExplosions: r.array,
    localExplosionInterval: r.float,
    localExplosionIntervalFactor: r.float,
    localExplosionShared: r.object,
    localTransform: r.matrix4,
    name: r.string,
    rotation: r.quaternion,
    scaling: r.vector3
  },

  "EveChildInheritProperties": {
    source: r.object
  },

  "EveChildInstanceContainer" : {
    source: r.object,
    scaling: r.vector3,
    localTransform: r.matrix4
  },

  "EveLineChildContainer" : {
    lines: r.array
  },

  "EveChildLineSet": {
    name: r.string,
    additiveBatches: r.boolean,
    animColor: r.color,
    baseColor: r.color,
    brightness: r.float,
    display: r.boolean,
    lines: r.array,
    lineSet: r.object,
    minScreenSize: r.float,
    rotation: r.quaternion,
    scrollSpeed: r.float,
    translation: r.vector3,
  },
  
  "EveChildLink": {
    linkStrengthBindings: r.array,
    linkStrengthCurves: r.array,
    mesh: r.object,
    name: r.string,
    rotation: r.quaternion
  },

  "EveChildMesh": {
    display: r.boolean,
    localTransform: r.matrix4,
    lowestLodVisible: r.uint,
    mesh: r.object,
    minScreenSize: r.float,
    name: r.string,
    reflectionMode: r.uint,
    rotation: r.quaternion,
    scaling: r.vector3,
    sortValueOffset: r.float,
    staticTransform: r.boolean,
    transformModifiers: r.array,
    translation: r.vector3,
    useSpaceObjectData: r.boolean,
    useSRT: r.boolean
  },

  "EveChildParticleSphere": {
    generators: r.array,
    maxSpeed: r.float,
    mesh: r.object,
    movementScale: r.float,
    name: r.string,
    particleSystem: r.object,
    positionShiftDecreaseSpeed: r.float,
    positionShiftIncreaseSpeed: r.float,
    positionShiftMax: r.float,
    positionShiftMin: r.float,
    radius: r.float,
    useSpaceObjectData: r.boolean
  },

  "EveChildParticleSystem": {
    display: r.boolean,
    localTransform: r.matrix4,
    lodSphereRadius: r.float,
    mesh: r.object,
    minScreenSize: r.float,
    name: r.string,
    particleEmitters: r.array,
    particleSystems: r.array,
    rotation: r.quaternion,
    scaling: r.vector3,
    translation: r.vector3,
    transformModifiers: r.array,
    useDynamicLod: r.boolean
  },

  "EveChildModifierAttachToBone": {
    boneIndex: r.uint
  },

  "EveChildModifierBillboard2D":{
    
   },
    
  "EveChildModifierBillboard3D":{
    fixed: r.boolean
   },
    
  "EveChildModifierCameraOrientedRotationConstrained": {
    
   },

  "EveChildModifierHalo": {

  },

  "EveChildModifierSRT": {
    rotation: r.quaternion,
    scaling: r.vector3,
    translation: r.vector3,
  },

  "EveChildModifierTranslateWithCamera": {
    
  },

  "EveChildQuad": {
    brightness: r.float,
    color: r.color,
    effect: r.object,
    localTransform: r.matrix4,
    minScreenSize: r.float,
    name: r.string,
    rotation: r.quaternion,
    scaling: r.vector3,
    translation: r.vector3,
  },

  "EveConnector": {
    animationColor: r.color,
    animationScale: r.float,
    animationSpeed: r.float,
    color: r.color,
    destObject: r.object,
    destPosition: r.vector3,
    isAnimated: r.boolean,
    lineWidth: r.float,
    sourceObject: r.object,
    sourcePosition: r.vector3,
    type: r.uint,
  },

  "EveCurveLineSet": {
    additive: r.boolean,
    lineEffect: r.object,
    pickEffect: r.object,
    scrollSpeed: r.float,
  },

  "EveCustomMask": {
    materialIndex: r.byte,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3,
    targetMaterials: r.vector4,
  },

  "EveEffectRoot2": {
    boundingSphereCenter: r.vector3,
    boundingSphereRadius: r.float,
    controllers: r.array,
    curveSets: r.array,
    duration: r.float,
    dynamicLOD: r.boolean,
    effectChildren: r.array,
    lights: r.array,
    name: r.string,
    observers: r.array,
    rotation: r.quaternion,
    rotationCurve: r.object,
    scaling: r.vector3,
    secondaryLightingEmissiveColor: r.color,
    secondaryLightingSphereRadius: r.float,
    translation: r.vector3,
  },

  "EveLensflare": {
    backgroundOccluders: r.array,
    bindings: r.array,
    distanceToCenterCurves: r.array,
    distanceToEdgeCurves: r.array,
    mesh: r.object,
    name: r.string,
    occluders: r.array,
    position: r.vector3,
    radialAngleCurves: r.array,
    xDistanceToCenter: r.array,
    yDistanceToCenter: r.array,
    zDistanceToCenter: r.array,
  },

  "EveLineContainer": {
    lineSet: r.object,
  },

  "EveLocalPositionCurve": {
    value: r.vector3,
  },

  "EveLocatorSets": {
    locators: r.structList(Locator),
    name: r.string
  },

  "EveLocator2": {
    name: r.string,
    transform: r.matrix4,
  },

  "EveMeshOverlayEffect": {
    additiveEffects: r.array,
    curveSet: r.object,
    distortionEffects: r.array,
    name: r.string,
    opaqueEffects: r.array,
    transparentEffects: r.array,
  },

  "EveMissile": {
    boundingSphereCenter: r.vector3,
    boundingSphereRadius: r.float,
    modelTranslationCurve: r.object,
    name: r.string,
    warheads: r.array,
  },

  "EveMissileWarhead": {
    acceleration: r.float,
    durationEjectPhase: r.float,
    impactDuration: r.float,
    impactSize: r.float,
    maxExplosionDistance: r.float,
    mesh: r.object,
    particleEmitters: r.array,
    pathOffsetNoiseScale: r.float,
    pathOffsetNoiseSpeed: r.float,
    spriteSet: r.object,
    startEjectVelocity: r.float,
    warheadLength: r.float,
    warheadRadius: r.float,
  },
    
  "EveMobile": {
    attachments: r.array,
    boundingSphereCenter: r.vector3,
    boundingSphereRadius: r.float,
    children: r.array,
    controllers: r.array,
    curveSets: r.array,
    locatorSets: r.array,
    name: r.string,
    meshLod: r.object,
    observers: r.array,
    shadowEffect: r.object,
  },
    
  "EveOccluder": {
    name: r.string,
    sprites: r.array,
  },
    
  "EveParticleDirectForce": {
    force: r.vector3,
  },
    
  "EveParticleDragForce": {
    drag: r.float,
  },
    
  "EvePlaneSet": {
    effect: r.object,
    hideOnLowQuality: r.boolean,
    name: r.string,
    pickBufferID: r.byte,
    planes: r.array,
  },
    
  "EvePlaneSetItem": {
    color: r.color,
    layer1Scroll: r.vector4,
    layer1Transform: r.vector4,
    layer2Scroll: r.vector4,
    layer2Transform: r.vector4,
    maskAtlasID: r.uint,
    name: r.string,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3,
  },
    
  "EveRootTransform": {
    boundingSphereRadius: r.float,
    children: r.array,
    curveSets: r.array,
    display: r.boolean,
    mesh: r.object,
    modifier: r.uint,
    name: r.string,
    observers: r.array,
    position: r.vector3,
    rotation: r.quaternion,
    rotationCurve: r.object,
    scaling: r.vector3,
    sortValueMultiplier: r.float,
    translation: r.vector3,
    translationCurve: r.object,
    useDistanceBasedScale: r.boolean,
  },
    
  "EveShip2": {
    attachments: r.array,
    boosters: r.object,
    boundingSphereCenter: r.vector3,
    boundingSphereRadius: r.float,
    children: r.array,
    customMasks: r.array,
    decals: r.array,
    dna: r.string,
    locatorSets: r.array,
    locators: r.array,
    mesh: r.object,
    name: r.string,
    meshLod: r.object,
    rotationCurve: r.object,
    shadowEffect: r.object,
    shapeEllipsoidCenter: r.vector3,
    shapeEllipsoidRadius: r.vector3,
    translationCurve: r.object,
  },
    
  "EveStation2": {
    attachments: r.array,
    boundingSphereCenter: r.vector3,
    boundingSphereRadius: r.float,
    children: r.array,
    curveSets: r.array,
    decals: r.array,
    effectChildren: r.array,
    lights: r.array,
    locatorSets: r.array,
    locators: r.array,
    name: r.string,
    mesh: r.object,
    meshLod: r.object,
    modelScale: r.float,
    observers: r.array,
    rotationCurve: r.object,
    modelRotationCurve: r.object,
    shadowEffect: r.object,
    translationCurve: r.object,
  },
    
  "EveSpaceObjectDecal": {
    decalEffect: r.object,
    name: r.string,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3,
    indexBuffer: r.indexBuffer
  },
    
  "EveSpaceScene": {
    ambientColor: r.color,
    backgroundEffect: r.object,
    backgroundObjects: r.array,
    backgroundRenderingEnabled: r.boolean,
    curveSets: r.array,
    enableShadows: r.boolean,
    envMapResPath: r.path,
    envMap1ResPath: r.path,
    envMap2ResPath: r.path,
    envMapRotation: r.quaternion,
    externalParameters: r.array,
    fogColor: r.color,
    fogStart: r.float,
    fogEnd: r.float,
    fogMax: r.float,
    nebulaIntensity: r.float,
    objects: r.array,
    postProcessPath: r.path,
    postprocess: r.object,
    selfShadowOnly: r.boolean,
    starfield: r.object,
    shadowFadeThreshold: r.float,
    shadowThreshold: r.float,
    shLightingManager: r.object,
    sunDiffuseColor: r.color,
    sunDiffuseColorWithDynamicLights: r.color,
    sunDirection: r.vector3,
    useSunDiffuseColorWithDynamicLights: r.boolean
  },
    
  "EveSpherePin": {
    centerNormal: r.vector3,
    color: r.color,
    curveSets: r.array,
    enablePicking: r.boolean,
    geometryResPath: r.path,
    name: r.string,
    pinColor: r.color,
    pinEffect: r.object,
    pinMaxRadius: r.float,
    pinRadius: r.float,
    pinRotation: r.float,
    sortValueMultiplier: r.float
  },
    
  "EveSpotlightSet": {
    coneEffect: r.object,
    glowEffect: r.object,
    intensity: r.float,
    name: r.string,
    spotlightItems: r.array
  },
    
  "EveSpotlightSetItem": {
    coneColor: r.color,
    flareColor: r.color,
    name: r.string,
    spriteColor: r.color,
    spriteScale: r.vector3,
    transform: r.matrix4
  },
    
  "EveSpriteSet": {
    effect: r.object,
    name: r.string,
    intensity: r.float,
    skinned: r.boolean,
    sprites: r.array
  },
    
  "EveSpriteSetItem": {
    blinkPhase: r.float,
    blinkRate: r.float,
    boneIndex: r.uint,
    color: r.color,
    falloff: r.float,
    maxScale: r.float,
    minScale: r.float,
    name: r.string,
    position: r.vector3,
    warpColor: r.color
  },
    
  "EveStarfield": {
    effect: r.object,
    maxDist: r.float,
    maxFlashRate: r.float,
    minDist: r.float,
    minFlashIntensity: r.float,
    minFlashRate: r.float,
    numStars: r.uint,
    seed: r.uint
  },
    
  "EveStretch": {
    curveSets: r.array,
    dest: r.object,
    destObject: r.object,
    length: r.object,
    moveCompletion: r.object,
    moveObject: r.object,
    name: r.string,
    progressCurve: r.object,
    source: r.object,
    sourceLights: r.array,
    sourceObject: r.object,
    stretchObject: r.object,
    useCurveLod: r.boolean
  },
    
  "EveStretch2": {
    destinationEmitter: r.object,
    destinationLight: r.object,
    effect: r.object,
    loop: r.object,
    name: r.string,
    sourceEmitter: r.object,
    sourceLight: r.object,
    quadCount: r.uint
  },

  "EveTacticalOverlay": {
    anchorEffect: r.object,
    arcSegmentMultiplier: r.float,
    connectorEffect: r.object,
    segmentsLow: r.float,
    segmentsMedium: r.float,
    segmentsHigh: r.float,
    targetMaxSegments: r.float,
    velocityEffect: r.object
  },
    
  "EveTrailsSet": {
    effect: r.object,
    geometryResPath: r.path
  },
    
  "EveTransform": {
    children: r.array,
    curveSets: r.array,
    display: r.boolean,
    distanceBasedScaleArg1: r.float,
    distanceBasedScaleArg2: r.float,
    hideOnLowQuality: r.boolean,
    name: r.string,
    mesh: r.object,
    meshLod: r.object,
    modifier: r.uint,
    observers: r.array,
    overrideBoundsMax: r.vector3,
    overrideBoundsMin: r.vector3,
    particleEmitters: r.array,
    particleSystems: r.array,
    rotation: r.quaternion,
    scaling: r.vector3,
    sortValueMultiplier: r.float,
    translation: r.vector3,
    update: r.boolean,
    useDistanceBasedScale: r.boolean,
    useLodLevel: r.boolean,
    visibilityThreshold: r.float
  },
    
  "EveTurretFiringFX": {
    boneName: r.string,
    destinationObserver: r.object,
    firingDelay1: r.float,
    firingDelay2: r.float,
    firingDelay3: r.float,
    firingDelay4: r.float,
    firingDurationOverride: r.float,
    firingPeakTime: r.float,
    isLoopFiring: r.boolean,
    maxRadius: r.float,
    maxScale: r.float,
    minRadius: r.float,
    minScale: r.float,
    name: r.string,
    scaleEffectTarget: r.boolean,
    sourceObserver: r.object,
    startCurveSet: r.object,
    stopCurveSet: r.object,
    stretch: r.array,
    useMuzzleTransform: r.boolean
  },
    
  "EveTurretSet": {
    name: r.string,
    bottomClipHeight: r.float,
    boundingSphere: r.vector4,
    chooseRandomLocator: r.boolean,
    cyclingFireGroupCount: r.uint,
    firingEffectResPath: r.path,
    geometryResPath: r.path,
    impactSize: r.float,
    laserMissBehaviour: r.boolean,
    locatorName: r.string,
    maxCyclingFirePos: r.uint,
    projectileMissBehaviour: r.boolean,
    sysBoneHeight: r.float,
    sysBonePitchMax: r.float,
    sysBonePitchMin: r.float,
    sysBonePitchFactor: r.float,
    sysBonePitch01Factor: r.float,
    sysBonePitch02Factor: r.float,
    sysBonePitchOffset: r.float,
    turretEffect: r.object,
    updatePitchPose: r.boolean,
    useDynamicBounds: r.boolean,
    useRandomFiringDelay: r.boolean
  },
    
  "EveUiObject": {
    boundingSphereRadius: r.float,
    name: r.string,
    mesh: r.object,
    modelScale: r.float
  }
  
}
