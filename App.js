/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  createChartData,
  formatData,
  getXAxisValues,
  LENGTH_OF_CHART,
  steps,
  stepsData,
} from './data';
import dayjs from 'dayjs';

import MultiLineChart from './src/components/MultiLineChart';
import {
  generateRandomData,
  getRandomColor,
} from './src/components/MultiLineChart/utils.js';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'green',
    flex: 1,
  };

  const [dataGraph, setDataGraph] = React.useState([]);

  const addData = () => {
    const newData = [...dataGraph];
    const color = getRandomColor();

    newData.push({
      item: [
        {date: '2022-04-25', displayDot: false, value: null},
        {
          date: '2022-04-26',
          displayDot: false,
          value: null,
          subLabelProps: {
            align: 'left',
            label: 'Follicular',
          },
        },
        {date: '2022-04-27', displayDot: false, value: null},
        {date: '2022-04-28', displayDot: false, value: null},
        {date: '2022-04-29', displayDot: true, value: 8835},
        {date: '2022-04-30', displayDot: false, value: null},
        {date: '2022-05-01', displayDot: true, value: 6313},
        {date: '2022-05-02', displayDot: false, value: 5426.75},
        {date: '2022-05-03', displayDot: false, value: 4540.5},
        {date: '2022-05-04', displayDot: false, value: 3654.25},
        {date: '2022-05-05', displayDot: true, value: 2768},
        {date: '2022-05-06', displayDot: false, value: 2892.5},
        {date: '2022-05-07', displayDot: false, value: 3017},
        {
          date: '2022-05-08',
          displayDot: true,
          value: 3141.5,
          subLabelProps: {
            align: 'center',
            label: 'Ovulatory',
          },
          displayMarkLine: true,
        },
        {
          date: '2022-05-09',
          displayDot: true,
          value: 3266,
        },
        {date: '2022-05-10', displayDot: false, value: 6273.5},
        {date: '2022-05-11', displayDot: true, value: 9281},
        {date: '2022-05-12', displayDot: false, value: 12268.5},
        {date: '2022-05-13', displayDot: true, value: 15256},
        {date: '2022-05-14', displayDot: false, value: 8584},
        {
          date: '2022-05-15',
          displayDot: true,
          value: 1912,
        },
        {date: '2022-05-16', displayDot: true, value: 3000},
        {date: '2022-05-17', displayDot: true, value: 5000},
        {date: '2022-05-18', displayDot: true, value: null},
        {date: '2022-05-19', displayDot: true, value: null},
        {
          date: '2022-05-20',
          displayDot: true,
          value: 3200,
          subLabelProps: {
            align: 'left',
            label: 'Luteal',
          },
        },
        {date: '2022-05-21', displayDot: true, value: null},
        {date: '2022-05-22', displayDot: true, value: 2000},
      ],
      color,
      type: 'Steps',
    });
    setDataGraph(newData);
  };
  const type = 'month';

  useEffect(() => {
    const endDate = dayjs().endOf('week').add(2, 'day');
    const startDate = endDate.subtract(LENGTH_OF_CHART[type], 'day');
    const data = createChartData(startDate, type, stepsData.data);
    // const data = formatData(steps, 'steps');
    console.log(data);
  }, []);

  const xAxisValues = useMemo(() => {
    const data =
      Array.isArray(dataGraph) && dataGraph.length > 0 ? dataGraph[0].item : [];
    return getXAxisValues(data, type);
  }, [dataGraph]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Animated.View
            flex={1}
            style={{backgroundColor: 'green', padding: 10}}>
            <MultiLineChart graphData={dataGraph} xAxisValues={xAxisValues} />
          </Animated.View>
          <Animated.View>
            <TouchableOpacity onPress={addData}>
              <Text>Add data</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {flex: 1},
});

export default App;
