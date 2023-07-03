<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Tasks</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <!-- start content -->

      <!-- buttons -->
      <div class="flex justify-end space-x-4  px-4 py-6">
        <button @click="showTaskForm" v-if="showButton"
          class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-gray-800 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
          <span
            class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-gray-800 group-hover:h-full"></span>
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
              class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
              class="w-5 h-5 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </span>
          <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Add
            Task</span>
        </button>

        <!-- filter button -->
          <button v-if="showButton"
              class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
              id="filter-button"
              @click="toggleFilterDropdown"
              >
              Filter
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                    fill="#000000"></path>
                </g>
              </svg>
          </button>
          
          <div v-show="filterDropdownOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="filter-button" tabindex="-1">
            <div class="py-1" role="none">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @click="setFilter('all')">All</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @click="setFilter('pending')">Pending</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @click="setFilter('finished')">Finished</a>
            </div>
          </div>
        <!-- /filter button -->
        
        <router-link :to="{name: 'Dashboard'}" v-if="!showButton"
        class="inline-flex items-center px-6 py-4  bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
          Dashboard       
        </router-link>

      </div>
      <!-- buttons -->

      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-100">
          <div class="px-4 py-6">

            <!-- all tasks -->
            <div v-if="!showForm">             
            <div class="sm:px-6 w-full">             
              <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between">
                  <div class="flex items-center">
                    <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                      href=" javascript:void(0)">
                      <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                        <p class="font-semibold">Your Tasks</p>
                      </div>
                    </a>                    
                  </div>                
                </div>
                <div v-if="taskLoading" class="flex justify-center">
                  <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-else>
                  <div v-if="tasks.data.length === 0" class="flex justify-center items-center h-20">
                    <p class="font-semibold">You do not have any tasks</p>
                  </div>
                  <div v-else>                 
                    <div class="mt-7 overflow-x-auto">
                      <table class="w-full whitespace-nowrap sm:flex md:flex items-center justify-center">                    
                        <tbody>

                          <div v-if="sort_filter.length > 0">
                            <div v-for="(task, ind) in sort_filter" :key="task.id"
                            class="animate-fade-in-down"
                            :style="{ animationDelay: `${ind * 0.1}s` }">                              
                              <tr class="focus:outline-none h-16 border border-gray-200 rounded font-semibold">                         
                              <td class="">
                                <div class="flex items-center pl-5">
                                  <p class="text-base font-medium leading-none text-gray-700 mr-2 w-32">{{limitCharacters(task.title, 20)}}</p>                             
                                </div>
                              </td>
                              <td class="pl-24">
                                <div class="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                      d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                                      stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" stroke-width="1.25"
                                      stroke-linecap="round" stroke-linejoin="round"></circle>
                                  </svg>
                                  <p class="text-sm leading-none text-gray-600 ml-2">{{task.priority}}</p>
                                </div>
                              </td>
                              <td class="pl-5">
                                <div class="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path d="M7.5 5H16.6667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                      stroke-linejoin="round"></path>
                                    <path d="M7.5 10H16.6667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                      stroke-linejoin="round"></path>
                                    <path d="M7.5 15H16.6667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                      stroke-linejoin="round"></path>
                                    <path d="M4.16669 5V5.00667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                      stroke-linejoin="round"></path>
                                    <path d="M4.16669 10V10.0067" stroke="#52525B" stroke-width="1.25"
                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M4.16669 15V15.0067" stroke="#52525B" stroke-width="1.25"
                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                  </svg>
                                  <p class="text-sm leading-none text-gray-600 ml-2"> Added: {{ formatDate(task.updated_at) }}</p>
                                </div>
                              </td>                       
                              <td class="pl-5">
                                <div class="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                      d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                                      stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                  </svg>
                                  <p v-if="task.status === 'pending'" class="text-sm leading-none text-red-500 ml-2">{{task.status}}</p>
                                  <p v-else class="text-sm leading-none text-green-500 ml-2">{{task.status}}</p>
                                </div>
                              </td>
                              <td class="pl-5">
                                <p v-if="task.status === 'pending'">
                                  <button v-if="isTaskDue(task.due_date)" class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-red-600 py-3 px-5 bg-red-100 rounded hover:bg-gray-200 focus:outline-none">Due {{ formatDate(task.due_date) }}</button>
                                <button v-else
                                  class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-green-600 py-3 px-5 bg-green-100 rounded hover:bg-gray-200 focus:outline-none">Due
                                  {{ formatDate(task.due_date) }}</button>
                                </p>
                                
                                <p v-else>
                                  <button 
                                class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-green-600 py-3 px-5 bg-green-100 rounded hover:bg-gray-200 focus:outline-none">
                                {{ formatCompletedDate() }}</button>
                                </p>
                              </td>
                              <td class="pl-4">
                                <router-link :to="{name: 'TaskView', params:{id: task.id} }"
                                  class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">View</router-link>                              
                              </td>
                              <td class="pl-4" v-if="task.status === 'pending'">
                                <button @click="completeTask(task)"
                                  class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">Mark Complete</button>                              
                              </td>
                              <td class="pl-4" v-else>
                                <button @click="incompleteTask(task)"
                                  class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-green-600 py-3 px-5 bg-green-100 rounded hover:bg-gray-200 focus:outline-none">Task Completed</button>                              
                              </td>
                              <td class="pt-3">
                                <button v-if="task.id" type="button" @click="deleteTask(task)" class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-2 inline-block">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>                              
                                </button>
                              </td>
                              </tr>
                              <tr class="h-3"></tr>                              
                            </div>
                          </div>

                          <div v-else>
                            <div v-for="(task, ind) in tasks.data" :key="task.id"
                              class="animate-fade-in-down"
                              :style="{ animationDelay: `${ind * 0.1}s` }">                              
                                <tr class="focus:outline-none h-16 border border-gray-200 rounded font-semibold">                         
                                <td class="">
                                  <div class="flex items-center pl-5">
                                    <p class="text-base font-medium leading-none text-gray-700 mr-2 w-32">{{limitCharacters(task.title, 20)}}</p>                             
                                  </div>
                                </td>
                                <td class="pl-24">
                                  <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                      fill="none">
                                      <path
                                        d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                                        stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                                      </path>
                                      <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" stroke-width="1.25"
                                        stroke-linecap="round" stroke-linejoin="round"></circle>
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2">{{task.priority}}</p>
                                  </div>
                                </td>
                                <td class="pl-5">
                                  <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                      fill="none">
                                      <path d="M7.5 5H16.6667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                      <path d="M7.5 10H16.6667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                      <path d="M7.5 15H16.6667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                      <path d="M4.16669 5V5.00667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                      <path d="M4.16669 10V10.0067" stroke="#52525B" stroke-width="1.25"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                      <path d="M4.16669 15V15.0067" stroke="#52525B" stroke-width="1.25"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2"> Added: {{ formatDate(task.updated_at) }}</p>
                                  </div>
                                </td>                       
                                <td class="pl-5">
                                  <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                      fill="none">
                                      <path
                                        d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                                        stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                                      </path>
                                    </svg>
                                    <p v-if="task.status === 'pending'" class="text-sm leading-none text-red-500 ml-2">{{task.status}}</p>
                                    <p v-else class="text-sm leading-none text-green-500 ml-2">{{task.status}}</p>
                                  </div>
                                </td>
                                <td class="pl-5">
                                  <p v-if="task.status === 'pending'">
                                    <button v-if="isTaskDue(task.due_date)" class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-red-600 py-3 px-5 bg-red-100 rounded hover:bg-gray-200 focus:outline-none">Due {{ formatDate(task.due_date) }}</button>
                                  <button v-else
                                    class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-green-600 py-3 px-5 bg-green-100 rounded hover:bg-gray-200 focus:outline-none">Due
                                    {{ formatDate(task.due_date) }}</button>
                                  </p>
                                  
                                  <p v-else>
                                    <button 
                                  class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-green-600 py-3 px-5 bg-green-100 rounded hover:bg-gray-200 focus:outline-none">
                                  {{ formatCompletedDate() }}</button>
                                  </p>
                                </td>
                                <td class="pl-4">
                                  <router-link :to="{name: 'TaskView', params:{id: task.id} }"
                                    class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">View</router-link>                              
                                </td>
                                <td class="pl-4" v-if="task.status === 'pending'">
                                  <button @click="completeTask(task)"
                                    class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">Mark Complete</button>                              
                                </td>
                                <td class="pl-4" v-else>
                                  <button @click="incompleteTask(task)"
                                    class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm leading-none text-green-600 py-3 px-5 bg-green-100 rounded hover:bg-gray-200 focus:outline-none">Task Completed</button>                              
                                </td>
                                <td class="pt-3">
                                  <button v-if="task.id" type="button" @click="deleteTask(task)" class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-2 inline-block">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>                              
                                  </button>
                                </td>
                                </tr>
                                <tr class="h-3"></tr>                              
                            </div>  
                          </div> 

                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>                              
            </div>
            </div>
           </div>
          <!-- /all tasks -->

          <!-- add task form -->
          <form v-if="showForm" @submit.prevent="saveTask" class="animate-fade-in-down">
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
                    Save
                  </button>
                </div>

              </div>
            </div>
          </form>
          <!-- /add task form -->
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

  <div class="flex justify-center mt-5">
    <nav
    class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
    aria-label="Pagination"
  >
    
    <a
      v-for="(link, i) of tasks.links"
      :key="i"
      :disabled="!link.url"
      href="#"
      @click="getForPage($event, link)"
      aria-current="page"
      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
      :class="[
        link.active
          ? 'z-10 bg-indigo-50 border-gray-800 text-gray-600'
          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
        i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
        i === tasks.links.length - 1 ? 'rounded-r-md' : '',
      ]"
      v-html="link.label"
    >
    </a>
  </nav>
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

