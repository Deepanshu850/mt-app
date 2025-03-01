import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { 
  ArrowLeft, Search, Filter, Briefcase, MapPin, DollarSign, 
  Calendar, Clock, User, Plus, ChevronDown, ChevronUp, Check
} from 'lucide-react-native';

// Sample jobs data
const jobs = [
  {
    id: '1',
    title: 'Real Estate Agent',
    company: 'Money Tree Realty',
    location: 'Main Office',
    salary: '$50,000 - $100,000',
    type: 'Full-time',
    posted: '2025-01-15',
    deadline: '2025-02-15',
    description: 'We are looking for experienced real estate agents to join our growing team. The ideal candidate will have a strong sales background and excellent communication skills.',
    requirements: [
      'Real estate license',
      '2+ years of experience',
      'Strong communication skills',
      'Self-motivated'
    ],
    responsibilities: [
      'Generate leads and build client relationships',
      'Show properties to potential buyers',
      'Negotiate contracts',
      'Stay updated on market trends'
    ]
  },
  {
    id: '2',
    title: 'Marketing Specialist',
    company: 'Money Tree Realty',
    location: 'Downtown Branch',
    salary: '$45,000 - $65,000',
    type: 'Full-time',
    posted: '2025-01-14',
    deadline: '2025-02-14',
    description: 'Join our marketing team to help create and implement marketing strategies for our properties and services.',
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      '2+ years of experience',
      'Social media expertise',
      'Graphic design skills'
    ],
    responsibilities: [
      'Create marketing materials',
      'Manage social media accounts',
      'Coordinate advertising campaigns',
      'Track marketing metrics'
    ]
  },
  {
    id: '3',
    title: 'Property Manager',
    company: 'Money Tree Realty',
    location: 'Suburban Branch',
    salary: '$55,000 - $75,000',
    type: 'Full-time',
    posted: '2025-01-13',
    deadline: '2025-02-13',
    description: 'We are seeking a property manager to oversee our rental properties and ensure tenant satisfaction.',
    requirements: [
      'Property management experience',
      'Strong organizational skills',
      'Customer service orientation',
      'Knowledge of rental laws'
    ],
    responsibilities: [
      'Manage tenant relationships',
      'Handle maintenance requests',
      'Collect rent',
      'Conduct property inspections'
    ]
  },
  {
    id: '4',
    title: 'Administrative Assistant',
    company: 'Money Tree Realty',
    location: 'Main Office',
    salary: '$35,000 - $45,000',
    type: 'Full-time',
    posted: '2025-01-12',
    deadline: '2025-02-12',
    description: 'Looking for an administrative assistant to support our real estate team with daily office operations.',
    requirements: [
      'Administrative experience',
      'Proficiency in Microsoft Office',
      'Excellent organizational skills',
      'Strong attention to detail'
    ],
    responsibilities: [
      'Answer phones and emails',
      'Schedule appointments',
      'Maintain filing systems',
      'Prepare documents'
    ]
  },
  {
    id: '5',
    title: 'Real Estate Photographer',
    company: 'Money Tree Realty',
    location: 'Various Locations',
    salary: '$40,000 - $60,000',
    type: 'Part-time',
    posted: '2025-01-11',
    deadline: '2025-02-11',
    description: 'We need a skilled photographer to capture high-quality images of our properties for marketing materials.',
    requirements: [
      'Photography experience',
      'Own equipment',
      'Flexible schedule',
      'Eye for detail'
    ],
    responsibilities: [
      'Photograph properties',
      'Edit images',
      'Create virtual tours',
      'Coordinate with agents'
    ]
  },
];

