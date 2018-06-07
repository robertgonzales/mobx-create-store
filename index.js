import { action, extendObservable } from "mobx"

export const createStore = props => {
  class Store {
    constructor(props) {
      let decorators = {}
      for (let prop in props) {
        if (props.hasOwnProperty(prop)) {
          if (typeof props[prop] === "function") {
            decorators[prop] = action.bound
          }
        }
      }
      // key/value pairs are automatically decorated with observable
      // getters are automatically decorated with computed
      // methods need to be manually decorated with action.bound
      extendObservable(this, props, decorators)
    }
  }
  return new Store(props)
}