//hide the task form on default
const showForm = ref(false);

// show buttons on default
const showButton = ref(true);

//hide sort dropdown on default
const sortDropdownOpen = ref(false);

//hide filter dropdown on default
const filterDropdownOpen = ref(false);

//tasks variable to get all task from the store
const tasks = computed(() => store.state.tasks);

// Get task loading state, which only changes when we fetch task from backend
const taskLoading = computed(() => store.state.currentTask.loading);

//get notifications 
const notification = computed(() => store.state.notification);

//tasks variable to get all task from the store for filter and sort
let sort_filter = [];


const task = ref({
  title: '',
  description: '',
  due_date: '',
  priority: '',
  status: ''
})

//show task form on click of add new task button
function showTaskForm() {
  showForm.value = true;
  showButton.value = false;
}

//Save Task
function saveTask() {
  store.dispatch("saveTask", { ...task.value }).then(() => {
    store.commit("notify", {
      type: "success",
      message: "Your Task Was Successfully Created",
    });

      //Hide add form
      showForm.value = false;
      //Get all tasks
      store.dispatch("getTasks");
  });
 
}

//Get Tasks
store.dispatch("getTasks");

//delete task
function deleteTask(task) {
    if (confirm(`Are you sure you want to delete this task? Operation can't be undone!!`)
    ) 
    {
      store.dispatch("deleteTask", task.id).then(() => {
        store.dispatch("getTasks");
        store.commit("notify", {
          type: "danger",
          message: "Your Task Was Deleted",
        });       
      });
    }
}

