import { useSelector } from 'react-redux';
import React from "react";
// react native
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import { useDispatch } from 'react-redux';
import { useState } from 'react';
// Pinterest like listview made in React Native. It just behaves like the FlatList so it is easy to use.
// libraries
import MasonryList from "@react-native-seoul/masonry-list";

// icons
import { AntDesign, Feather } from "@expo/vector-icons";

// components
import NoteCard from "../components/NoteCard";
import Loader from "../components/Loader";
import Error from "../components/Error";

// react query
import { useQuery } from "react-query";

// firebase
import { getNotes } from "../firebase/calls/getNotes";

// In addition to other imports:
import PropTypes from 'prop-types';


// function handleLogOut
import { handleLogOut } from '../functions/auth/handleLogOutFunct';


Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  replace: PropTypes.object.isRequired,
};



function Home( props)  {

  // const to logOut
  const [result, setResult] = useState("");
  const dispatch = useDispatch();
  
  
  const user = useSelector((state) => state.user.value)
  const {
    data: notes,
    isError,
    isLoading,
    refetch,
  } = useQuery(["notes"], () => user && getNotes(user?.uid));
  
  return (
    <View style={styles.container}>
      <View className="flex-row items-center justify-between p-2"
         >
         { /***Add New Note Block */} 
        <TouchableOpacity
        className="right-2 bottom-4 bg-indigo-500 aspect-square h-12 rounded-full"
        onPress={() => {props.navigation.replace("NewNote")}}
      >
        <Feather name="plus" size={24} color="#fff" style={{marginTop:10, marginLeft:12}}/>
      </TouchableOpacity>
      { /***Add New Note Block End*/} 

        <Text style={{fontSize:50, fontWeight:'bold'}}>FirebaseDB Notes</Text>
       
        <TouchableOpacity
          onPress={() => handleLogOut(dispatch)}
        >
          <AntDesign name="logout" size={24} color="black" />
        
        </TouchableOpacity>
      </View>
      {/***Little project description block */}
      <Text style={{fontSize:30, fontWeight:'bold', textAlign:'center', color:'#224792', paddingBottom:20, marginBottom:20}}>A little Project to learn how to Create,<br/>
      Erase and Edit Notes, Using<br/>
      Firebase as Backend and Auth</Text>
      {/***Little project description block End*/}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <Error refresh={refetch} />
          ) : (
            <>
              {notes?.length === 0 ? (
                <View className="flex-1 w-full items-center justify-center">
                  <Text className="text-base font-medium">No notes found</Text>
                  <TouchableOpacity onPress={() => refetch()}>
                    <Text className="text-base text-blue-500 font-bold">
                      Try to refresh
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                <View className="flex-1 w-full items-center justify-center">
                <Text style={{fontSize:30, fontStyle:'italic', fontWeight:'bold', color:'white', marginTop:20, marginBottom:20, paddingTop:30, paddingBottom:30}}>Welcome, Press On Each Note, to Edit/erase</Text>
                </View>
                {/** Component that shows the note list */}
                <ScrollView style={{marginTop:40}}>
                <MasonryList 
                  data={notes || []}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  // refreshing={isLoading}
                  onRefresh={refetch}
                  renderItem={({ item }) => (
                    /***Notes Wrapper */
                    <NoteCard 
                      // @ts-ignore
                      note={item}
                    />
                    
                  )}
                  onEndReachedThreshold={0.1}
                />
                </ScrollView>
                </>
              )}
            </>
          )}
        </>
      )}

      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(111, 174, 175)',
    borderWidth:20,
    borderColor:'lightblue',
    marginLeft:20,
    marginRight:20,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:30
    
  },
  
  
});


