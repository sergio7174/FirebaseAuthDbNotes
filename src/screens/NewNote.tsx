import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { ActivityIndicator } from "react-native";

import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";

// icons
import { Ionicons } from "@expo/vector-icons";
// firebase functions
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase/config";

// to show messages on the screen
import { showMessage } from 'react-native-flash-message';

import { useMutation } from "react-query";

// section component
import SectionComponent from "components/SectionComponent";

const NewNote = ({ navigation }: any) => {
  
  const user = useSelector((state:any) => state.user.value);
  const richText = useRef<any>();
  const { replace } = navigation;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
 
  const saveNote = async () => {

    const notesRef = collection(firestore, `users/${user?.uid}/notes`);

    try {
      const note = await addDoc(notesRef, {
        title,
        content,
        isBookmarked,
        timestamp: serverTimestamp(),
        lastEdit: serverTimestamp(),
      });
      /***SHOW A SUCCESS MESSAGE IF ALL IS OK */
           showMessage({
              type: 'success',
              icon: 'success',
              message: 'Note Added'}),

      replace("Note", {
        note: {
          id: note.id,
          title,
          content,
          isBookmarked,
        },
        
      });
    } catch (error:any) {
      throw new Error(error);
    }
    return;
  };


  // Save Note when Icon is Pressed
  const { mutateAsync, isLoading } = useMutation(["notes"], saveNote);
  
  // back home function
  const BackHome=()=>{ navigation.replace("Home");}

  return (
    <SafeAreaView style={styles.container}>
    {/**upper Icons begining block ****/}
    <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={ BackHome}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <View className="flex-row items-center gap-x-2">
          <TouchableOpacity
            style={{
              opacity:
                title.length === 0 || content.length === 0 || isLoading
                  ? 0.5
                  : 1,
            }}
            disabled={title.length === 0 || content.length === 0 || isLoading}
            onPress={() => setIsBookmarked((state) => !state)}
          >
            {isBookmarked ? (
              <Ionicons name="bookmark" size={25} color="#6369d1" />
            ) : (
              <Ionicons name="bookmark-outline" size={25} color="black" />
            )}
          </TouchableOpacity>
          {isLoading ? (
            <ActivityIndicator color="#6369d1" size={30} />
          ) : (
            <TouchableOpacity
              onPress={() => mutateAsync()}
              style={{
                opacity: title.length === 0 || content.length === 0 ? 0.5 : 1,
              }}
              disabled={title.length === 0 || content.length === 0}
            >
              <Ionicons name="save" size={24} color={"black"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/**upper Icons block End ****/}
   {/******* 2do bloque *********/}
      {/***Little component description block */}
      <Text style={{fontSize:30, fontWeight:'bold', textAlign:'center', color:'#224792', paddingBottom:20, marginBottom:20}}>New Note Component, to Create Notes<br/>
      Please, Fill Title and Note Fields and then Upper Buttons
      </Text>
      {/***Little component description block End*/}
      
      <ScrollView contentContainerStyle={{flex: 1}}>
      <SectionComponent>
      <Text style={{fontSize:30, marginLeft:10, fontWeight:'bold'}}>Title:</Text>
      <View style={{borderRadius:20, backgroundColor:'rgb(176, 214, 245)', shadowColor:'black', padding:10, shadowOffset:{width:0, height:5, }, }}> 
        <TextInput
          value={title}
          placeholder="Title"
          style={{ outline:'none', height:50, fontSize:30}}
          onChangeText={val => setTitle(val)}
          //onChangeText={(text) => setTitle(text)}
          maxLength={100}
        />
         </View>
        </SectionComponent>

     <SectionComponent>
       <Text style={{fontSize:30, marginLeft:10, fontWeight:'bold'}}>Note:</Text> 
       <View style={{borderRadius:20, backgroundColor:'rgb(176, 214, 245)', shadowColor:'black', padding:10, shadowOffset:{width:0, height:5, }, }}>
        <TextInput
          value={content}
          ref={richText}
          placeholder="Note"
          style={{ outline:'none', height:50, fontSize:30}}
          onChangeText={val => setContent(val)}
          onChange={(text:any) => setContent(text)}
          maxLength={1000}
          multiline
          autoFocus
        />
        </View>
      </SectionComponent>
      </ScrollView> 
  
    
    </SafeAreaView>


  );
};

export default NewNote;
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
})