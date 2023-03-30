export interface Serializable {
  serialize: (instance: Serializable) => string
}
