<template>
  <li v-bind:class="taskClassName">
    <button className="delete" @click="deleteThisTask">
      &times;
    </button>

    <input
      type="checkbox"
      readOnly
      v-bind:checked="!!this.task.checked"
      @click="toggleChecked"
    />

    <span class="text">
      <strong>{{ this.task.username }}</strong
      >: {{ this.task.text }}
    </span>
  </li>
</template>

<script>
import { Tasks } from "../api/tasks.js";

export default {
  props: ["task", "showPrivateButton"],
  data() {
    return {};
  },
  computed: {
    taskClassName: function() {
      return this.task.checked ? "checked" : "";
    }
  },
  methods: {
    toggleChecked() {
      // Set the checked property to the opposite of its current value
      Meteor.call("tasks.setChecked", this.task._id, !this.task.checked);
    },
    deleteThisTask() {
      Meteor.call("tasks.remove", this.task._id);
    }
  }
};
</script>
