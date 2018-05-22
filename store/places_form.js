
export const state = () => ({
  locationFormData: { latitude: -12.117992, longitude: -77.030646 },
  storeFormData: { locations: [] },
  sectorFormData: { stores: [] }
})

export const mutations = {
  clean (state) {
    state.locationFormData = {edit: false, latitude: -12.117992, longitude: -77.030646}

    state.storeFormData = { edit: false, locations: [] }

    state.sectorFormData = { edit: false, stores: [] }
  },
  setLocation (state, location) {
    state.locationFormData = location
  },
  setStore (state, store) {
    state.storeFormData = store
  },
  setSector (state, sector) {
    state.sectorFormData = sector
  }
}

const placesForm = {
  namespaced: true,
  state,
  mutations
}

export default placesForm
