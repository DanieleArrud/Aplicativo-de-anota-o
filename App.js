import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import {AsyncStorage } from 'react-native';

export default function App() {


  const [estate, setstado] = useState('leitura');
  const [ anotacao, setAnotacao ] = useState('');

  useEffect(()=>{
    //Quando inicar, leia.
    (async() =>{
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setAnotacao(anotacaoLeitura);
      }catch(error){
        //Erro
      }
    })();

  },[])

  setData = async() =>{
    try{
      await AsyncStorage.setItem('anotacao', anotacao);
    }catch(error){
      //Erro saving data
    }
  };
  
  function atualizarText(){
    setstado('leitura');
    setData();
  }

  if(estate == 'leitura'){
    return (
    <View style={{flex:1}}>
      <StatusBar style='light'></StatusBar>
      <View style={styles.header}><Text style={{textAlign: 'center', fontSize: 25, color: 'white' }}>Aplicativo de anotação</Text></View>

      {

      (anotacao != '')?
      <View style={{padding:20}}><Text style={styles.anotacao}>{anotacao}</Text></View>
     :
     <View style={{padding:20}}><Text style={{opacity:0.5, fontSize:18, textAlign:'center'}}>Nenhuma anotação encontrada</Text></View>
    }
     <TouchableOpacity onPress={()=> setstado('atualizando')} 
     style={styles.btnAnotacao}>

       {
         (anotacao == "")?
         <Text style={styles.btnAnotacaoTexto}>+</Text>
         :
         <Text style={{fontSize:20, color:'white', textAlign:'center', marginTop:15}}>Editar</Text>
       }

         </TouchableOpacity>
    </View>
    );
  } //Página de leitura
  else if(estate == 'atualizando'){
    return (
      <View style={{flex:1}}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.header}><Text style={{textAlign: 'center', fontSize: 25, color: 'white' }}>Aplicativo de anotação</Text></View>

      <TextInput autoFocus={true} style={{textAlignVertical:'top', padding:20, height:300}} onChangeText={(text)=>setAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

       <TouchableOpacity onPress={()=> atualizarText()} style={styles.btnSalvar}><Text style={{textAlign: 'center', color: 'white', fontSize:25}}>Salvar</Text></TouchableOpacity>
      </View>

      );
  } // Página para adicionar nova anotação
  
}

const styles = StyleSheet.create({
  header:{
    width: '100%',
    padding: 30,
    backgroundColor: '#069'
  },
  anotacao:{
    fontSize: 14,
    
  },
  btnAnotacao:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 60,
    width:60,
    backgroundColor: '#069',
    borderRadius: 16
  },
  btnAnotacaoTexto:{
    color: 'white',
    position: 'relative',
    left: '50%',
    marginLeft: '-11%',
    marginTop: 12,
    fontSize:25
  },
  btnSalvar:{
    width: 100,
    right: 20,
    bottom: 20,
    paddingBottom:10,
    paddingTop: 10,
    position: 'absolute',
    backgroundColor: '#069',
    borderRadius: 16,
  }
});
