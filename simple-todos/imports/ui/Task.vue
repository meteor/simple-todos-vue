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

    <template v-if="this.showPrivateButton">
      <button className="toggle-private" @click="togglePrivate">
        {{ this.task.private ? "Private" : "Public" }}
      </button>
    </template>

    <span class="text">
      <strong>{{ this.task.username }}</strong
      >: {{ this.task.text }}
    </span>
  </li>
</template>

<script>
import { Tasks } from "../api/tasks.js";
import classnames from "classnames";

export default {
  props: ["task", "showPrivateButton"],
  data() {
    return {};
  },
  computed: {
    taskClassName: function() {
      return classnames({
        checked: this.task.checked,
        private: this.task.private
      });
    }
  },
  methods: {
    toggleChecked() {
      // Set the checked property to the opposite of its current value
      Meteor.call("tasks.setChecked", this.task._id, !this.task.checked);
    },
    deleteThisTask() {
      Meteor.call("tasks.remove", this.task._id);
    },
    togglePrivate() {
      Meteor.call("tasks.setPrivate", this.task._id, !this.task.private);
    }
  }
};
</script>
