import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from "react-native-gifted-charts";

const DashboardScreen = () => {
  const lineData = [
    { value: 0, dataPointText: '0' },
    { value: 10, dataPointText: '10' },
    { value: 8, dataPointText: '8' },
    { value: 58, dataPointText: '58' },
    { value: 56, dataPointText: '56' },
    { value: 78, dataPointText: '78' },
    { value: 74, dataPointText: '74' },
    { value: 98, dataPointText: '98' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>Volume de lixo (%) x 5 minutos</Text>

      <View style={{ backgroundColor: '#e7dfec', borderRadius: 10, padding: 10 }}>
        <LineChart
          data={lineData}
          height={250}
          showVerticalLines
          spacing={44}
          initialSpacing={0}
          color1="#674fa3"
          textColor1="green"
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsColor1="blue"
          dataPointsColor2="red"
          textShiftY={-2}
          textShiftX={-5}
          textFontSize={13}
          isAnimated
        />
      </View>
    </View>
  );
};

export default DashboardScreen;
