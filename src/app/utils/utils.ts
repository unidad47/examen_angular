
export class Utils {

   static convertirACamelCase( data ) {

    const newObjs: Array<any> = [];


    for ( let i = 0; i < data.length; i++ ) {

      const newObj = {};

      Object.keys(data[i]).forEach(key => {

        const value = data[i][key];
        // use key and value here

        const newKey = key.replace(/_([a-z])/g,
          g => g[1].toUpperCase());

        newObj[newKey] = value;


      });

      newObjs.push( newObj );

    }

    return newObjs;

  }

}
