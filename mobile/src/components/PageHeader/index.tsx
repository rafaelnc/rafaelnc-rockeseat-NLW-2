import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps {
    title: string;
    hearderRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, hearderRight }) => {
   const { navigate } = useNavigation();
   
    function handleGoBack(){
        navigate('Landing');
    }
    return (
        <View style={styles.container} >
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode= 'contain' />
                </BorderlessButton>
                <Image source={logoImg} resizeMode='contain' />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{title} </Text>
                {hearderRight}
            </View>
            {children}
        </View>
    )

}

export default PageHeader;
