import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Delete } from 'lucide-react-native';

export default function CalculatorScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  
  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };
  
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };
  
  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  const deleteLastDigit = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.substring(0, display.length - 1));
    }
  };
  
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);
    
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const performCalculation = () => {
    const inputValue = parseFloat(display);
    
    if (operator === '+') {
      return firstOperand + inputValue;
    } else if (operator === '-') {
      return firstOperand - inputValue;
    } else if (operator === '*') {
      return firstOperand * inputValue;
    } else if (operator === '/') {
      return firstOperand / inputValue;
    }
    
    return inputValue;
  };
  
  const calculateResult = () => {
    if (!operator || firstOperand === null) {
      return;
    }
    
    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Calculator
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.calculatorContainer}>
        <View style={[styles.displayContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text 
            style={[
              styles.displayText, 
              { color: isDark ? '#FFFFFF' : '#333333' }
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {display}
          </Text>
        </View>
        
        <View style={styles.keypadContainer}>
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, styles.functionButton, { backgroundColor: isDark ? '#333333' : '#E0E0E0' }]} 
              onPress={clearDisplay}
            >
              <Text style={[styles.buttonText, styles.functionButtonText, { color: '#005b52' }]}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.functionButton, { backgroundColor: isDark ? '#333333' : '#E0E0E0' }]} 
              onPress={deleteLastDigit}
            >
              <Delete size={24} color="#005b52" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.operatorButton, { backgroundColor: '#005b52' }]} 
              onPress={() => handleOperator('/')}
            >
              <Text style={[styles.buttonText, styles.operatorButtonText]}>÷</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(7)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(8)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(9)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.operatorButton, { backgroundColor: '#005b52' }]} 
              onPress={() => handleOperator('*')}
            >
              <Text style={[styles.buttonText, styles.operatorButtonText]}>×</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(4)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(5)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(6)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.operatorButton, { backgroundColor: '#005b52' }]} 
              onPress={() => handleOperator('-')}
            >
              <Text style={[styles.buttonText, styles.operatorButtonText]}>−</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(1)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(2)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(3)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.operatorButton, { backgroundColor: '#005b52' }]} 
              onPress={() => handleOperator('+')}
            >
              <Text style={[styles.buttonText, styles.operatorButtonText]}>+</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, styles.zeroButton, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={() => inputDigit(0)}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]} 
              onPress={inputDecimal}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.operatorButton, { backgroundColor: '#005b52' }]} 
              onPress={calculateResult}
            >
              <Text style={[styles.buttonText, styles.operatorButtonText]}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calculatorContainer: {
    flex: 1,
    padding: 16,
  },
  displayContainer: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  keypadContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  zeroButton: {
    flex: 2,
  },
  functionButton: {
    flex: 1.5,
  },
  operatorButton: {
    aspectRatio: 1,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  functionButtonText: {
    fontSize: 20,
  },
  operatorButtonText: {
    color: '#FFFFFF',
  },
});