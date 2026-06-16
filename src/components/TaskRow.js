import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskRow = ({ task, onPress, onToggle }) => {
  const isCompleted = task.status === 'Completada' || task.completed;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {task.title}
          </Text>
          <View style={styles.responsibleContainer}>
            <Ionicons name="person-outline" size={14} color="#A0A0A0" />
            <Text style={styles.assignedTo}>
              {task.assignedTo}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.statusButton} 
          onPress={onToggle}
          activeOpacity={0.6}
        >
          {isCompleted ? (
            <Ionicons name="checkmark-circle" size={28} color="#10B981" />
          ) : (
            <Ionicons name="time-outline" size={28} color="#F59E0B" />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#333333',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  responsibleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignedTo: {
    fontSize: 14,
    color: '#A0A0A0',
    marginLeft: 6,
  },
  statusButton: {
    padding: 4,
  },
});

export default TaskRow;
