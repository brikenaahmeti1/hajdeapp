import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Linking, SafeAreaView, Text, TouchableOpacity, ScrollView, Image, Dimensions, Platform, StatusBar } from "react-native";
import Video from 'react-native-video';
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


function SplashScreenComp(props) {
    const [splashRef, setSplashRef] = useState(false)
    console.log('test 123')
    return (
        // <SafeAreaView style={{
        //     flex: 1,
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        // }}>
        <View style={{ minHeight: screenHeight, height: screenHeight, position: 'relative', justifyContent: 'center', alignItems: 'center', minWidth: screenWidth, backgroundColor: 'white' }}>
            <Video source={require('../assets/output-onlinegiftools.mp4')}
                ref={ref => { setSplashRef(ref); }}
                resizeMode={'cover'}
                rate={0.7}
                style={{
                    // position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    justifyContent:'center',
                    alignItems:'center',
                    display:'flex',
                    flexDirection:'row',
                    minWidth: screenWidth / 2.5,
                    maxWidth: screenWidth / 2.5,
                    maxHeight: screenWidth / 2.5,
                    minHeight: screenWidth / 2.5
                }}
                repeat={false}
            />
            {/* <Text>Test</Text> */}
        </View>
        // </SafeAreaView>
    );
}

export default SplashScreenComp;