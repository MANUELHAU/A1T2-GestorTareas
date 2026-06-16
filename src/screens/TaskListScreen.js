import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import TaskRow from '../components/TaskRow';

const { width } = Dimensions.get('window');

const initialTasks = [
  { id: '1', title: 'Planificación trimestral', assignedTo: 'Alejandro', status: 'Pendiente', date: '2026-06-15' },
  { id: '2', title: 'Auditoría de sistemas', assignedTo: 'Alicia', status: 'En progreso', date: '2026-06-15' },
  { id: '3', title: 'Mantenimiento preventivo', assignedTo: 'Angel', status: 'Completada', date: '2026-06-16' },
  { id: '4', title: 'Capacitación de personal', assignedTo: 'Jesus', status: 'Pendiente', date: '2026-06-15' },
];

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-06-15');
  const [isLoading, setIsLoading] = useState(false);

  const filteredTasks = tasks.filter(t => t.date === selectedDate);
  const completedTasks = filteredTasks.filter(t => t.status === 'Completada' || t.completed);
  const progress = filteredTasks.length > 0 ? (completedTasks.length / filteredTasks.length) : 0;

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        const newTask = {
          id: Math.random().toString(),
          title: newTaskTitle,
          assignedTo: 'Por definir',
          status: 'Pendiente',
          date: selectedDate,
          completed: false,
        };
        setTasks(prev => [newTask, ...prev]);
        setNewTaskTitle('');
        setIsLoading(false);
        Keyboard.dismiss();
      }, 800);
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, status: !task.completed ? 'Completada' : 'Pendiente' } 
        : task
    ));
  };

  const renderItem = ({ item }) => (
    <TaskRow 
      task={item} 
      onPress={() => navigation.navigate('Detalles', { task: item })}
      onToggle={() => toggleTask(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#6366F1', selectedTextColor: 'white' },
            }}
            theme={{
              calendarBackground: '#1E1E1E',
              textSectionTitleColor: '#A0A0A0',
              selectedDayBackgroundColor: '#6366F1',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#6366F1',
              dayTextColor: '#ffffff',
              textDisabledColor: '#444444',
              dotColor: '#6366F1',
              selectedDotColor: '#ffffff',
              arrowColor: '#6366F1',
              monthTextColor: '#ffffff',
              textDayFontWeight: '400',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
            }}
            style={styles.calendar}
          />
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progreso Diario</Text>
            <Text style={styles.progressPercentage}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        <View style={styles.searchBarWrapper}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Nueva tarea..."
              placeholderTextColor="#555555"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddTask}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Ionicons name="add" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Tareas</Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>
        </View>

        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={80} color="#333333" />
              <Text style={styles.emptyText}>No hay tareas programadas</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  calendarContainer: {
    marginTop: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 20,
  },
  calendar: {
    borderRadius: 20,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercentage: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  searchBarWrapper: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#6366F1',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateBadge: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  dateText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
  },
  listPadding: {
    paddingBottom: 30,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#555555',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
});

export default TaskListScreen;
