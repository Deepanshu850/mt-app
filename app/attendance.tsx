import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, MapPin, Check, X, Filter, User } from 'lucide-react-native';

// Sample attendance data
const attendanceRecords = [
  {
    id: '1',
    name: 'John Smith',
    date: '2025-01-15',
    checkIn: '08:45 AM',
    checkOut: '05:30 PM',
    location: 'Main Office',
    status: 'Present',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    date: '2025-01-15',
    checkIn: '09:05 AM',
    checkOut: '06:15 PM',
    location: 'Main Office',
    status: 'Present',
  },
  {
    id: '3',
    name: 'Michael Brown',
    date: '2025-01-15',
    checkIn: '08:30 AM',
    checkOut: '05:45 PM',
    location: 'Downtown Branch',
    status: 'Present',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    date: '2025-01-15',
    checkIn: '09:20 AM',
    checkOut: '06:00 PM',
    location: 'Suburban Branch',
    status: 'Present',
  },
  {
    id: '5',
    name: 'David Lee',
    date: '2025-01-15',
    checkIn: '-',
    checkOut: '-',
    location: '-',
    status: 'Absent',
  },
  {
    id: '6',
    name: 'Jessica Martinez',
    date: '2025-01-15',
    checkIn: '08:55 AM',
    checkOut: '05:50 PM',
    location: 'Downtown Branch',
    status: 'Present',
  },
  {
    id: '7',
    name: 'Robert Johnson',
    date: '2025-01-15',
    checkIn: '09:30 AM',
    checkOut: '-',
    location: 'Main Office',
    status: 'Late',
  },
  {
    id: '8',
    name: 'Jennifer Williams',
    date: '2025-01-15',
    checkIn: '10:15 AM',
    checkOut: '04:30 PM',
    location: 'Main Office',
    status: 'Late',
  },
];

export default function AttendanceScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  
  const filteredAttendance = attendanceRecords.filter(record => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'present') return record.status === 'Present';
    if (activeFilter === 'late') return record.status === 'Late';
    if (activeFilter === 'absent') return record.status === 'Absent';
    
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present':
        return '#00796B';
      case 'Late':
        return '#FFA000';
      case 'Absent':
        return '#D32F2F';
      default:
        return '#005b52';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Present':
        return <Check size={14} color="#FFFFFF" />;
      case 'Late':
        return <Clock size={14} color="#FFFFFF" />;
      case 'Absent':
        return <X size={14} color="#FFFFFF" />;
      default:
        return null;
    }
  };

  const renderAttendanceRecord = ({ item }) => (
    <View 
      style={[
        styles.attendanceItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <View style={styles.attendanceHeader}>
        <View style={styles.attendanceUser}>
          <User size={16} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.attendanceName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {item.name}
          </Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.attendanceDetails}>
        <View style={styles.attendanceDetail}>
          <Calendar size={16} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.attendanceDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.date}
          </Text>
        </View>
        
        <View style={styles.attendanceTimeRow}>
          <View style={styles.attendanceTime}>
            <Text style={[styles.attendanceTimeLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>
              Check In:
            </Text>
            <Text 
              style={[
                styles.attendanceTimeValue, 
                { color: isDark ? '#FFFFFF' : '#333333' },
                item.checkIn === '-' && { color: isDark ? '#666666' : '#999999' }
              ]}
            >
              {item.checkIn}
            </Text>
          </View>
          
          <View style={styles.attendanceTime}>
            <Text style={[styles.attendanceTimeLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>
              Check Out:
            </Text>
            <Text 
              style={[
                styles.attendanceTimeValue, 
                { color: isDark ? '#FFFFFF' : '#333333' },
                item.checkOut === '-' && { color: isDark ? '#666666' : '#999999' }
              ]}
            >
              {item.checkOut}
            </Text>
          </View>
        </View>
        
        {item.status !== 'Absent' && (
          <View style={styles.attendanceDetail}>
            <MapPin size={16} color={isDark ? '#AAAAAA' : '#666666'} />
            <Text style={[styles.attendanceDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              {item.location}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Attendance
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.dateSelector, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity style={styles.dateArrow}>
          <ArrowLeft size={20} color="#005b52" />
        </TouchableOpacity>
        <View style={styles.dateContainer}>
          <Calendar size={20} color="#005b52" />
          <Text style={[styles.dateText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {selectedDate}
          </Text>
        </View>
        <TouchableOpacity style={[styles.dateArrow, { transform: [{ rotate: '180deg' }] }]}>
          <ArrowLeft size={20} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.statsContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>6</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>Present</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>2</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>Late</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>1</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>Absent</Text>
        </View>
      </View>
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All' },
            { id: 'present', label: 'Present' },
            { id: 'late', label: 'Late' },
            { id: 'absent', label: 'Absent' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      <FlatList
        data={filteredAttendance}
        renderItem={renderAttendanceRecord}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

function ScrollableFilter({ options, activeFilter, onFilterChange, isDark }) {
  return (
    <View style={styles.scrollableFilter}>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.filterOption,
            activeFilter === option.id && [styles.activeFilterOption, { backgroundColor: '#005b52' }]
          ]}
          onPress={() => onFilterChange(option.id)}
        >
          <Text
            style={[
              styles.filterOptionText,
              { color: isDark ? '#CCCCCC' : '#666666' },
              activeFilter === option.id && { color: '#FFFFFF' }
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
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
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  dateArrow: {
    padding: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#DDDDDD',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  scrollableFilter: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  activeFilterOption: {
    borderColor: '#005b52',
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  attendanceItem: {
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  attendanceUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  attendanceDetails: {
    padding: 12,
  },
  attendanceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendanceDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  attendanceTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  attendanceTime: {
    flexDirection: 'column',
  },
  attendanceTimeLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  attendanceTimeValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});