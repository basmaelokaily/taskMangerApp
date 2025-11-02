import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = "https://task-manager-production-4aeb.up.railway.app";

interface TaskDetail {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  category?: string;
  tags?: string[];
  assignedTo?: string;
  createdBy?: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

export default function ViewTask() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${API_BASE}/mytasks/${id}`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "urgent":
        return "#FF6B6B";
      case "high":
        return "#FF9F43";
      case "medium":
        return "#4ECDC4";
      case "low":
        return "#95E1D3";
      default:
        return "#8E8E93";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#26DE81";
      case "in_progress":
        return "#FD79A8";
      case "todo":
        return "#A29BFE";
      case "cancelled":
        return "#636E72";
      default:
        return "#8E8E93";
    }
  };

  if (loading) {
    return (
      <View style={[viewStyles.container, viewStyles.centerContent]}>
        <ActivityIndicator size="large" color="#A29BFE" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={[viewStyles.container, viewStyles.centerContent]}>
        <Text style={viewStyles.errorText}>Task not found</Text>
      </View>
    );
  }

  const InfoRow = ({ icon, label, value, color }: any) => (
    <View style={viewStyles.infoRow}>
      <View style={viewStyles.infoLeft}>
        <Ionicons name={icon} size={20} color={color || "#8E8E93"} />
        <Text style={viewStyles.infoLabel}>{label}</Text>
      </View>
      <Text style={viewStyles.infoValue}>{value || "Not set"}</Text>
    </View>
  );

  return (
    <View style={viewStyles.container}>
      <View style={viewStyles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={viewStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={viewStyles.headerTitle}>Task Details</Text>
        <TouchableOpacity style={viewStyles.editIconButton}>
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={viewStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={viewStyles.titleSection}>
          <Text style={viewStyles.taskTitle}>{task.title}</Text>
          <View style={viewStyles.badges}>
            <View
              style={[
                viewStyles.badge,
                { backgroundColor: getStatusColor(task.status) + "20" },
              ]}
            >
              <Text
                style={[
                  viewStyles.badgeText,
                  { color: getStatusColor(task.status) },
                ]}
              >
                {task.status}
              </Text>
            </View>
            <View
              style={[
                viewStyles.badge,
                { backgroundColor: getPriorityColor(task.priority) + "20" },
              ]}
            >
              <Text
                style={[
                  viewStyles.badgeText,
                  { color: getPriorityColor(task.priority) },
                ]}
              >
                {task.priority}
              </Text>
            </View>
          </View>
        </View>

        {task.description && (
          <View style={viewStyles.section}>
            <Text style={viewStyles.sectionTitle}>Description</Text>
            <Text style={viewStyles.descriptionText}>{task.description}</Text>
          </View>
        )}

        <View style={viewStyles.section}>
          <Text style={viewStyles.sectionTitle}>Details</Text>
          <View style={viewStyles.infoCard}>
            <InfoRow
              icon="calendar-outline"
              label="Due Date"
              value={task.dueDate}
              color="#A29BFE"
            />
            <InfoRow
              icon="time-outline"
              label="Created"
              value={new Date(task.createdAt).toLocaleDateString()}
              color="#4ECDC4"
            />
            {task.completedAt && (
              <InfoRow
                icon="checkmark-circle-outline"
                label="Completed"
                value={new Date(task.completedAt).toLocaleDateString()}
                color="#26DE81"
              />
            )}
            <InfoRow
              icon="folder-outline"
              label="Category"
              value={task.category}
              color="#FF9F43"
            />
            <InfoRow
              icon="person-outline"
              label="Assigned To"
              value={task.assignedTo}
              color="#FD79A8"
            />
            <InfoRow
              icon="person-circle-outline"
              label="Created By"
              value={task.createdBy}
              color="#95E1D3"
            />
          </View>
        </View>

        {task.tags && task.tags.length > 0 && (
          <View style={viewStyles.section}>
            <Text style={viewStyles.sectionTitle}>Tags</Text>
            <View style={viewStyles.tagsContainer}>
              {task.tags.map((tag, index) => (
                <View key={index} style={viewStyles.tag}>
                  <Text style={viewStyles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {(task.estimatedMinutes || task.actualMinutes) && (
          <View style={viewStyles.section}>
            <Text style={viewStyles.sectionTitle}>Time Tracking</Text>
            <View style={viewStyles.infoCard}>
              {task.estimatedMinutes && (
                <InfoRow
                  icon="timer-outline"
                  label="Estimated"
                  value={`${task.estimatedMinutes} min`}
                  color="#4ECDC4"
                />
              )}
              {task.actualMinutes && (
                <InfoRow
                  icon="stopwatch-outline"
                  label="Actual"
                  value={`${task.actualMinutes} min`}
                  color="#FF9F43"
                />
              )}
            </View>
          </View>
        )}

        {task.isRecurring && (
          <View style={viewStyles.section}>
            <Text style={viewStyles.sectionTitle}>Recurrence</Text>
            <View style={viewStyles.infoCard}>
              <InfoRow
                icon="repeat-outline"
                label="Pattern"
                value={task.recurrencePattern}
                color="#A29BFE"
              />
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#1C1C1E",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  editIconButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  taskTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#8E8E93",
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: "#fff",
  },
  infoValue: {
    fontSize: 15,
    color: "#8E8E93",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#2C2C2E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 14,
    color: "#A29BFE",
  },
  errorText: {
    fontSize: 18,
    color: "#8E8E93",
  },
});
