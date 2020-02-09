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
  props: ["task"],
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
      Tasks.update(this.task._id, {
        $set: { checked: !this.task.checked }
      });
    },
    deleteThisTask() {
      Tasks.remove(this.task._id);
    }
  }
};
</script>
