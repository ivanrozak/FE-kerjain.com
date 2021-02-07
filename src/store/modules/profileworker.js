import axios from 'axios'
export default {
  state: {
    user: {},
    skill: {},
    img: ''
  },
  mutations: {
    setUserById(state, payload) {
      state.userId = payload
    },
    setRecruiterById(state, payload) {
      state.recruiterId = payload
    },
    setSkill(state, payload) {
      state.skill = payload
    }
  },
  actions: {
    getUserByIds(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}workers/${payload}`)
          .then(result => {
            context.commit('setUserById', result.data.data[0])
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getRecruiterByIds(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}recruiter/${payload}`)
          .then(result => {
            context.commit('setRecruiterById', result.data.data[0])
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateProfileUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}workers/${context.state.userId.user_id}`,
            payload
          )
          .then(result => {
            console.log(result)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateProfileRecruiters(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}recruiter/${context.state.recruiterId.user_id}`,
            payload
          )
          .then(result => {
            console.log('user')
            console.log(context.state.user)
            console.log('profile recruiter')
            console.log(result)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    UpdateImageUsers(context, payload) {
      return new Promise((resolve, reject) => {
        console.log(context.state.userId.user_id)
        console.log(payload)
        axios
          .patch(
            `${process.env.VUE_APP_URL}editPhoto/${context.state.userId.user_id}`,
            payload
          )
          .then(result => {
            console.log(result)
            context.commit('setImg', result.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getSkill(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}getuserskill/${payload}`)
          .then(result => {
            context.commit('setSkill', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    postSkill(context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios
          .post(`${process.env.VUE_APP_URL}skill/`, payload)
          .then(result => {
            context.dispatch('getSkill', payload.user_id)
            resolve(result)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    deleteSkill(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}skill/${payload.skill_id}`)
          .then(result => {
            context.dispatch('getSkill', payload.user_id)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    setUserId(state) {
      return state.userId
    },
    setRecruiterId(state) {
      return state.recruiterId
    },
    getSkill(state) {
      return state.skill
    }
  }
}