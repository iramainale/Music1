import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { TodoContext } from '../context/TodoContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TaskItem = ({ task }) => {
  const { deleteTask, completeTask } = useContext(TodoContext);

  const handleComplete = () => {
    Alert.alert(
      'Mark as Complete',
      'Move this task to completed list?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: () => completeTask(task),
          style: 'default',
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Permanently delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteTask(task.id),
          style: 'destructive',
        },
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#FFD93D';
      case 'low':
        return '#4CAF50';
      default:
        return '#888';
    }
  };

  return (
    <View style={styles.taskItem}>
      <View style={styles.leftContent}>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleComplete}
        >
          <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>

        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          {task.description && (
            <Text style={styles.taskDescription}>{task.description}</Text>
          )}
          <View style={styles.metaContainer}>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(task.priority) + '20' },
              ]}
            >
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                {task.priority.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.createdDate}>
              {new Date(task.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <MaterialCommunityIcons name="delete-outline" size={20} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderColor: '#333',
    borderWidth: 1,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkButton: {
    padding: 8,
    marginRight: 8,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#b3b3b3',
    fontSize: 13,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  createdDate: {
    color: '#666',
    fontSize: 11,
  },
  deleteButton: {
    padding: 8,
  },
});

export default TaskItem;
