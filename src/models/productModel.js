const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    // Write the schema content
     
	name: String,                                    //"Catcher in the Rye",
	category: String,                                    // "book",
	price: Number                                            //mandatory property                                        
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema) //products
