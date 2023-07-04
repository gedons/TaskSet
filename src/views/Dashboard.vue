<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main class="bg-gray-100">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <!-- Your content -->
            <div v-if="loading" class="flex justify-center">
              <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-gray-900">
                <!-- total task count -->
                <div class="order-1 lg:order-1 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                  <h2 class="text-2xl mb-3 text-center font-semibold">Total Tasks</h2>
                  <div
                    class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
                  >
                    {{ data ? data.totalTask : "0" }}
                  </div>
                </div>
                <!-- /total task count  -->

                <!-- completed task count -->
                <div class="order-2 lg:order-2 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                  <h2 class="text-2xl mb-3 text-center font-semibold">Completed Tasks</h2>
                  <div
                    class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
                  >
                    {{ data.completedTasks }}
                  </div>
                </div>
                <!-- /completed task count  -->

                 <!-- imcompleted task count -->
                 <div class="order-3 lg:order-3 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                  <h2 class="text-2xl mb-3 text-center font-semibold">Incomplete Tasks</h2>
                  <div
                    class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
                  >
                  {{ data.incompleteTasks }}
                  </div>
                </div>
                <!-- /imcompleted task count  -->

                  <!-- overdue task count -->
                  <div class="order-4 lg:order-4 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                    <h2 class="text-2xl mb-3 text-center font-semibold">Overdue Tasks</h2>
                    <div
                      class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
                    >
                    {{ data.overdueTasks }}
                    </div>
                  </div>
                  <!-- /overdue task count  -->

                  <!-- lates task -->               
                  <div class="order-5 lg:order-5 row-span-2 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                  <h2 class="text-2xl mb-3 text-center font-semibold">Your Latest Task</h2>
                  <div v-if="data.latestTask">                    
                    <h3 class="font-bold text-xl mb-3">{{ data.latestTask.title }}</h3>
                    <div class="flex justify-between text-sm mb-1">
                      <div class="font-semibold">Created Date:</div>
                      <div class="font-semibold">{{ formatDate(data.latestTask.created_at) }}</div>
                    </div>
    
                    <div class="flex justify-between text-sm mb-1">
                      <div class="font-semibold">Status:</div>
                      <div v-if="data.latestTask.status === 'finished'">                       
                        <p class="text-green-700 font-semibold">Finished</p>
                      </div>
                      <div v-else>                   
                        <p class="text-red-700 font-semibold">Pending</p>
                      </div>
                    </div>

                    <div class="flex justify-between text-sm mb-1">
                      <div class="font-semibold">Priority:</div>
                      <div class="font-semibold"> {{ data.latestTask.priority === 'high' ? "High Priority" : data.latestTask.priority === 'medium' ? "Medium Priority" : "Low Priority" }}</div>
                    </div>

                    <div class="flex justify-between text-sm mb-1">
                      <div class="font-semibold">Due Date:</div>
                      <div class="font-semibold">{{ formatDate(data.latestTask.due_date) }}</div>
                    </div>
                    
                    <div class="flex justify-between">
                      <router-link class="
                      py-2
                      px-3
                      font-semibold
                      focus:outline-none
                      leading-6 
                      rounded
                      border
                    "
                        :to="{ name: 'TaskView', params: { id: data.latestTask.id } }"
                        link
                      >
                        <PencilIcon class="w-4 h-4 mr-2 inline-block" />
                        Edit Task
                    </router-link>
    
                    <router-link class="
                    py-2
                    px-3
                    font-semibold
                    focus:outline-none
                    leading-6 
                    rounded
                    border
                  "
                      :to="{ name: 'Tasks' }"
                      link
                    >
                      <PlusIcon class="w-4 h-4 mr-2 inline-block" />
                      New Task
                  </router-link>
                        
                    </div>
                  </div>
                  <div v-else class="text-gray-600 text-center py-16">
                    Your don't have any task yet
                  </div>
                  </div>
                  <!-- /latest task -->

                  <!-- chart -->
                  <!-- <div class="order-6 lg:order-6 row-span-2 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                    <h2 class="text-2xl mb-3 text-center font-semibold">Completion Status</h2>
                    <div
                      class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center w-full"
                    >
                    <Bar :data="chartData" />  
                    </div>
                              
                  </div> -->
                  <!-- /chart -->
            </div>
          </div> 
        
      </main>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import { Pie } from 'vue-chartjs';
  import { PencilIcon, PlusIcon } from '@heroicons/vue/24/outline';
  import moment from 'moment';
  import store from '../store';
  import PieChart from "../components/PieChart.vue";

  //get dashboard data
  const data = computed(() => store.state.dashboard.data);

  // Get dashboard loading state, which only changes when we fetch task from backend
  const loading = computed(() => store.state.dashboard.loading);

  // get chart data
  const taskStatistics = computed(() => store.state.dashboard.data);

  store.dispatch("getDashboardData");

  function formatDate(date) {
    return moment(date).fromNow();
  }



</script>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      }
    }
  }
}
</script>