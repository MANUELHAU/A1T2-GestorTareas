import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const isCompleted = task.status === 'Completada' || task.completed;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity 
          style={styles.backButtonCircle} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.accentBar} />
        </View>

        <View style={styles.card}>
          <View style={styles.detailRow}>
            <View style={styles.labelGroup}>
              <Ionicons name="person" size={20} color="#6366F1" />
              <Text style={styles.label}>Responsable</Text>
            </View>
            <Text style={styles.value}>{task.assignedTo}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.labelGroup}>
              <Ionicons 
                name={isCompleted ? "checkmark-circle" : "time"} 
                size={20} 
                color={isCompleted ? "#10B981" : "#F59E0B"} 
              />
              <Text style={styles.label}>Estado</Text>
            </View>
            <Text style={[
              styles.statusValue, 
              { color: isCompleted ? "#10B981" : "#F59E0B" }
            ]}>
              {isCompleted ? 'Completada' : 'Pendiente'}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.labelGroup}>
              <Ionicons name="calendar" size={20} color="#6366F1" />
              <Text style={styles.label}>Fecha</Text>
            </View>
            <Text style={styles.value}>{task.date}</Text>
          </View>
        </View>

        <View style={styles.notesSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={20} color="#A0A0A0" />
            <Text style={styles.sectionTitle}>Descripción</Text>
          </View>
          <View style={styles.notesCard}>
            <Text style={styles.notesText}>
              Esta tarea requiere atención inmediata para asegurar el cumplimiento de los objetivos institucionales. Por favor, revise todos los documentos adjuntos y coordine con el equipo responsable.
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.actionButtonText}>Finalizar Revisión</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 24,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 42,
  },
  accentBar: {
    width: 50,
    height: 5,
    backgroundColor: '#6366F1',
    borderRadius: 3,
    marginTop: 12,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#A0A0A0',
    marginLeft: 10,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 4,
  },
  notesSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A0A0A0',
    marginLeft: 8,
  },
  notesCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  notesText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#D1D1D1',
  },
  actionButton: {
    backgroundColor: '#6366F1',
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskDetailScreen;
