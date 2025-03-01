import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calculator, DollarSign, Calendar, Percent } from 'lucide-react-native';

export default function EMICalculatorScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const time = parseFloat(loanTerm) * 12; // Total months
    
    if (principal > 0 && rate > 0 && time > 0) {
      const emiValue = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      const totalPaymentValue = emiValue * time;
      const totalInterestValue = totalPaymentValue - principal;
      
      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalPayment(totalPaymentValue);
      setShowResult(true);
    }
  };
  
  const resetCalculator = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setEmi(0);
    setTotalInterest(0);
    setTotalPayment(0);
    setShowResult(false);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          EMI Calculator
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.card, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Loan Details
          </Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <DollarSign size={20} color="#005b52" />
            </View>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333333' : '#F0F0F0',
                  color: isDark ? '#FFFFFF' : '#333333'
                }
              ]}
              placeholder="Loan Amount"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              keyboardType="numeric"
              value={loanAmount}
              onChangeText={setLoanAmount}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Percent size={20} color="#005b52" />
            </View>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333333' : '#F0F0F0',
                  color: isDark ? '#FFFFFF' : '#333333'
                }
              ]}
              placeholder="Interest Rate (% per annum)"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              keyboardType="numeric"
              value={interestRate}
              onChangeText={setInterestRate}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Calendar size={20} color="#005b52" />
            </View>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333333' : '#F0F0F0',
                  color: isDark ? '#FFFFFF' : '#333333'
                }
              ]}
              placeholder="Loan Term (years)"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              keyboardType="numeric"
              value={loanTerm}
              onChangeText={setLoanTerm}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.calculateButton, { backgroundColor: '#005b52' }]}
              onPress={calculateEMI}
            >
              <Calculator size={20} color="#FFFFFF" />
              <Text style={styles.calculateButtonText}>Calculate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.resetButton, 
                { backgroundColor: isDark ? '#333333' : '#E0E0E0' }
              ]}
              onPress={resetCalculator}
            >
              <Text style={[styles.resetButtonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {showResult && (
          <View style={[styles.resultCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              EMI Calculation Results
            </Text>
            
            <View style={styles.resultItem}>
              <Text style={[styles.resultLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>
                Monthly EMI:
              </Text>
              <Text style={[styles.resultValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>
                ${emi.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.resultItem}>
              <Text style={[styles.resultLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>
                Total Interest Payable:
              </Text>
              <Text style={[styles.resultValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>
                ${totalInterest.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.resultItem}>
              <Text style={[styles.resultLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>
                Total Payment:
              </Text>
              <Text style={[styles.resultValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>
                ${totalPayment.toFixed(2)}
              </Text>
            </View>
            
            <View style={[styles.summaryBox, { backgroundColor: isDark ? '#333333' : '#E0F2F1' }]}>
              <Text style={[styles.summaryText, { color: isDark ? '#FFFFFF' : '#005b52' }]}>
                Your monthly EMI payment will be ${emi.toFixed(2)} for {loanTerm} years.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  calculateButton: {
    marginRight: 8,
  },
  resetButton: {
    marginLeft: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  resultLabel: {
    fontSize: 16,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
    textAlign: 'center',
  },
});