//complete task
function completeTask(task) {    
      store.dispatch("completeTask", task.id).then(() => {
        store.dispatch("getTasks");
        store.commit("notify", {
          type: "success",
          message: "Task Marked Complete",
        });       
      });
}  

//incomplete task
function incompleteTask(task) {    
      store.dispatch("incompleteTask", task.id).then(() => {
        store.dispatch("getTasks");
        store.commit("notify", {
          type: "success",
          message: "Task Marked Incomplete",
        });       
      });
} 

  //format date
function formatDate(date) {
  return moment(date).fromNow();
}

// if task is due date
function isTaskDue(dueDate) {
  return moment(dueDate).isSameOrBefore(moment(), 'day');
}

//if task is completed date
function formatCompletedDate() {
  return moment().format('MMM D, YYYY');
}


//filter
const toggleFilterDropdown = () => {
  filterDropdownOpen.value = !filterDropdownOpen.value;
};

const setFilter = (filterValue) => {
  if (filterValue === 'all') {
    sort_filter = store.state.tasks.data.slice(); // Reset the tasks array to show all tasks
  } else {
    // Filter the tasks array by status
    sort_filter = store.state.tasks.data.filter(task => task.status === filterValue);
  }

  filterDropdownOpen.value = false;
};
//\filter


//pagination
function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getTasks", { url: link.url }); 
}

// limit the characters displayed for the task title 
const limitCharacters = (text, limit) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.substring(0, limit) + '...';
  }
};

</script>

