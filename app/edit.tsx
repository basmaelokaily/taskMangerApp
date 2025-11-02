// ============================================
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = "https://task-manager-production-4aeb.up.railway.app";

export default function EditTask() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "today",
    category: "",
    tags: "",
    assignedTo: "",
    createdBy: "",
    estimatedMinutes: "",
    actualMinutes: "",
    isRecurring: false,
    recurrencePattern: "",
  });

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${API_BASE}/mytasks/${id}`);
      const data = await response.json();

      setFormData({
        title: data.title || "",
        description: data.description || "",
        status: data.status || "todo",
        priority: data.priority || "medium",
        dueDate: data.dueDate || "today",
        category: data.category || "",
        tags: data.tags ? data.tags.join(", ") : "",
        assignedTo: data.assignedTo || "",
        createdBy: data.createdBy || "",
        estimatedMinutes: data.estimatedMinutes?.toString() || "",
        actualMinutes: data.actualMinutes?.toString() || "",
        isRecurring: data.isRecurring || false,
        recurrencePattern: data.recurrencePattern || "",
      });
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
        estimatedMinutes: formData.estimatedMinutes
          ? Number(formData.estimatedMinutes)
          : undefined,
        actualMinutes: formData.actualMinutes
          ? Number(formData.actualMinutes)
          : undefined,
      };

      const response = await fetch(`${API_BASE}/mytasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const SelectButton = ({ label, selected, onPress, color }: any) => (
    <TouchableOpacity
      style={[
        editStyles.selectButton,
        selected && { backgroundColor: color + "20", borderColor: color },
      ]}
      onPress={onPress}
    >
      <Text style={[editStyles.selectButtonText, selected && { color }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[editStyles.container, editStyles.centerContent]}>
        <ActivityIndicator size="large" color="#A29BFE" />
        <Text style={editStyles.loadingText}>Loading task...</Text>
      </View>
    );
  }

  return (
    <View style={editStyles.container}>
      <View style={editStyles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={editStyles.backButton}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={editStyles.headerTitle}>Edit Task</Text>
        <TouchableOpacity onPress={handleSubmit} style={editStyles.saveButton}>
          <Text style={editStyles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={editStyles.form} showsVerticalScrollIndicator={false}>
        <View style={editStyles.section}>
          <Text style={editStyles.label}>Title *</Text>
          <TextInput
            style={editStyles.input}
            placeholder="Enter task title"
            placeholderTextColor="#8E8E93"
            value={formData.title}
            onChangeText={(text) => updateField("title", text)}
          />
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Description</Text>
          <TextInput
            style={[editStyles.input, editStyles.textArea]}
            placeholder="Add details..."
            placeholderTextColor="#8E8E93"
            value={formData.description}
            onChangeText={(text) => updateField("description", text)}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Priority</Text>
          <View style={editStyles.selectGroup}>
            <SelectButton
              label="Low"
              selected={formData.priority === "low"}
              onPress={() => updateField("priority", "low")}
              color="#95E1D3"
            />
            <SelectButton
              label="Medium"
              selected={formData.priority === "medium"}
              onPress={() => updateField("priority", "medium")}
              color="#4ECDC4"
            />
            <SelectButton
              label="High"
              selected={formData.priority === "high"}
              onPress={() => updateField("priority", "high")}
              color="#FF9F43"
            />
            <SelectButton
              label="Urgent"
              selected={formData.priority === "urgent"}
              onPress={() => updateField("priority", "urgent")}
              color="#FF6B6B"
            />
          </View>
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Status</Text>
          <View style={editStyles.selectGroup}>
            <SelectButton
              label="To Do"
              selected={formData.status === "todo"}
              onPress={() => updateField("status", "todo")}
              color="#A29BFE"
            />
            <SelectButton
              label="In Progress"
              selected={formData.status === "in_progress"}
              onPress={() => updateField("status", "in_progress")}
              color="#FD79A8"
            />
            <SelectButton
              label="Completed"
              selected={formData.status === "completed"}
              onPress={() => updateField("status", "completed")}
              color="#26DE81"
            />
          </View>
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Due Date</Text>
          <View style={editStyles.selectGroup}>
            <SelectButton
              label="Today"
              selected={formData.dueDate === "today"}
              onPress={() => updateField("dueDate", "today")}
              color="#A29BFE"
            />
            <SelectButton
              label="This Week"
              selected={formData.dueDate === "this_week"}
              onPress={() => updateField("dueDate", "this_week")}
              color="#A29BFE"
            />
          </View>
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Category</Text>
          <TextInput
            style={editStyles.input}
            placeholder="e.g., Work, Personal"
            placeholderTextColor="#8E8E93"
            value={formData.category}
            onChangeText={(text) => updateField("category", text)}
          />
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Tags</Text>
          <TextInput
            style={editStyles.input}
            placeholder="Comma separated tags"
            placeholderTextColor="#8E8E93"
            value={formData.tags}
            onChangeText={(text) => updateField("tags", text)}
          />
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Assigned To</Text>
          <TextInput
            style={editStyles.input}
            placeholder="Enter assignee name"
            placeholderTextColor="#8E8E93"
            value={formData.assignedTo}
            onChangeText={(text) => updateField("assignedTo", text)}
          />
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Estimated Time (minutes)</Text>
          <TextInput
            style={editStyles.input}
            placeholder="e.g., 30"
            placeholderTextColor="#8E8E93"
            value={formData.estimatedMinutes}
            onChangeText={(text) => updateField("estimatedMinutes", text)}
            keyboardType="numeric"
          />
        </View>

        <View style={editStyles.section}>
          <Text style={editStyles.label}>Actual Time (minutes)</Text>
          <TextInput
            style={editStyles.input}
            placeholder="e.g., 45"
            placeholderTextColor="#8E8E93"
            value={formData.actualMinutes}
            onChangeText={(text) => updateField("actualMinutes", text)}
            keyboardType="numeric"
          />
        </View>

        <View style={editStyles.section}>
          <View style={editStyles.switchRow}>
            <Text style={editStyles.label}>Recurring Task</Text>
            <Switch
              value={formData.isRecurring}
              onValueChange={(value) => updateField("isRecurring", value)}
              trackColor={{ false: "#3E3E3E", true: "#A29BFE" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {formData.isRecurring && (
          <View style={editStyles.section}>
            <Text style={editStyles.label}>Recurrence Pattern</Text>
            <View style={editStyles.selectGroup}>
              <SelectButton
                label="Daily"
                selected={formData.recurrencePattern === "daily"}
                onPress={() => updateField("recurrencePattern", "daily")}
                color="#A29BFE"
              />
              <SelectButton
                label="Weekly"
                selected={formData.recurrencePattern === "weekly"}
                onPress={() => updateField("recurrencePattern", "weekly")}
                color="#A29BFE"
              />
              <SelectButton
                label="Monthly"
                selected={formData.recurrencePattern === "monthly"}
                onPress={() => updateField("recurrencePattern", "monthly")}
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

const editStyles = StyleSheet.create({
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#A29BFE",
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  selectGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2C2C2E",
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 12,
  },
});
