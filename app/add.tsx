import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = "https://task-manager-production-4aeb.up.railway.app";

export default function AddTask() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "today",
    category: "",
    tags: "",
    assignedTo: "",
    createdBy: "user123",
    estimatedMinutes: "",
    actualMinutes: "",
    isRecurring: false,
    recurrencePattern: "",
  });

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

      const response = await fetch(`${API_BASE}/mytasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const SelectButton = ({ label, selected, onPress, color }: any) => (
    <TouchableOpacity
      style={[
        addStyles.selectButton,
        selected && { backgroundColor: color + "20", borderColor: color },
      ]}
      onPress={onPress}
    >
      <Text style={[addStyles.selectButtonText, selected && { color }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={addStyles.container}>
      <View style={addStyles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={addStyles.backButton}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={addStyles.headerTitle}>New Task</Text>
        <TouchableOpacity onPress={handleSubmit} style={addStyles.saveButton}>
          <Text style={addStyles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={addStyles.form} showsVerticalScrollIndicator={false}>
        <View style={addStyles.section}>
          <Text style={addStyles.label}>Title *</Text>
          <TextInput
            style={addStyles.input}
            placeholder="Enter task title"
            placeholderTextColor="#8E8E93"
            value={formData.title}
            onChangeText={(text) => updateField("title", text)}
          />
        </View>

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Description</Text>
          <TextInput
            style={[addStyles.input, addStyles.textArea]}
            placeholder="Add details..."
            placeholderTextColor="#8E8E93"
            value={formData.description}
            onChangeText={(text) => updateField("description", text)}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Priority</Text>
          <View style={addStyles.selectGroup}>
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

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Status</Text>
          <View style={addStyles.selectGroup}>
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

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Due Date</Text>
          <View style={addStyles.selectGroup}>
            <SelectButton
              label="Today"
              selected={formData.dueDate === "today"}
              onPress={() => updateField("dueDate", "today")}
              color="#A29BFE"
            />
            <SelectButton
              label="Tomorrow"
              selected={formData.dueDate === "tomorrow"}
              onPress={() => updateField("dueDate", "tomorrow")}
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

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Category</Text>
          <TextInput
            style={addStyles.input}
            placeholder="e.g., Work, Personal"
            placeholderTextColor="#8E8E93"
            value={formData.category}
            onChangeText={(text) => updateField("category", text)}
          />
        </View>

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Tags</Text>
          <TextInput
            style={addStyles.input}
            placeholder="Comma separated tags"
            placeholderTextColor="#8E8E93"
            value={formData.tags}
            onChangeText={(text) => updateField("tags", text)}
          />
        </View>

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Assigned To</Text>
          <TextInput
            style={addStyles.input}
            placeholder="Enter assignee name"
            placeholderTextColor="#8E8E93"
            value={formData.assignedTo}
            onChangeText={(text) => updateField("assignedTo", text)}
          />
        </View>

        <View style={addStyles.section}>
          <Text style={addStyles.label}>Estimated Time (minutes)</Text>
          <TextInput
            style={addStyles.input}
            placeholder="e.g., 30"
            placeholderTextColor="#8E8E93"
            value={formData.estimatedMinutes}
            onChangeText={(text) => updateField("estimatedMinutes", text)}
            keyboardType="numeric"
          />
        </View>

        <View style={addStyles.section}>
          <View style={addStyles.switchRow}>
            <Text style={addStyles.label}>Recurring Task</Text>
            <Switch
              value={formData.isRecurring}
              onValueChange={(value) => updateField("isRecurring", value)}
              trackColor={{ false: "#3E3E3E", true: "#A29BFE" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {formData.isRecurring && (
          <View style={addStyles.section}>
            <Text style={addStyles.label}>Recurrence Pattern</Text>
            <View style={addStyles.selectGroup}>
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

const addStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
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
});
