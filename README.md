# week4_day5

> Express & Mongoose | Create & update documents, Document relationships
>
> Node | Basic Authorization, Autentication & Sessions


## Main points: document relationships (populating)

Para relacionar documentos:
* **En el modelo**: indicar en la propiedad a relacionar `type: Schema.Types.ObjectId` y `ref: 'nombreModelo'`:
    ```javascript
    const thingSchema = new Schema({
      title: String,
      owner: { type : Schema.Types.ObjectId, ref: 'User' },     // 'User' es el nombre del modelo
      price: Number
    })
    ```
* **En el controlador**: para _popular_ una consulta a la BBDD, requerir el modelo populado y pasar como argumento a `.populate()` el nombre del campo que contiene la referencia a oltra colección:
    ```javascript
    require('../models/owner.model')
    
    Thing.find()
      .populate('owner')    // 'owner' es el nombre del campo del modelo 'thing'
      .then(thing => console.log(thing))
    ```


