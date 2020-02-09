<template>
  <div className="container">
    <header>
      <h1>Todo List</h1>
      <form className="new-task" @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="Type to add new tasks"
          v-model="newTask"
        />
      </form>
    </header>
    <ul>
      <Task v-for="task in tasks" v-bind:key="task._id" v-bind:task="task" />
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import Task from "./Task.vue";
import { Tasks } from "../api/tasks.js";

export default {
  components: {
    Task
  },
  data() {
    return {
      newTask: ""
    };
  },
  methods: {
    handleSubmit(event) {
      Tasks.insert({
        text: this.newTask,
        createdAt: new Date() // current time
      });

      // Clear form
      this.newTask = "";
    }
  },
  meteor: {
    tasks() {
      return Tasks.find({}).fetch();
    }
  }
};
</script>
