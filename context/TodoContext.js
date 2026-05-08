import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const TASKS_KEY = '@todo_app_tasks';
  const COMPLETED_TASKS_KEY = '@todo_app_completed_tasks';

  // Load tasks from AsyncStorage on app start
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const taskData = await AsyncStorage.getItem(TASKS_KEY);
      const completedData = await AsyncStorage.getItem(COMPLETED_TASKS_KEY);

      if (taskData) setTasks(JSON.parse(taskData));
      if (completedData) setCompletedTasks(JSON.parse(completedData));
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Save completed tasks to AsyncStorage
  const saveCompletedTasks = async (newCompletedTasks) => {
    try {
      await AsyncStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(newCompletedTasks));
      setCompletedTasks(newCompletedTasks);
    } catch (error) {
      console.error('Error saving completed tasks:', error);
    }
  };

  const addTask = (title, description = '') => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date().toISOString(),
      dueDate: null,
      priority: 'medium',
    };
    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
  };

  const completeTask = (task) => {
    deleteTask(task.id);
    const completedTask = {
      ...task,
      completedAt: new Date().toISOString(),
    };
    const updatedCompletedTasks = [completedTask, ...completedTasks];
    saveCompletedTasks(updatedCompletedTasks);
  };

  const uncompleteTask = (id) => {
    const task = completedTasks.find((t) => t.id === id);
    if (task) {
      const { completedAt, ...taskWithoutDate } = task;
      const updatedCompletedTasks = completedTasks.filter((t) => t.id !== id);
      saveCompletedTasks(updatedCompletedTasks);
      const updatedTasks = [taskWithoutDate, ...tasks];
      saveTasks(updatedTasks);
    }
  };

  const deleteCompletedTask = (id) => {
    const updatedCompletedTasks = completedTasks.filter((task) => task.id !== id);
    saveCompletedTasks(updatedCompletedTasks);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    saveTasks(updatedTasks);
  };

  const clearAllTasks = async () => {
    try {
      await AsyncStorage.removeItem(TASKS_KEY);
      setTasks([]);
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  };

  const clearAllCompletedTasks = async () => {
    try {
      await AsyncStorage.removeItem(COMPLETED_TASKS_KEY);
      setCompletedTasks([]);
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
    }
  };

  const value = {
    tasks,
    completedTasks,
    isLoading,
    addTask,
    deleteTask,
    completeTask,
    uncompleteTask,
    deleteCompletedTask,
    updateTask,
    clearAllTasks,
    clearAllCompletedTasks,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
