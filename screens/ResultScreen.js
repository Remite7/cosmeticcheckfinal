import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ingredientsData from '../ingredients.json'; // Adjust the path as needed

export default function ResultScreen({ route }) {
  const { text } = route.params;
  const ingredientsList = text.split(',').map(item => item.trim());
  const ingredientsStatus = ingredientsList.map(ingredient => ({
    name: ingredient,
    status: ingredientsData.ingredients[ingredient] || 'Unknown'
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Ingredients Check</Text>
      {ingredientsStatus.map((ingredient, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <View style={[
            styles.statusBar,
            ingredient.status === 'Safe' && styles.safeBar,
            ingredient.status === 'Generally safe' && styles.generallySafeBar,
            ingredient.status === 'Potentially irritating' && styles.potentiallyIrritatingBar,
            ingredient.status === 'Controversial' && styles.controversialBar,
            ingredient.status === 'Unknown' && styles.unknownBar
          ]}/>
          <View style={styles.ingredientTextContainer}>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <Text style={[
              styles.ingredientStatus,
              ingredient.status === 'Safe' && styles.safeText,
              ingredient.status === 'Generally safe' && styles.generallySafeText,
              ingredient.status === 'Potentially irritating' && styles.potentiallyIrritatingText,
              ingredient.status === 'Controversial' && styles.controversialText,
              ingredient.status === 'Unknown' && styles.unknownText
            ]}>
              {ingredient.status}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statusBar: {
    width: 10,
    height: '100%',
    borderRadius: 8,
  },
  safeBar: {
    backgroundColor: 'green',
  },
  generallySafeBar: {
    backgroundColor: 'blue',
  },
  potentiallyIrritatingBar: {
    backgroundColor: 'orange',
  },
  controversialBar: {
    backgroundColor: 'red',
  },
  unknownBar: {
    backgroundColor: 'gray',
  },
  ingredientTextContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ingredientStatus: {
    fontSize: 16,
  },
  safeText: {
    color: 'green',
  },
  generallySafeText: {
    color: 'blue',
  },
  potentiallyIrritatingText: {
    color: 'orange',
  },
  controversialText: {
    color: 'red',
  },
  unknownText: {
    color: 'gray',
  },
});
