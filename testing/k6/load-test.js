import http from "k6/http";
import { check, sleep, group } from "k6";
import { Rate, Trend, Counter } from "k6/metrics";
import config from "./config.js";

// Custom metrics
const loginFailures = new Counter("login_failures");
const taskCreationTime = new Trend("task_creation_time");
const taskRetrievalTime = new Trend("task_retrieval_time");
const apiErrorRate = new Rate("api_errors");

// Test data generators
function generateTaskData() {
  const taskTypes = ["Task", "Incident", "Bug", "Feature", "Maintenance"];
  const statuses = ["Pending", "In Progress", "Complete"];
  const priorities = ["Low", "Medium", "High", "Critical"];

  return {
    title: `Test Task ${Math.random().toString(36).substr(2, 9)}`,
    description: `This is a test task created during load testing at ${new Date().toISOString()}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  };
}

// Authentication helper
function authenticate() {
  const loginPayload = {
    username: config.testUser.username,
    password: config.testUser.password,
  };

  const loginResponse = http.post(
    `${config.baseURL}/api/auth/login`,
    JSON.stringify(loginPayload),
    {
      headers: { "Content-Type": "application/json" },
      tags: { name: "login" },
    }
  );

  const loginSuccess = check(loginResponse, {
    "login status is 200": (r) => r.status === 200,
    "login response has token": (r) => JSON.parse(r.body).token !== undefined,
  });

  if (!loginSuccess) {
    loginFailures.add(1);
    console.error("Login failed:", loginResponse.body);
    return null;
  }

  return JSON.parse(loginResponse.body).token;
}

// Register test user if needed
export function setup() {
  const registerPayload = {
    username: config.testUser.username,
    email: config.testUser.email,
    password: config.testUser.password,
  };

  // Try to register the test user (ignore if already exists)
  http.post(
    `${config.baseURL}/api/auth/register`,
    JSON.stringify(registerPayload),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log("Setup completed - test user registration attempted");
  return { baseURL: config.baseURL };
}

export default function (data) {
  // Authenticate
  const token = authenticate();
  if (!token) {
    sleep(1);
    return;
  }

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  group("Task Management Operations", function () {
    // Test 1: Create a new task
    group("Create Task", function () {
      const taskData = generateTaskData();
      const createStart = new Date();

      const createResponse = http.post(
        `${config.baseURL}/api/tasks`,
        JSON.stringify(taskData),
        { headers: authHeaders, tags: { name: "create_task" } }
      );

      const createDuration = new Date() - createStart;
      taskCreationTime.add(createDuration);

      const createSuccess = check(createResponse, {
        "create task status is 201": (r) => r.status === 201,
        "create task returns task id": (r) =>
          JSON.parse(r.body)._id !== undefined,
        "create task response time < 3s": (r) => r.timings.duration < 3000,
      });

      if (!createSuccess) {
        apiErrorRate.add(1);
      }

      sleep(0.5);
    });

    // Test 2: Retrieve all tasks
    group("Get All Tasks", function () {
      const retrievalStart = new Date();

      const getResponse = http.get(`${config.baseURL}/api/tasks`, {
        headers: authHeaders,
        tags: { name: "get_tasks" },
      });

      const retrievalDuration = new Date() - retrievalStart;
      taskRetrievalTime.add(retrievalDuration);

      const getSuccess = check(getResponse, {
        "get tasks status is 200": (r) => r.status === 200,
        "get tasks returns array": (r) => Array.isArray(JSON.parse(r.body)),
        "get tasks response time < 2s": (r) => r.timings.duration < 2000,
      });

      if (!getSuccess) {
        apiErrorRate.add(1);
      }

      sleep(0.3);
    });

    // Test 3: Update a task (if tasks exist)
    group("Update Task", function () {
      const getResponse = http.get(`${config.baseURL}/api/tasks`, {
        headers: authHeaders,
      });

      if (getResponse.status === 200) {
        const tasks = JSON.parse(getResponse.body);

        if (tasks.length > 0) {
          const taskToUpdate = tasks[0];
          const updateData = {
            ...taskToUpdate,
            title: `Updated: ${taskToUpdate.title}`,
            status: "In Progress",
          };

          const updateResponse = http.put(
            `${config.baseURL}/api/tasks/${taskToUpdate._id}`,
            JSON.stringify(updateData),
            { headers: authHeaders, tags: { name: "update_task" } }
          );

          const updateSuccess = check(updateResponse, {
            "update task status is 200": (r) => r.status === 200,
            "update task response time < 2s": (r) => r.timings.duration < 2000,
          });

          if (!updateSuccess) {
            apiErrorRate.add(1);
          }
        }
      }

      sleep(0.5);
    });

    // Test 4: Search/Filter tasks
    group("Filter Tasks", function () {
      const filterTests = [
        { filter: "status=Pending", name: "filter_by_status" },
        { filter: "type=Task", name: "filter_by_type" },
      ];

      filterTests.forEach((test) => {
        const filterResponse = http.get(
          `${config.baseURL}/api/tasks?${test.filter}`,
          { headers: authHeaders, tags: { name: test.name } }
        );

        const filterSuccess = check(filterResponse, {
          [`${test.name} status is 200`]: (r) => r.status === 200,
          [`${test.name} response time < 1.5s`]: (r) =>
            r.timings.duration < 1500,
        });

        if (!filterSuccess) {
          apiErrorRate.add(1);
        }
      });

      sleep(0.2);
    });
  });

  // Random think time between iterations
  sleep(Math.random() * 2 + 1); // 1-3 seconds
}

export function teardown(data) {
  console.log("Load test completed");
  console.log(`Base URL tested: ${data.baseURL}`);
}
