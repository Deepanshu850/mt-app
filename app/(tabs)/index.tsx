import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Image } from 'react-native';
import { router } from 'expo-router';
import { Users, FileText, Calendar, Building, Wallet, FileCheck, UserPlus, Clock, Image as ImageIcon, Share2, Briefcase, Headphones, Gamepad2, Calculator, Chrome as Home, DollarSign, ChartBar as BarChart3, TrendingUp, Bell, MessageSquare } from 'lucide-react-native';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const menuItems = [
    { icon: <Users size={24} color="#FFFFFF" />, title: 'Suspects', route: '/suspects', color: '#005b52' },
    { icon: <FileText size={24} color="#FFFFFF" />, title: 'Prospects', route: '/prospects', color: '#005b52' },
    { icon: <Calendar size={24} color="#FFFFFF" />, title: 'Meetings', route: '/meetings', color: '#005b52' },
    { icon: <Building size={24} color="#FFFFFF" />, title: 'Inventory', route: '/inventory', color: '#005b52' },
    { icon: <FileCheck size={24} color="#FFFFFF" />, title: 'Documents', route: '/documents', color: '#005b52' },
    { icon: <Wallet size={24} color="#FFFFFF" />, title: 'Payment Proof', route: '/payment-proof', color: '#005b52' },
    { icon: <UserPlus size={24} color="#FFFFFF" />, title: 'My Team', route: '/my-team', color: '#005b52' },
    { icon: <Clock size={24} color="#FFFFFF" />, title: 'Attendance', route: '/attendance', color: '#005b52' },
    { icon: <ImageIcon size={24} color="#FFFFFF" />, title: 'Gallery', route: '/gallery', color: '#005b52' },
    { icon: <Share2 size={24} color="#FFFFFF" />, title: 'Marketing', route: '/marketing', color: '#005b52' },
    { icon: <Briefcase size={24} color="#FFFFFF" />, title: 'Jobs', route: '/jobs', color: '#005b52' },
    { icon: <Headphones size={24} color="#FFFFFF" />, title: 'Tech Support', route: '/tech-support', color: '#005b52' },
    { icon: <Gamepad2 size={24} color="#FFFFFF" />, title: 'Games', route: '/games', color: '#005b52' },
    { icon: <Calculator size={24} color="#FFFFFF" />, title: 'Calculator', route: '/calculator', color: '#005b52' },
    { icon: <Calculator size={24} color="#FFFFFF" />, title: 'EMI Calculator', route: '/emi-calculator', color: '#005b52' },
  ];

  // Stats for the dashboard
  const stats = [
    { title: 'Properties', value: '24', icon: <Home size={20} color="#FFFFFF" />, color: '#005b52' },
    { title: 'Sales', value: '$1.2M', icon: <DollarSign size={20} color="#FFFFFF" />, color: '#005b52' },
    { title: 'Clients', value: '48', icon: <Users size={20} color="#FFFFFF" />, color: '#005b52' },
    { title: 'Growth', value: '+12%', icon: <TrendingUp size={20} color="#FFFFFF" />, color: '#005b52' },
  ];

  // Recent activities
  const activities = [
    { title: 'New lead assigned', time: '10 min ago', icon: <Users size={16} color="#005b52" /> },
    { title: 'Meeting with John Doe', time: '1 hour ago', icon: <Calendar size={16} color="#005b52" /> },
    { title: 'Property listing updated', time: '3 hours ago', icon: <Building size={16} color="#005b52" /> },
    { title: 'Payment received', time: 'Yesterday', icon: <DollarSign size={16} color="#005b52" /> },
  ];

  // Notifications
  const notifications = [
    { title: 'Team meeting', message: 'Friday at 2:00 PM', icon: <Bell size={16} color="#005b52" /> },
    { title: 'New message', message: 'From Sarah Johnson', icon: <MessageSquare size={16} color="#005b52" /> },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header with logo */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://moneytreerealty.com/assets/img/logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      {/* Welcome section */}
      <View style={[styles.welcomeSection, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <Text style={[styles.welcomeText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Welcome to Money Tree Realty
        </Text>
        <Text style={[styles.dateText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
          {new Date().toDateString()}
        </Text>
      </View>
      
      {/* Stats section */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View 
            key={index} 
            style={[styles.statItem, { backgroundColor: stat.color }]}
          >
            <View style={styles.statIcon}>
              {stat.icon}
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>
      
      {/* Recent activities and notifications */}
      <View style={styles.infoContainer}>
        <View style={[styles.infoCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.infoCardTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Recent Activities
          </Text>
          {activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                {activity.icon}
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
                  {activity.title}
                </Text>
                <Text style={[styles.activityTime, { color: isDark ? '#AAAAAA' : '#888888' }]}>
                  {activity.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={[styles.infoCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.infoCardTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Notifications
          </Text>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationItem}>
              <View style={styles.notificationIcon}>
                {notification.icon}
              </View>
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
                  {notification.title}
                </Text>
                <Text style={[styles.notificationMessage, { color: isDark ? '#AAAAAA' : '#888888' }]}>
                  {notification.message}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={[styles.viewAllText, { color: '#005b52' }]}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Menu grid */}
      <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
        Quick Access
      </Text>
      
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => router.push(item.route)}
          >
            {item.icon}
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 60,
  },
  welcomeSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '23%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoCard: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    marginRight: 8,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationIcon: {
    marginRight: 8,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 12,
  },
  viewAllButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItemText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});