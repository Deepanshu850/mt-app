import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';

export default function TicTacToeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    return null;
  };
  
  const handlePress = (index) => {
    if (board[index] || gameOver) return;
    
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every(square => square !== null)) {
      setGameOver(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };
  
  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(square => square !== null)
      ? 'Game ended in a draw!'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;
  
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Tic Tac Toe
        </Text>
        <TouchableOpacity onPress={resetGame}>
          <RefreshCw size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.gameContainer}>
        <Text style={[styles.status, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {status}
        </Text>
        
        <View style={styles.board}>
          {board.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.square,
                { 
                  backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
                  borderColor: isDark ? '#333333' : '#DDDDDD'
                }
              ]}
              onPress={() => handlePress(index)}
            >
              <Text style={[
                styles.squareText,
                { 
                  color: value === 'X' 
                    ? '#005b52' 
                    : (value === 'O' ? '#FFA000' : 'transparent')
                }
              ]}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={[styles.resetButton, { backgroundColor: '#005b52' }]}
          onPress={resetGame}
        >
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
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
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});