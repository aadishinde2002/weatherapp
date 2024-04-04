import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useTranslation } from 'react-i18next';

export default function Reports(props) {
  const [items, setItems] = useState([]);
  const { t } = useTranslation();


  const fetchJobs = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const createPDF = async () => {
    const htmlContent = generateHTML(items);
    let options = {
      html: htmlContent,
      fileName: 'Reports',
      directory: 'Documents',
    };

    try {
      let file = await RNHTMLtoPDF.convert(options);
      alert(file.filePath);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const generateHTML = (data) => {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>City Applications</title>
      <style>
          table {
              border-collapse: collapse;
              width: 100%;
          }
          th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
          }
      </style>
      </head>
      <body>
      <h1 style="text-align:center"> REPORTS </h1>
      
      <table id="cityTable">
          <thead>
              <tr>
                  <th>Cities</th>
                  <th>Applications</th>
                  <th>Selected</th>
              </tr>
          </thead>
          <tbody id="cityTableBody">
            ${data.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.Applications}</td>
                <td>${item.Selected}</td>
              </tr>
            `).join('')}
          </tbody>
      </table>
      
      
      </body>
      </html>`;
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' ,backgroundColor:'#3c587a'}}>
      <View style={{ padding: 20 ,alignItems:'center',backgroundColor:'#9dabbd',borderRadius:50,borderRadius:30,marginTop:'1%'}}>
        <TouchableOpacity onPress={()=> props.navigation.navigate('subreport')}> 
        <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center'}}>{t("Subscription Report")}</Text>
        <Image
          source={require('../assets/images/subs.png')}
          style={{ width:350, height: 250, resizeMode: 'contain' }}
        />
        </TouchableOpacity>
        <View style={{alignItems:'center', marginTop:20,flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity
         style={styles.btnlog}
         onPress={createPDF}
         >
          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
            {t("Download Pdf")}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnup}>
          <Text style={{color:'black',fontSize:20, fontWeight:'bold'}}>
           {t("Download Excel")}
          </Text>
        </TouchableOpacity >
      </View>
      </View>
      <View style={{ padding: 20 ,alignItems:'center',backgroundColor:'#9dabbd',marginTop:'1%',borderRadius:30}}>
       <TouchableOpacity onPress={()=> props.navigation.navigate('jobreport')}> 
        <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center'}}>{t("Jobs Report")}</Text>
        <Image
          source={require('../assets/images/jobss.png')}
          style={{ width:350, height: 250, resizeMode: 'contain' }}
        />
        </TouchableOpacity>
        <View style={{alignItems:'center', marginTop:20,flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity
         style={styles.btnlog}
         onPress={createPDF}
         >
          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
          {t("Download Pdf")}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnup}>
          <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>
            {t("Download Excel")}
          </Text>
        </TouchableOpacity >
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnlog:{
    paddingHorizontal:30,
    paddingVertical:10,
    marginLeft:30,
    backgroundColor:'#345192',
    alignItems:'center',
    borderRadius:10
  },  
  btnup:{
    paddingHorizontal:30,
    marginLeft:10,
    paddingVertical:10,
    backgroundColor:'#D8E4E9',
    alignItems:'center',
    borderRadius:10
    
  }
});
