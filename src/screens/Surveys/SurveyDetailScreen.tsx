import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { SurveyDetailDataItem } from "../../types/survey";
import { getSurveyData } from "../../utils/surveyStorage";

const SurveyDetailScreen = () => {
  const [surveyData, setSurveyData] = useState<SurveyDetailDataItem[]>([]);

  const getSurveyDataFromStorage = async () => {
    const dataArr: SurveyDetailDataItem[] = [];
    const surveyData = await getSurveyData();

    if (surveyData) {
      for (const [surveyId, survey] of Object.entries(surveyData)) {
        dataArr.push({ surveyId, ...survey });
      }
    }

    setSurveyData(dataArr);
  };

  useEffect(() => {
    getSurveyDataFromStorage();
  }, []);

  const renderItem = ({ item }: { item: SurveyDetailDataItem }) => (
    <View style={styles.listItem}>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemDetails}>
          <Ionicons name='calendar' size={20} color='#0300A3' />
          <Text style={styles.itemText}>
            {new Date(item.lastAnswerDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </Text>
          <Ionicons name='time' size={20} color='#0300A3' style={styles.itemIcon} />
          <Text style={styles.itemText}>
            {new Date(item.lastAnswerDate).toLocaleTimeString("en-US", {
              minute: "numeric",
              second: "numeric",
            })}
          </Text>
        </View>
        {item.score && (
          <Button mode='contained' style={styles.scoreButton} labelStyle={styles.scoreButtonLabel}>
            Modunuz: {item.score}
          </Button>
        )}
      </View>
      <TouchableOpacity>
        <Ionicons name='chevron-down' size={30} color='#0300A3' />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Tamamlanan Anketler</Text>
      <View style={styles.surveyStatsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>30</Text>
          <Text style={styles.statLabel}>Puan</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Toplam</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Bugün</Text>
        </View>
      </View>
      <View style={styles.listHeader}>
        <Ionicons name='menu' size={30} color='black' />
        <Text style={styles.listHeaderText}>Liste</Text>
      </View>
      <FlatList
        data={surveyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.surveyId}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  surveyStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "#0300A3",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  listHeaderText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 100,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemText: {
    marginLeft: 5,
    color: "#0300A3",
  },
  itemIcon: {
    marginLeft: 15,
  },
  scoreButton: {
    alignSelf: "flex-start",
    backgroundColor: "#0300A3",
  },
  scoreButtonLabel: {
    color: "white",
  },
});

export default SurveyDetailScreen;
