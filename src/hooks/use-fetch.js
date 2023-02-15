import { useState } from 'react';

const useFetch = function() {

  const request = async function(url, config, callback) {
    let res;

    try {
      if (config.method === "POST") {
        res = await fetch(url, {
          method: config.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(config.body)
        })
      } else res = await fetch(url);
      
      if(!res.ok || !res) throw Error('Something went wrong!')

      const data = await res.json();
      
      if(typeof callback !== 'function') return data;
      
      return callback(data)
    } catch (err) {
      throw err.message
    }
  }

  return {
    request,
  }
}

export default useFetch;