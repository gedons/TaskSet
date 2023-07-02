<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900"> {{route.params.id ? task.title : "Edit"}}</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <!-- Your content -->
          <div class="flex justify-end space-x-4">
            <router-link :to="{name: 'Tasks'}" 
              class="inline-flex items-center px-6 py-4  bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
              Back       
            </router-link>  
          </div>

          <div class="px-4 py-6 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-100">
              <div class="px-4 py-6">

                <!-- edit task form -->
                  <form @submit.prevent="editTask" class="animate-fade-in-down">
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                      <!-- Task fields -->
                      <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <!-- title -->
                        <div>
                          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                          <input type="text" :disabled="taskLoading" name="title" id="title" v-model="task.title" autocomplete="task_title"
                            class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Task title" :class="{
                              'cursor-not-allowed': taskLoading,
                              'hover:bg-gray-200': taskLoading,
                            }"/>
                        </div>
                        <!-- /title -->
        
                        <!-- description -->
                        <div>
                          <label for="description" class="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <div class="mt-1">
                            <textarea id="description" :disabled="taskLoading" name="description" rows="3" v-model="task.description"
                              autocomplete="task_description"
                              class="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Describe your task" :class="{
                                'cursor-not-allowed': taskLoading,
                                'hover:bg-gray-200': taskLoading,
                              }"/>
                          </div>
                        </div>
                        <!-- /description -->
        
                        <!-- due_date -->
                        <div>
                          <label for="date" class="block text-sm font-medium text-gray-700">Due Date</label>
                          <input type="date" :disabled="taskLoading" name="title" id="date" v-model="task.due_date" autocomplete="due_date"
                            class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Due date" :class="{
                              'cursor-not-allowed': taskLoading,
                              'hover:bg-gray-200': taskLoading,
                            }"/>
                        </div>
                        <!-- /due_date -->
        
                        <!-- priority -->
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Priority</label>
                          <select v-model="task.priority" :disabled="taskLoading"
                            class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{
                              'cursor-not-allowed': taskLoading,
                              'hover:bg-gray-200': taskLoading,
                            }">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <!-- /priority -->
        
                        <!-- status -->
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Status</label>
                          <select v-model="task.status" :disabled="taskLoading"
                            class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{
                              'cursor-not-allowed': taskLoading,
                              'hover:bg-gray-200': taskLoading,
                            }">
                            <option value="finished">Finished</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>
                        <!-- /status -->
        
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button type="submit" :disabled="taskLoading"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-gray-200 hover:text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <svg v-if="taskLoading" class="animate-spin -ml-1 mr-3  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                              fill="none" viewBox="0 0 24 24" :class="{
                                'cursor-not-allowed': taskLoading,
                                'hover:bg-gray-200': taskLoading,
                              }">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                              </path>
                            </svg>
                            Update
                          </button>
                        </div>
        
                      </div>
                    </div>
                  </form>
               <!-- /edit task form -->

              </div>
            </div>
          </div>

          <div
          v-if="notification.show"
          class="fixed w-[300px] right-4 bottom-4 py-2 px-4 text-white rounded-full animate-fade-in-down"
          :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
        >
          {{ notification.message }}
        </div>      
          <!-- end content -->
        </div> 
        
      </main>
</template>

<script setup>
import store from "../store";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from 'moment';

const router = useRouter();
const route = useRoute();

//tasks variable to get all task from the store
const tasks = computed(() => store.state.tasks);

// Get task loading state, which only changes when we fetch task from backend
const taskLoading = computed(() => store.state.currentTask.loading);

//get notifications 
const notification = computed(() => store.state.notification);


const task = ref({
  title: '',
  description: '',
  due_date: '',
  priority: '',
  status: ''
})

// If the current component is rendered on task update route we make a request to fetch task
if (route.params.id) {
  store.dispatch("getTask", route.params.id);
}

// Watch current project  data change and when this happens we update local model
watch(
  () => store.state.currentTask.data,
  (newVal, oldVal) => {
    task.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      // status: !!newVal.status,
      
    };
  }
);


//Update Task
function editTask() {
  store.dispatch("editTask", { ...task.value }).then(() => {
    store.commit("notify", {
      type: "success",
      message: "Your Task Was Successfully Updated",
    });
    router.push({
      name: "Tasks",
    });
  });
}

//delete task
// function deleteTask(task) {
//     if (confirm(`Are you sure you want to delete this task? Operation can't be undone!!`)
//     ) 
//     {
//       store.dispatch("deleteTask", task.id).then(() => {
//         store.dispatch("getTasks");
//       });
//     }
//   }


</script>