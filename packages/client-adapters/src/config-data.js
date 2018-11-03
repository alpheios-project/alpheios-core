class ConfigData {
  constructor (config, defaultConfig) {
    Object.keys(config).forEach(configKey => {
      this[configKey] = config[configKey]
    })

    Object.keys(defaultConfig).forEach(configKey => {
      if (this[configKey] === undefined) {
        this[configKey] = defaultConfig[configKey]
      }
    })
  }
}

export default ConfigData
