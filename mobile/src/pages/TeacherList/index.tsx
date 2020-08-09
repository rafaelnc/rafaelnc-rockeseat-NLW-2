import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';


function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [favorites, setFavorites] = useState<Number[]>([]);
 

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

function loadFavorites (){

        AsyncStorage.getItem('favorites').then( response => {
            if (response) {

                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map( (teacher: Teacher) =>{
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    
    function handleToggleFilterVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFilterSubmit(){

        loadFavorites();
        const response = await  api.get('classes',{
            params:{
                subject,
                week_day,
                time
            }
            });
        
        if(response.data) setIsFilterVisible(false);
        setTeachers(response.data);

    
    }

    return (
    <View  style={styles.container}>
        <PageHeader 
        title="Proffys disponíveis"
        hearderRight={(
            <BorderlessButton onPress={handleToggleFilterVisible}>
                <Feather name='filter' size={20} color="#FFF"/>
            </BorderlessButton>
        )}
        >
            
            {isFilterVisible && (
            <View style={styles.searchForm}>
                <Text style={styles.label}>Matéria</Text>
                <TextInput 
                    value={subject}
                    onChangeText={ text => setSubject(text)}
                    style={styles.input}
                    placeholder="Qual a matéria?"
                    placeholderTextColor="#c1bccc"
                />
                <View style={styles.inputGroup}>
                    <View style={styles.inputBlock}>
                      <Text style={styles.label}>Dia da Semana</Text>
                      <TextInput 
                       value={week_day}
                       onChangeText={ text => setWeekDay(text)}   
                        style={styles.input}
                        placeholder="Qual o dia?"
                        placeholderTextColor="#c1bccc"
                      />
                    </View>

                    <View style={styles.inputBlock}>
                      <Text style={styles.label}>Horário</Text>
                      <TextInput 
                       value={time}
                       onChangeText={ text => setTime(text)}   
                        style={styles.input}
                        placeholder="Qual o horário?"
                        placeholderTextColor="#c1bccc"
                      />
                    </View>
                </View>
                <RectButton 
                    style={styles.submitButton}
                    onPress={handleFilterSubmit}
                >
                    <Text style={styles.submitButtonText}> Filtrar</Text>

                </RectButton>
            </View>
            )}
        </PageHeader>
     
        <ScrollView
         style={styles.teacherList}
        contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
        }}
        >
            {teachers.map((teacher: Teacher ) => {
           return <TeacherItem
                    key={teacher.id} 
                    teacher ={teacher} 
                    favorited={favorites.includes(teacher.id)}
                    
                    />
         })}
        
        </ScrollView>
    </View>
    )
}

export default TeacherList;