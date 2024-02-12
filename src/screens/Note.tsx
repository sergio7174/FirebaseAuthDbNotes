import React, { useRef, useState } from "react";
import { useSelector} from 'react-redux';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useToast } from "react-native-toast-notifications";
import { Note } from "../interfaces";
import { useMutation } from "react-query";
import SectionComponent from "../components/SectionComponent";

const NewNote = ({ navigation, route }: any) => {
 
  const toast = useToast();
  const user = useSelector((state:any) => state.user.value);
  const richText = useRef<any>();
  const { goBack } = navigation;
  const note: Note = route?.params?.note;
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [isBookmarked, setIsBookmarked] = useState(note?.isBookmarked || false);

  const updateNote = async () => {
    const noteRef = doc(firestore, `users/${user?.uid}/notes/${note?.id}`);
    try {
      await setDoc(
        noteRef,
        {
          title,
          content,
          isBookmarked,
          lastEdit: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      toast.show("Note Updated");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const deleteNote = async () => {
    const noteRef = doc(firestore, `users/${user?.uid}/notes/${note?.id}`);
    try {
      await deleteDoc(noteRef);
      toast.show("Note Deleted");
      goBack();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const updateMutation = useMutation(["notes"], updateNote);
  const deleteMutation = useMutation(["notes"], deleteNote);

  const isSaveDisabled = title.length === 0 || content.length === 0;
  const isDeleteDisabled =
    isSaveDisabled || updateMutation.isLoading || deleteMutation.isLoading;

  return ( 
  
   <SafeAreaView style={styles.container} >
    {/**upper Icons begining block ****/}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-x-3">
          {deleteMutation.isLoading ? (
            <ActivityIndicator color="#6369d1" size={30} />
          ) : (
            <TouchableOpacity
              style={{ opacity: isDeleteDisabled ? 0.5 : 1 }}
              disabled={isDeleteDisabled}
              onPress={() => deleteMutation.mutateAsync()}
            >
              <FontAwesome5 name="trash" size={18} color="#ed4c4c" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ opacity: isSaveDisabled ? 0.5 : 1 }}
            disabled={isSaveDisabled}
            onPress={() => setIsBookmarked((state) => !state)}
          >
            {isBookmarked ? (
              <Ionicons name="bookmark" size={25} color="#6369d1" />
            ) : (
              <Ionicons name="bookmark-outline" size={25} color="black" />
            )}
          </TouchableOpacity>
          {updateMutation.isLoading ? (
            <ActivityIndicator color="#6369d1" size={30} />
          ) : (
            <TouchableOpacity
              onPress={() => updateMutation.mutateAsync()}
              style={{ opacity: isSaveDisabled ? 0.5 : 1 }}
              disabled={isSaveDisabled}
            >
              <Ionicons name="save" size={24} color={"black"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
       {/**upper Icons block End ****/}

      {/***Little component description block */}
      <Text style={{fontSize:30, fontWeight:'bold', textAlign:'center', color:'#224792'}}>Note Component, to Erase/Edit and Mark Notes
      </Text>
      <Text style={{fontSize:30, fontWeight:'bold', textAlign:'center', color:'#224792', paddingBottom:20, marginBottom:20}}>
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
          //onChangeText={val => setTitle(val)}
          onChangeText={(text) => setTitle(text)}
          maxLength={100}
        />
        </View>
        </SectionComponent>
          
        <SectionComponent>
        <Text style={{fontSize:30, marginLeft:10, fontWeight:'bold'}}>Note:</Text> 
        <View style={{borderRadius:20, backgroundColor:'rgb(176, 214, 245)', shadowColor:'black', padding:10, shadowOffset:{width:0, height:5, }, }}> 
        <TextInput
          value={content}
          placeholder="Note"
          ref={richText}
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