---
title: "Google Place API Helpers"
slug: "google-place-api-helpers"
date: "2020-07-28T21:19:40.000Z"
author: "Bryce Davies"
updatedDate: "2024-07-09T08:49:07.000Z"
---

To use these custom Google Sheets functions, open the Google Apps Script Editor and paste in the two functions below. You can open the editor in Google Sheets under Tools > Script Editor. Once saved, functions are immediately available in sheets.

Documentation - [https://developers.google.com/places/web-service/overview](https://developers.google.com/places/web-service/overview)

Fields for Place Details - [https://developers.google.com/places/web-service/details#fields](https://developers.google.com/places/web-service/details#fields)

### Place Search - Google Sheets Function

placeSearch("*your-search-term","latitude", "longitude", "radius(m)","your-api-key","search-depth)"*

    function placeSearch(keyword,lattitude,longtitude,radius,api_key,depth ) {
    
      // prepopulate headers, comment this out and replace with empty array if you don't want them
      var output = [ ["Name", "Place ID", "Lattitude", "Longditude","Types"]]
      
      var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
       
      // make API call to Place API using inputs and base url
      var response = UrlFetchApp.fetch(url.concat("location=",lattitude,",",longtitude,"&radius=",radius,"&keyword=",keyword,"&key=",api_key));
    
      payload = JSON.parse(response)
      
      //format results into output array
      for (var x = 0; x < payload['results'].length; x++){
        var inner = [ payload['results'][x]['name'], payload['results'][x]['place_id'], payload['results'][x]['geometry']['location']['lat'],payload['results'][x]['geometry']['location']['lng'],payload['results'][x]['types'][0] ]
        output.push(inner)
      }
      
      // if we want to return multiple pages, for each extra page we want make an API call using the next page token
      if ( depth > 0 ){
        
        for (var y = 0; y < depth; y++){
          
          var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=";
          
          // next page token isn't immediately valid when google provides it, sleep 2.5 seconds to wait for it to become valid
          Utilities.sleep(2500);
          
          // make API call to Place API usng next page token
          var response = UrlFetchApp.fetch(url.concat(payload['next_page_token'],"&key=",api_key));
          
          payload = JSON.parse(response)
                                           
          // format results
          for (var x = 0; x < payload['results'].length; x++){
            var inner = [ payload['results'][x]['name'], payload['results'][x]['place_id'], payload['results'][x]['geometry']['location']['lat'],payload['results'][x]['geometry']['location']['lng'],payload['results'][x]['types'][0] ]
            output.push(inner)
          }
        }
      
      }
      
      return output
    
    }

Example Use

=placeSearch("Golf Course","51.4977836","-0.1522502","20000","AIzaSyAXOG97LnAl9W_0crRFfK0wrqKiZ-LCHOs",2)

### Place Details - Google Sheets Function

placeDetails("*place-id"*,"*fields-to-return*","*your-api-key*")

    function placeDetails(place_id,fields,key) {
      
     // don't prepopulate headers as we use the fields input to determine the output array 
     var output = []
     var url = "https://maps.googleapis.com/maps/api/place/details/json?";
     
     var response = UrlFetchApp.fetch(url.concat("place_id=",place_id,"&fields=",fields,"&key=",key));
      
     payload = JSON.parse(response)
     
     // fields to return are comma seperated, split these up for output
     field_segments = fields.split(",");
     
      
     // for each field we want to return, add the result to the output array and return  
     for (var x = 0; x < field_segments.length; x++){
       output.push(payload['result'][field_segments[x].toString()]);
       console.log(output);
     }
     
     return output
    
                             
    }  
