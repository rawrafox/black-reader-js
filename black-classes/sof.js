import * as r from "../black-readers.js"

class Instance {
  constructor(data) {
    this.data = data
  }

  static readStruct(reader) {
    let data = [
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32(),
      reader.readF32()
    ]

    return new Instance(data)
  }
}

export default {

  "EveSOFData": {
    faction: r.array,
    generic: r.object,
    hull: r.array,
    layout: r.array,
    material: r.array,
    pattern: r.array,
    race: r.array
  },

  "EveSOFDataLayout" : {
    name: r.string,
    placements: r.array
  },

  "EveSOFDNADescriptor" : {
    hull: r.string,
    layout: r.string,
    faction: r.string,
  },

  "EveSOFDataHullExtensionPlacementDistributionPlacement" : {
    distributionConditions: r.array,
  },

  "EveSOFDataHullExtensionPlacementDistributionParentMatch" : {
    matchHull: r.boolean,
    matchFaction: r.boolean,
    parentDescriptor: r.object,
  },

  "EveSOFDataHullExtensionPlacement" : {
    descriptor: r.object,
    distribution: r.object,
    distributionConditions: r.array,
    isInstanced: r.boolean,
    locatorSetName: r.string,
    matchHull: r.boolean,
    matchFaction: r.boolean,
    name: r.string,
    offset: r.vector3,
    parentDescriptor: r.object,
    resPathDefaultCorp: r.string,
  },

  "EveSOFDataArea": {
    Black: r.object,
    Blue: r.object,
    Booster: r.object,
    Cyan: r.object,
    Darkhull: r.object,
    Fire: r.object,
    Glass: r.object,
    Green: r.object,
    Hull: r.object,
    Killmark: r.object,
    Monument: r.object,
    Orange: r.object,
    Ornament: r.object,
    Primary: r.object,
    Reactor: r.object,
    Red: r.object,
    Rock: r.object,
    Sails: r.object,
    SimplePrimary: r.object,
    Secondary: r.object,
    Tertiary: r.object,
    White: r.object,
    Yellow: r.object
  },

  "EveSOFDataAreaMaterial": {
    colorType: r.uint,
    material1: r.string,
    material2: r.string,
    material3: r.string,
    material4: r.string
  },

  "EveSOFDataBooster": {
    glowColor: r.color,
    glowScale: r.float,
    gradient0ResPath: r.path,
    gradient1ResPath: r.path,
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
    shape0: r.object,
    shape1: r.object,
    shapeAtlasCount: r.uint,
    shapeAtlasHeight: r.uint,
    shapeAtlasResPath: r.path,
    shapeAtlasWidth: r.uint,
    symHaloScale: r.float,
    trailColor: r.color,
    trailSize: r.vector4,
    volumetric: r.boolean,
    warpGlowColor: r.color,
    warpHalpColor: r.color,
    warpShape0: r.object,
    warpShape1: r.object
  },

  "EveSOFDataBoosterShape": {
    color: r.color,
    noiseFunction: r.float,
    noiseSpeed: r.float,
    noiseAmplitureStart: r.vector4,
    noiseAmplitureEnd: r.vector4,
    noiseFrequency: r.vector4
  },

  "EveSOFDataFaction": {
    areas: r.array,
    areaTypes: r.object,
    colorSet: r.object,
    children: r.array,
    decals: r.array,
    defaultPattern: r.object,
    defaultPatternLayer1MaterialName: r.string,
    description: r.string,
    logoSet: r.object,
    materialUsageMtl1: r.uint,
    materialUsageMtl2: r.uint,
    materialUsageMtl3: r.uint,
    materialUsageMtl4: r.uint,
    name: r.string,
    planeSets: r.array,
    resPathInsert: r.string,
    spotlightSets: r.array,
    spriteSets: r.array,
    visibilityGroupSet: r.object
  },

  "EveSOFDataFactionChild": {
    groupIndex: r.uint,
    name: r.string,
    isVisible: r.boolean
  },

  "EveSOFDataFactionColorSet": {
    Black: r.color,
    Blue: r.color,
    Booster: r.color,
    Cyan: r.color,
    Darkhull: r.color,
    Fire: r.color,
    Glass: r.color,
    Green: r.color,
    Hull: r.color,
    Killmark: r.color,
    Orange: r.color,
    Primary: r.color,
    PrimaryLight: r.color,
    Reactor: r.color,
    Red: r.color,
    Secondary: r.color,
    SecondaryLight: r.color,
    Tertiary: r.color,
    TertiaryLight: r.color,
    White: r.color,
    WhiteLight: r.color,
    Yellow: r.color
  },

  "EveSOFDataFactionDecal": {
    groupIndex: r.uint,
    isVisible: r.boolean,
    name: r.string,
    parameters: r.array,
    shader: r.path,
    textures: r.array
  },

  "EveSOFDataLogo": {
    textures: r.array
  },

  "EveSOFDataLogoSet": {
    Marking_01: r.object,
    Marking_02: r.object,
    Primary: r.object,
    Secondary: r.object,
    Tertiary: r.object
  },

  "EveSOFDataFactionPlaneSet": {
    color: r.color,
    groupIndex: r.uint,
    name: r.string
  },

  "EveSOFDataFactionVisibilityGroupSet": {
    visibilityGroups: r.array
  },

  "EveSOFDataGeneric": {
    areaShaderLocation: r.path,
    areaShaders: r.array,
    bannerShader: r.rawObject,
    decalShaderLocation: r.path,
    decalShaders: r.array,
    damage: r.object,
    genericWreckMaterial: r.object,
    hullAreas: r.array,
    hullCategories: r.array,
    hullDamage: r.object,
    materialPrefixes: r.array,
    patternMaterialPrefixes: r.array,
    resPathDefaultAlliance: r.path,
    resPathDefaultCeo: r.path,
    resPathDefaultCorp: r.path,
    shaderPrefixAnimated: r.string,
    swarm: r.object,
    variants: r.array,
    visibilityGroups: r.array
  },

  "EveSOFDataGenericDamage": {
    armorParticleAngle: r.float,
    armorParticleColor0: r.color,
    armorParticleColor1: r.color,
    armorParticleColor2: r.color,
    armorParticleColor3: r.color,
    armorParticleDrag: r.float,
    armorParticleMinMaxLifeTime: r.vector2,
    armorParticleMinMaxSpeed: r.vector2,
    armorParticleRate: r.float,
    armorParticleSizes: r.vector4,
    armorParticleTurbulenceAmplitude: r.float,
    armorParticleTurbulenceFrequency: r.float,
    armorParticleVelocityStretchRotation: r.float,
    armorParticleTextureIndex: r.uint,
    armorShader: r.string,
    flickerPerlinAlpha: r.float,
    flickerPerlinBeta: r.float,
    flickerPerlinSpeed: r.float,
    flickerPerlinN: r.uint,
    shieldGeometryResFilePath: r.path,
    shieldShaderEllipsoid: r.string,
    shieldShaderHull: r.string
  },

  "EveSOFDataGenericDecalShader": {
    defaultTextures: r.array,
    parameters: r.array,
    parentTextures: r.array,
    shader: r.string
  },

  "EveSOFDataGenericHullDamage": {
    hullParticleAngle: r.float,
    hullParticleColor0: r.color,
    hullParticleColor1: r.color,
    hullParticleColor2: r.color,
    hullParticleColorMidpoint: r.float,
    hullParticleDrag: r.float,
    hullParticleMinMaxLifeTime: r.vector2,
    hullParticleMinMaxSpeed: r.vector2,
    hullParticleRate: r.float,
    hullParticleSizes: r.vector4,
    hullParticleTurbulenceAmplitude: r.float,
    hullParticleTurbulenceFrequency: r.float,
    hullParticleTextureIndex: r.uint
  },

  "EveSOFDataGenericShader": {
    defaultParameters: r.array,
    defaultTextures: r.array,
    doGenerateDepthArea: r.boolean,
    parameters: r.array,
    shader: r.string,
    transparencyTextureName: r.string
  },

  "EveSOFDataGenericString": {
    str: r.string
  },

  "EveSOFDataGenericSwarm": {
    formationDistance: r.float,
    maxDistance0: r.float,
    maxDeceleration: r.float,
    separationDistance: r.float,
    wanderDistance: r.float,
    wanderFluctuation: r.float,
    wanderRadius: r.float,
    weightAlign: r.float,
    weightAnchor: r.float,
    weightCohesion: r.float,
    weightDeceleration: r.float,
    weightFormation: r.float,
    weightSeparation: r.float
  },

  "EveSOFDataGenericVariant": {
    hullArea: r.object,
    isTransparent: r.boolean,
    name: r.string
  },

  "EveSOFDataHull": {
    additiveAreas: r.array,
    animations: r.array,
    audioPosition: r.vector3,
    banners: r.array,
    booster: r.object,
    boundingSphere: r.vector4,
    buildClass: r.uint,
    buildFilter: r.uint,
    castShadow: r.boolean,
    category: r.string,
    children: r.array,
    controllers: r.array,
    decalAreas: r.array,
    decalSets: r.array,
    defaultPattern: r.object,
    depthAreas: r.array,
    description: r.string,
    distortionAreas: r.array,
    enableDynamicBoundingSphere: r.boolean,
    geometryResFilePath: r.path,
    hazeSets: r.array,
    hullDecals: r.array,
    impactEffectType: r.uint,
    instancedMeshes: r.array,
    isSkinned: r.boolean,
    lightSets: r.array,
    locatorSets: r.array,
    locatorTurrets: r.array,
    name: r.string,
    opaqueAreas: r.array,
    planeSets: r.array,
    modelRotationCurvePath: r.path,
    shapeEllipsoidCenter: r.vector3,
    shapeEllipsoidRadius: r.vector3,
    soundEmitters: r.array,
    spotlightSets: r.array,
    spriteLineSets: r.array,
    spriteSets: r.array,
    transparentAreas: r.array
  },

  "EveSOFDataHullAnimation": {
    endRate: r.float,
    endRotationTime: r.float,
    endRotationValue: r.quaternion,
    id: r.uint,
    name: r.string,
    startRate: r.float,
    startRotationTime: r.float,
    startRotationValue: r.quaternion
  },

  "EveSOFDataHullArea": {
    areaType: r.uint,
    blockedMaterials: r.uint,
    count: r.uint,
    index: r.uint,
    name: r.string,
    parameters: r.array,
    shader: r.string,
    textures: r.array
  },

  "EveSOFDataHullBanner": {
    angleX: r.float,
    angleY: r.float,
    angleZ: r.float,
    boneIndex: r.uint,
    lightOverride: r.object,
    name: r.string,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3,
    usage: r.uint
  },

  "EveSOFDataHullBannerLight": {

  },

  "EveSOFDataHullBooster": {
    alwaysOn: r.boolean,
    hasTrails: r.boolean,
    items: r.array
  },

  "EveSOFDataHullBoosterItem": {
    atlasIndex0: r.uint,
    atlasIndex1: r.uint,
    functionality: r.vector4,
    hasTrail: r.boolean,
    lightScale: r.float,
    transform: r.matrix4
  },

  "EveSOFDataHullChild": {
    buildFilter: r.uint,
    groupIndex: r.uint,
    id: r.uint,
    lowestLodVisible: r.uint,
    name: r.string,
    redFilePath: r.string,
    rotation: r.quaternion,
    scaling: r.vector3,
    translation: r.vector3
  },

  "EveSOFDataHullController": {
    buildFilter: r.uint,
    path: r.path
  },

  "EveSOFDataHullDecalSet": {
    name: r.string,
    items: r.array,
    visibilityGroup: r.string
  },

  "EveSOFDataHullDecalSetItem": {
    name: r.string,
    boneIndex: r.uint,
    indexBuffer: r.array,
    indexBuffers: r.array,
    glowColorType: r.uint,
    logoType: r.uint,
    meshIndex: r.uint,
    parameters: r.array,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3,
    textures: r.array,
    usage: r.uint,
    visibilityGroup: r.string
  },

  "EveSOFDataDecalIndexBuffer" : {
      indexBuffer: r => {
        const count = r.readU32() / 4;
        const indexBuffer = new Uint32Array(count);
        for (let i = 0; i < count; i++) indexBuffer[i] = r.readU32();
        return indexBuffer;
      }
  },

  "EveSOFDataHullHazeSet": {
    items: r.array,
    name: r.string,
    skinned: r.boolean,
    visibilityGroup: r.string
  },

  "EveSOFDataHullHazeSetItem": {
    boneIndex: r.uint,
    boosterGainInfluence: r.boolean,
    colorType: r.uint,
    hazeBrightness: r.float,
    hazeFalloff: r.float,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3,
    sourceBrightness: r.float,
    sourceSize: r.float
  },

  "EveSOFDataHullLightSet": {
    name: r.string,
    items: r.array,
    visibilityGroup: r.string
  },

  "EveSOFDataHullLightSetItem": {
    name: r.string,
    boneIndex: r.uint,
    brightness: r.float,
    innerRadius: r.float,
    lightColor: r.color,
    noiseAmplitude: r.float,
    noiseFrequency: r.float,
    noiseOctaves: r.float,
    position: r.vector3,
    radius: r.float
  },

  "EveSOFDataHullLightSetTexturedPointLight": {
    name: r.string,
    brightness: r.float,
    innerRadius: r.float,
    noiseOctaves: r.float,
    position: r.vector3,
    radius: r.float,
    texturePath: r.path
  },

  "EveSOFDataHullLightSetSpotLight": {
    name: r.string,
    boneIndex: r.uint,
    brightness: r.float,
    innerAngle: r.float,
    innerRadius: r.float,
    lightColor: r.color,
    noiseAmplitude: r.float,
    noiseFrequency: r.float,
    outerAngle: r.float,
    position: r.vector3,
    radius: r.float,
    rotation: r.quaternion
  },

  "EveSOFDataHullLocator": {
    name: r.string,
    transform: r.matrix4
  },

  "EveSOFDataHullLocatorSet": {
    name: r.string,
    locators: r.array
  },

  "EveSOFDataHullPlaneSet": {
    atlasSize: r.uint,
    items: r.array,
    layer1MapResPath: r.path,
    layer2MapResPath: r.path,
    maskMapResPath: r.path,
    name: r.string,
    planeData: r.vector4,
    skinned: r.boolean,
    usage: r.uint
  },

  "EveSOFDataHullPlaneSetItem": {
    blinkRate: r.float,
    blinkPhase: r.float,
    blinkMode: r.uint,
    boneIndex: r.uint,
    color: r.color,
    dutyCycle: r.float,
    groupIndex: r.uint,
    layer1Scroll: r.vector4,
    layer1Transform: r.vector4,
    layer2Scroll: r.vector4,
    layer2Transform: r.vector4,
    maskMapAtlasIndex: r.uint,
    position: r.vector3,
    rate: r.float,
    rotation: r.quaternion,
    scaling: r.vector3
  },

  "EveSOFDataHullSpotlightSet": {
    coneTextureResPath: r.path,
    glowTextureResPath: r.path,
    items: r.array,
    name: r.string,
    skinned: r.boolean,
    zOffset: r.float
  },

  "EveSOFDataHullSpotlightSetItem": {
    boneIndex: r.uint,
    boosterGainInfluence: r.boolean,
    coneIntensity: r.float,
    flareIntensity: r.float,
    groupIndex: r.uint,
    spriteScale: r.vector3,
    spriteIntensity: r.float,
    transform: r.matrix4
  },

  "EveSOFDataHullSoundEmitter": {
    name: r.string,
    position: r.vector3,
    prefix: r.string,
    rotation: r.quaternion
  },

  "EveSOFDataHullSpriteLineSet": {
    items: r.array,
    name: r.string,
    skinned: r.boolean,
    visibilityGroup: r.string
  },

  "EveSOFDataHullSpriteLineSetItem": {
    blinkRate: r.float,
    blinkPhase: r.float,
    blinkPhaseShift: r.float,
    boneIndex: r.uint,
    colorType: r.uint,
    falloff: r.float,
    groupIndex: r.uint,
    intensity: r.float,
    isCircle: r.boolean,
    maxScale: r.float,
    minScale: r.float,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3,
    spacing: r.float
  },

  "EveSOFDataHullSpriteSet": {
    name: r.string,
    items: r.array,
    skinned: r.boolean,
    visibilityGroup: r.string
  },

  "EveSOFDataHullSpriteSetItem": {
    blinkRate: r.float,
    blinkPhase: r.float,
    boneIndex: r.uint,
    colorType: r.uint,
    falloff: r.float,
    groupIndex: r.uint,
    intensity: r.float,
    maxScale: r.float,
    minScale: r.float,
    position: r.vector3
  },

  "EveSOFDataInstancedMesh": {
    displayModifier: r.uint,
    geometryResPath: r.path,
    instances: r.structList(Instance),
    lowestLodVisible: r.uint,
    name: r.string,
    shader: r.string,
    textures: r.array
  },

  "EveSOFDataMaterial": {
    name: r.string,
    parameters: r.array
  },

  "EveSOFDataParameter": {
    name: r.string,
    value: r.vector4
  },

  "EveSOFDataPattern": {
    name: r.string,
    layer1: r.object,
    layer2: r.object,
    projections: r.array
  },

  "EveSOFDataPatternLayer": {
    isTargetMtl1: r.boolean,
    isTargetMtl2: r.boolean,
    isTargetMtl3: r.boolean,
    isTargetMtl4: r.boolean,
    materialSource: r.uint,
    projectionTypeU: r.uint,
    projectionTypeV: r.uint,
    textureName: r.string,
    textureResFilePath: r.path
  },

  "EveSOFDataPatternPerHull": {
    name: r.string,
    transformLayer1: r.object,
    transformLayer2: r.object
  },

  "EveSOFDataPatternTransform": {
    isMirrored: r.boolean,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3
  },

  "EveSOFDataRace": {
    booster: r.object,
    damage: r.object,
    name: r.string
  },

  "EveSOFDataRaceDamage": {
    armorImpactParameters: r.array,
    armorImpactTextures: r.array,
    shieldImpactParameters: r.array,
    shieldImpactTextures: r.array
  },

  "EveSOFDataFactionSpotlightSet": {
    coneColor: r.color,
    flareColor: r.color,
    groupIndex: r.uint,
    name: r.string,
    spriteColor: r.color
  },

  "EveSOFDataTexture": {
    name: r.string,
    resFilePath: r.string
  },

  "EveSOFDataTransform": {
    boneIndex: r.uint,
    position: r.vector3,
    rotation: r.quaternion,
    scaling: r.vector3
  },

  "EveSOFDataVisibilityGroup" :{
    name: r.string
  }

}
