import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    commit('setTodos', response.data)
  },
  async addTodo({ commit }, title) {
    const response = await axios.post("https://jsonplaceholder.typicode.com/todos", { title, completed: false})

    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    commit('removeTodo', id);
  },
  async filterTodos({ commit }, e) {
    // Get selected number value
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)

    commit('setTodos', response.data);
  },
  async updateTodo({ commit }, updateTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo)

    commit('updateTodo', response.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  // Instead of just pushing to the todos array, use unshift to add 
  // the new todo to the top
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updateTodo: (state, updateTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
    if(index !== -1) {
      state.todos.splice(index, 1, updateTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