export default function JobsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    salary: '',
    type: 'Full-time',
    deadline: '',
    description: '',
    requirements: '',
    responsibilities: ''
  });
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'full-time') return matchesSearch && job.type === 'Full-time';
    if (activeFilter === 'part-time') return matchesSearch && job.type === 'Part-time';
    
    return matchesSearch;
  });

  const toggleJobExpand = (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
    }
  };

  const renderJob = ({ item }) => (
    <View 
      style={[
        styles.jobItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <TouchableOpacity 
        style={styles.jobHeader}
        onPress={() => toggleJobExpand(item.id)}
      >
        <View style={styles.jobTitleContainer}>
          <Text style={[styles.jobTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {item.title}
          </Text>
          <Text style={[styles.jobCompany, { color: isDark ? '#AAAAAA' : '#888888' }]}>
            {item.company}
          </Text>
        </View>
        <View style={styles.jobHeaderRight}>
          <View style={[
            styles.jobTypeBadge, 
            { backgroundColor: item.type === 'Full-time' ? '#005b52' : '#FFA000' }
          ]}>
            <Text style={styles.jobTypeText}>{item.type}</Text>
          </View>
          {expandedJob === item.id ? (
            <ChevronUp size={20} color={isDark ? '#CCCCCC' : '#666666'} />
          ) : (
            <ChevronDown size={20} color={isDark ? '#CCCCCC' : '#666666'} />
          )}
        </View>
      </TouchableOpacity>
      
      <View style={styles.jobDetails}>
        <View style={styles.jobDetailRow}>
          <MapPin size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.jobDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.location}
          </Text>
        </View>
        
        <View style={styles.jobDetailRow}>
          <DollarSign size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.jobDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.salary}
          </Text>
        </View>
        
        <View style={styles.jobDetailRow}>
          <Calendar size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.jobDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            Posted: {item.posted}
          </Text>
        </View>
        
        <View style={styles.jobDetailRow}>
          <Clock size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.jobDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            Deadline: {item.deadline}
          </Text>
        </View>
      </View>
      
      {expandedJob === item.id && (
        <View style={[
          styles.jobExpandedContent, 
          { borderTopColor: isDark ? '#333333' : '#EEEEEE' }
        ]}>
          <Text style={[styles.jobSectionTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Description
          </Text>
          <Text style={[styles.jobDescription, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.description}
          </Text>
          
          <Text style={[styles.jobSectionTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Requirements
          </Text>
          {item.requirements.map((req, index) => (
            <View key={index} style={styles.requirementItem}>
              <View style={[styles.bulletPoint, { backgroundColor: '#005b52' }]} />
              <Text style={[styles.requirementText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
                {req}
              </Text>
            </View>
          ))}
          
          <Text style={[styles.jobSectionTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Responsibilities
          </Text>
          {item.responsibilities.map((resp, index) => (
            <View key={index} style={styles.requirementItem}>
              <View style={[styles.bulletPoint, { backgroundColor: '#005b52' }]} />
              <Text style={[styles.requirementText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
                {resp}
              </Text>
            </View>
          ))}
          
          <View style={styles.jobActions}>
            <TouchableOpacity style={[styles.jobAction, { backgroundColor: '#005b52' }]}>
              <Text style={styles.jobActionText}>Apply Now</Text>
            </TouchableOpacity>
            <View style={styles.jobSecondaryActions}>
              <TouchableOpacity style={styles.jobSecondaryAction}>
                <Calendar size={20} color="#005b52" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.jobSecondaryAction}>
                <User size={20} color="#005b52" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Jobs
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      {showForm && (
        <ScrollView style={[styles.formContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Post New Job
          </Text>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Job Title</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter job title"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newJob.title}
              onChangeText={(text) => setNewJob({...newJob, title: text})}
            />
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formField, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Location</Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                placeholder="Job location"
                placeholderTextColor={isDark ? '#999999' : '#888888'}
                value={newJob.location}
                onChangeText={(text) => setNewJob({...newJob, location: text})}
              />
            </View>
            
            <View style={[styles.formField, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Salary Range</Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                placeholder="e.g. $50,000 - $70,000"
                placeholderTextColor={isDark ? '#999999' : '#888888'}
                value={newJob.salary}
                onChangeText={(text) => setNewJob({...newJob, salary: text})}
              />
            </View>
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Job Type</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeOption,
                  { 
                    backgroundColor: newJob.type === 'Full-time' ? '#005b52' : (isDark ? '#333333' : '#F5F5F5'),
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                onPress={() => setNewJob({...newJob, type: 'Full-time'})}
              >
                <Text 
                  style={[
                    styles.typeOptionText,
                    { color: newJob.type === 'Full-time' ? '#FFFFFF' : (isDark ? '#CCCCCC' : '#666666') }
                  ]}
                >
                  Full-time
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.typeOption,
                  { 
                    backgroundColor: newJob.type === 'Part-time' ? '#005b52' : (isDark ? '#333333' : '#F5F5F5'),
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                onPress={() => setNewJob({...newJob, type: 'Part-time'})}
              >
                <Text 
                  style={[
                    styles.typeOptionText,
                    { color: newJob.type === 'Part-time' ? '#FFFFFF' : (isDark ? '#CCCCCC' : '#666666') }
                  ]}
                >
                  Part-time
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Application Deadline</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newJob.deadline}
              onChangeText={(text) => setNewJob({...newJob, deadline: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Job Description</Text>
            <TextInput
              style={[
                styles.formTextarea,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter job description"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              multiline
              numberOfLines={4}
              value={newJob.description}
              onChangeText={(text) => setNewJob({...newJob, description: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Requirements</Text>
            <TextInput
              style={[
                styles.formTextarea,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter job requirements (one per line)"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              multiline
              numberOfLines={4}
              value={newJob.requirements}
              onChangeText={(text) => setNewJob({...newJob, requirements: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Responsibilities</Text>
            <TextInput
              style={[
                styles.formTextarea,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter job responsibilities (one per line)"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              multiline
              numberOfLines={4}
              value={newJob.responsibilities}
              onChangeText={(text) => setNewJob({...newJob, responsibilities: text})}
            />
          </View>
          
          <View style={styles.formButtons}>
            <TouchableOpacity 
              style={[styles.formButton, styles.cancelButton, { backgroundColor: isDark ? '#333333' : '#EEEEEE' }]}
              onPress={() => setShowForm(false)}
            >
              <Text style={[styles.formButtonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.formButton, styles.submitButton, { backgroundColor: '#005b52' }]}
              onPress={() => {
                // In a real app, you would save the job to a database
                setShowForm(false);
                // Reset form
                setNewJob({
                  title: '',
                  location: '',
                  salary: '',
                  type: 'Full-time',
                  deadline: '',
                  description: '',
                  requirements: '',
                  responsibilities: ''
                });
              }}
            >
              <Text style={styles.submitButtonText}>Post Job</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      
      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <Search size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#333333' }]}
          placeholder="Search jobs..."
          placeholderTextColor={isDark ? '#999999' : '#888888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All Jobs' },
            { id: 'full-time', label: 'Full-time' },
            { id: 'part-time', label: 'Part-time' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      <FlatList
        data={filteredJobs}
        renderItem={renderJob}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setShowForm(!showForm)}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
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
  jobItem: {
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
  },
  jobHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  jobTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDetails: {
    padding: 12,
  },
  jobDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  jobExpandedContent: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  jobSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },
  jobDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  requirementText: {
    fontSize: 14,
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  jobAction: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  jobActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  jobSecondaryActions: {
    flexDirection: 'row',
  },
  jobSecondaryAction: {
    padding: 8,
    marginLeft: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#005b52',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  formContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  formInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  formTextarea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
  },
  typeOption: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginRight: 4,
  },
  typeOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 8,
  },
  submitButton: {
    marginLeft: 8,
  },
  formButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});