<template>
  <div className="container">
    <header>
      <h1>Todo List ({{ incompleteCount }})</h1>

      <label className="hide-completed">
        <input
          type="checkbox"
          readOnly
          checked="hideCompleted"
          v-model="hideCompleted"
          @click="toggleHideCompleted"
        />
        Hide Completed Tasks
      </label>

      <blaze-template template="loginButtons" tag="span"></blaze-template>

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
      newTask: "",
      hideCompleted: false
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
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    }
  },
  meteor: {
    tasks() {
      let filteredTasks = Tasks.find({}, { sort: { createdAt: -1 } }).fetch();
      if (this.hideCompleted) {
        filteredTasks = filteredTasks.filter(task => !task.checked);
      }
      return filteredTasks;
    },
    incompleteCount() {
      return Tasks.find({ checked: { $ne: true } }).count();
    }
  }
};
</script>
